import {
    compareIsoDatesDesc,
    getBudgetUsage,
    getDailyAmount,
    getGoalProgress,
    getMonthlySummary,
    getRemainingDaysInPeriod,
    getVariationRate,
    isInPeriod,
} from "@/utils";

// Pure functions turning the raw dashboard data (useDashboardData) into what
// each section displays. Numbers and statuses only: texts live in DashboardData.js.

// Usage rate from which a category is flagged (same rule as the budget alerts)
export const BUDGET_WARNING_RATE = 0.8;
// Below 1 % of change, a figure is considered stable
const STABLE_VARIATION_RATE = 0.01;
const RECENT_ACTIVITY_LIMIT = 4;

const depositsOf = (savingDeposits, period) =>
    savingDeposits.filter((deposit) => isInPeriod(deposit.depositedAt, period));

// null when there is nothing to compare with
function toTrend(rate) {
    if (rate === null) return null;
    if (Math.abs(rate) < STABLE_VARIATION_RATE) return { direction: "stable", rate: 0 };
    return { direction: rate > 0 ? "up" : "down", rate };
}

export function isDashboardEmpty(data) {
    return data.budgets.length === 0 && data.expenses.length === 0 && data.incomes.length === 0;
}

// The four key figures of the month
export function selectSummary(data, today) {
    const current = getMonthlySummary({
        incomes: data.incomes,
        expenses: data.expenses,
        savingDeposits: depositsOf(data.savingDeposits, data.period),
    });
    const previous = getMonthlySummary({
        incomes: data.previousIncomes,
        expenses: data.previousExpenses,
        savingDeposits: depositsOf(data.savingDeposits, data.previousPeriod),
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

function getUsageStatus(item) {
    if (item.isOverBudget) return "over";
    if (item.usageRate >= BUDGET_WARNING_RATE) return "warning";
    return "ok";
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
            .map((item) => ({ ...item, status: getUsageStatus(item) })),
    };
}

// Active goal with the nearest deadline; without any deadline, the most
// advanced active goal; null when every goal is reached (or there is none).
export function selectHighlightedGoal(savingGoals) {
    const activeGoals = savingGoals.filter((goal) => !getGoalProgress(goal).isReached);
    if (activeGoals.length === 0) return null;

    const byDeadline = activeGoals
        .filter((goal) => goal.deadline)
        .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

    const byProgress = [...activeGoals]
        .sort((a, b) => getGoalProgress(b).rate - getGoalProgress(a).rate);

    const goal = byDeadline[0] ?? byProgress[0];
    return { goal, progress: getGoalProgress(goal) };
}

// Latest money movements of the period, most recent first
export function selectRecentActivity(data, today, limit = RECENT_ACTIVITY_LIMIT) {
    const categoryNames = new Map(data.categories.map((category) => [category.id, category.name]));
    const goalTitles = new Map(data.savingGoals.map((goal) => [goal.id, goal.title]));

    const activity = [
        ...data.expenses.map((expense) => ({
            key: `expense-${expense.id}`,
            type: "expense",
            label: expense.label,
            categoryName: categoryNames.get(expense.categoryId),
            amount: expense.amount,
            date: expense.spentAt,
        })),
        ...data.incomes.map((income) => ({
            key: `income-${income.id}`,
            type: "income",
            label: income.label,
            amount: income.amount,
            date: income.receivedAt,
        })),
        ...depositsOf(data.savingDeposits, data.period).map((deposit) => ({
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
