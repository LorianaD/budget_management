import {
    getBudgetStatus,
    getBudgetUsage,
    getCategoryShares,
    getCompletedExpenses,
    getCompletedIncomes,
    getCompletedTransactions,
    getDailyAmount,
    getDayOfMonth,
    getDaysInPeriod,
    getDepositsOfPeriod,
    getGoalProgress,
    getSafetyFundRecommendation,
    subtractAmounts,
    sumAmounts,
} from "@/utils";

// Pure functions turning the raw budget data (useBudgetData) into what each
// section displays. Numbers and statuses only: texts live in BudgetData.js.

const WEEK_LENGTH = 7;

const sumOf = (items) => sumAmounts(items);

// No budget and no transaction (whatever its status) for the period
export function isBudgetPageEmpty(data) {
    return data.allocations.length === 0 && data.transactions.length === 0;
}

// Forecast key figures. "remaining" is a FORECAST: incomes minus the planned
// budget minus this month's savings. The dashboard "Reste à vivre" uses the
// actual expenses instead. Incomes are the completed ones: planned incomes
// are not counted yet.
export function selectForecast(data) {
    const income = sumOf(getCompletedIncomes(data.transactions));
    const { totalPlanned } = getBudgetUsage(data);
    const savings = sumOf(getDepositsOfPeriod(data.savingDeposits, data.period));
    const remaining = subtractAmounts(income, totalPlanned, savings);

    return {
        income,
        plannedExpenses: totalPlanned,
        savings,
        remaining,
        // Spread over the whole month: this is a plan, not what is left today
        dailyAmount: remaining > 0 ? getDailyAmount(remaining, getDaysInPeriod(data.period)) : null,
    };
}

// "Répartition prévisionnelle": planned vs spent so far, per category.
// difference = planned - spent (negative when the budget is exceeded).
export function selectBudgetTable(data) {
    const usage = getBudgetUsage(data);

    const rows = usage.items.map((item) => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        planned: item.planned,
        spent: item.spent,
        difference: item.remaining,
        status: getBudgetStatus(item),
    }));

    const overruns = rows
        .filter((row) => row.difference < 0)
        .map((row) => ({
            categoryId: row.categoryId,
            categoryName: row.categoryName,
            amount: -row.difference,
            // null for a category spent without any budget
            rate: row.planned > 0 ? -row.difference / row.planned : null,
        }))
        .sort((a, b) => b.amount - a.amount);

    return {
        rows,
        totalPlanned: usage.totalPlanned,
        totalSpent: usage.totalSpent,
        totalDifference: usage.totalRemaining,
        hasExpenses: getCompletedExpenses(data.transactions).length > 0,
        overruns,
    };
}

// "Répartition du budget": share of each category in the planned total
export function selectBudgetShares(data) {
    const entries = data.allocations.map((allocation) => ({ categoryId: allocation.categoryId, amount: allocation.plannedAmount }));

    return {
        total: sumAmounts(entries),
        shares: getCategoryShares(entries, data.categories),
    };
}

// "Évolution des mouvements du mois": completed movements grouped by week
// (days 1-7, 8-14...). The balance starts at 0 on the first day: it is the
// running total of the month's movements, NOT a bank account balance.
export function selectMonthMovements(data) {
    const daysInPeriod = getDaysInPeriod(data.period);
    const movements = [
        ...getCompletedTransactions(data.transactions)
            .map((transaction) => ({ type: transaction.type, day: getDayOfMonth(transaction.date), amount: transaction.amount })),
        ...getDepositsOfPeriod(data.savingDeposits, data.period)
            .map((deposit) => ({ type: "savings", day: getDayOfMonth(deposit.depositedAt), amount: deposit.amount })),
    ];
    const totalOf = (items, type) => sumOf(items.filter((movement) => movement.type === type));

    const weeks = [];
    let balance = 0;

    for (let firstDay = 1; firstDay <= daysInPeriod; firstDay += WEEK_LENGTH) {
        const lastDay = Math.min(firstDay + WEEK_LENGTH - 1, daysInPeriod);
        const weekMovements = movements.filter((movement) => movement.day >= firstDay && movement.day <= lastDay);
        const income = totalOf(weekMovements, "income");
        const expenses = totalOf(weekMovements, "expense");
        const savings = totalOf(weekMovements, "savings");

        balance = subtractAmounts(sumAmounts([balance, income], (value) => value), expenses, savings);
        weeks.push({ key: `week-${firstDay}`, firstDay, lastDay, income, expenses, savings, balance });
    }

    return { daysInPeriod, weeks, finalBalance: balance, hasMovements: movements.length > 0 };
}

// Safety fund: the goal identified by the services (explicit configuration,
// no title lookup) and a recommended amount computed from the fixed charges.
// The goal's own target and the recommendation are two distinct figures.
export function selectSafetyFund(data, safetyFundGoalId) {
    const { months, recommendedAmount } = getSafetyFundRecommendation(data.recurringTransactions);
    const goal = data.savingGoals.find((savingGoal) => savingGoal.id === safetyFundGoalId) ?? null;

    return {
        goal,
        progress: goal ? getGoalProgress(goal) : null,
        months,
        recommendedAmount,
        isBelowRecommendation: recommendedAmount > 0 && (goal?.currentAmount ?? 0) < recommendedAmount,
    };
}

// Rule-based suggestions, most important first. Each one only exists when its
// condition is met: the wording stays factual (see BudgetData.suggestions).
export function selectSuggestions(table, safetyFund) {
    const suggestions = [];
    const [largestOverrun] = table.overruns;

    if (largestOverrun) {
        suggestions.push({ key: "reduce", type: "priority", ...largestOverrun });
    }

    if (safetyFund.isBelowRecommendation) {
        suggestions.push({
            key: "safetyFund",
            type: "advice",
            saved: safetyFund.progress?.saved ?? null,
            recommendedAmount: safetyFund.recommendedAmount,
        });
    }

    const underBudget = table.rows.filter((row) => row.planned > 0 && row.difference > 0);
    if (table.hasExpenses && underBudget.length > 0) {
        suggestions.push({
            key: "unused",
            type: "opportunity",
            amount: sumAmounts(underBudget, (row) => row.difference),
            categoryCount: underBudget.length,
        });
    }

    return suggestions;
}
