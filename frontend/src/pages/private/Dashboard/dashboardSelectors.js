import {
    compareIsoDatesDesc,
    getBudgetStatus,
    getBudgetUsage,
    getCompletedTransactions,
    getDailyAmount,
    getDepositsOfPeriod,
    getGoalProgress,
    getMonthlySummary,
    getRemainingDaysInPeriod,
    getSavingsOverview,
    getUpcomingGoals,
    getVariationRate,
    TRANSACTION_TYPES,
} from "@/utils";

// Pure functions turning the raw dashboard data (useDashboardData) into what
// each section displays. Numbers and statuses only: texts live in DashboardData.js.

// Below 1 % of change, a figure is considered stable
const STABLE_VARIATION_RATE = 0.01;
const RECENT_ACTIVITY_LIMIT = 4;

// null when there is nothing to compare with
function toTrend(rate) {
    if (rate === null) return null;
    if (Math.abs(rate) < STABLE_VARIATION_RATE) return { direction: "stable", rate: 0 };
    return { direction: rate > 0 ? "up" : "down", rate };
}

// No budget and no transaction (whatever its status) for the period
export function isDashboardEmpty(data) {
    return data.allocations.length === 0 && data.transactions.length === 0;
}

// The four key figures of the month (completed transactions only)
export function selectSummary(data, today) {
    const current = getMonthlySummary({
        transactions: data.transactions,
        savingDeposits: getDepositsOfPeriod(data.savingDeposits, data.period),
    });
    const previous = getMonthlySummary({
        transactions: data.previousTransactions,
        savingDeposits: getDepositsOfPeriod(data.savingDeposits, data.previousPeriod),
    });
    const { totalPlanned } = getBudgetUsage(data);
    const remainingDays = getRemainingDaysInPeriod(data.period, today);

    return {
        income: {
            amount: current.totalIncome,
            trend: toTrend(getVariationRate(current.totalIncome, previous.totalIncome)),
        },
        expenses: {
            amount: current.totalExpenses,
            // null when no budget is planned for the period
            isWithinBudget: totalPlanned > 0 ? current.totalExpenses <= totalPlanned : null,
        },
        savings: {
            amount: current.totalSavings,
            trend: toTrend(getVariationRate(current.totalSavings, previous.totalSavings)),
        },
        remainingToLive: {
            amount: current.remainingToLive,
            // Only meaningful for the current month with money left
            dailyAmount: remainingDays > 0 && current.remainingToLive > 0
                ? getDailyAmount(current.remainingToLive, remainingDays)
                : null,
        },
    };
}

// "Budget du mois": overall usage and one row per budgeted category
export function selectBudgetOverview(data) {
    const usage = getBudgetUsage(data);

    return {
        totalPlanned: usage.totalPlanned,
        totalSpent: usage.totalSpent,
        usageRate: usage.usageRate,
        items: usage.items
            .filter((item) => item.planned > 0)
            .map((item) => ({ ...item, status: getBudgetStatus(item) })),
    };
}

// Active goal with the nearest deadline; without any deadline, the most
// advanced active goal; null when every goal is reached (or there is none).
export function selectHighlightedGoal(savingGoals) {
    const [nearestGoal] = getUpcomingGoals(savingGoals, 1);
    const goal = nearestGoal ?? getSavingsOverview(savingGoals).mostAdvancedGoal;

    return goal ? { goal, progress: getGoalProgress(goal) } : null;
}

// Latest money movements of the period, most recent first: completed
// transactions and saving deposits (planned / cancelled ones are not movements)
export function selectRecentActivity(data, today, limit = RECENT_ACTIVITY_LIMIT) {
    const categoryNames = new Map(data.categories.map((category) => [category.id, category.name]));
    const goalTitles = new Map(data.savingGoals.map((goal) => [goal.id, goal.title]));

    const activity = [
        ...getCompletedTransactions(data.transactions).map((transaction) => ({
            key: `transaction-${transaction.id}`,
            type: transaction.type,
            label: transaction.label,
            // Only expenses show their category (budget categories)
            categoryName: transaction.type === TRANSACTION_TYPES.EXPENSE ? categoryNames.get(transaction.categoryId) : undefined,
            amount: transaction.amount,
            date: transaction.date,
        })),
        ...getDepositsOfPeriod(data.savingDeposits, data.period).map((deposit) => ({
            key: `deposit-${deposit.id}`,
            type: "deposit",
            label: goalTitles.get(deposit.savingGoalId),
            amount: deposit.amount,
            date: deposit.depositedAt,
        })),
    ];

    return activity
        .filter((item) => Date.parse(item.date) <= Date.parse(today))
        .sort((a, b) => compareIsoDatesDesc(a.date, b.date))
        .slice(0, limit);
}
