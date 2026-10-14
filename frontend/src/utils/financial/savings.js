import { compareIsoDatesDesc, getIsoDay, getPeriodOf, isInPeriod } from "../date";
import { getRate, subtractAmounts, sumAmounts } from "./amounts";
import { getMonthlyRecurringAmount } from "./recurring";

// Recommended size of the safety fund, in months of fixed charges
export const SAFETY_FUND_MONTHS = 3;

// "overdue": the deadline is past but the goal is not reached. It is still
// pursued (never considered abandoned): only its deadline needs a review.
export const GOAL_STATUSES = {
    ACTIVE: "active",
    OVERDUE: "overdue",
    REACHED: "reached",
};

// Based on the goal's CURRENT amount (SavingGoal.currentAmount), never on the
// deposit history: both may differ once withdrawals exist.
export function getGoalProgress(goal) {
    const remaining = subtractAmounts(goal.targetAmount, goal.currentAmount);

    return {
        saved: goal.currentAmount,
        target: goal.targetAmount,
        remaining: Math.max(remaining, 0),
        rate: Math.min(getRate(goal.currentAmount, goal.targetAmount), 1),
        isReached: goal.currentAmount >= goal.targetAmount,
    };
}

// The deadline is a calendar date: a goal is overdue from the day after it
export function getGoalStatus(goal, today) {
    if (getGoalProgress(goal).isReached) return GOAL_STATUSES.REACHED;
    if (goal.deadline && getIsoDay(goal.deadline) < getIsoDay(today)) return GOAL_STATUSES.OVERDUE;
    return GOAL_STATUSES.ACTIVE;
}

// Goals not reached yet, overdue ones included
export function getActiveGoals(goals) {
    return goals.filter((goal) => !getGoalProgress(goal).isReached);
}

// Goals not reached yet that have a deadline, nearest deadline first
// (an overdue goal comes first: its deadline is the oldest)
export function getUpcomingGoals(goals, limit = Infinity) {
    return getActiveGoals(goals)
        .filter((goal) => goal.deadline)
        .sort((a, b) => getIsoDay(a.deadline).localeCompare(getIsoDay(b.deadline)))
        .slice(0, limit);
}

// Figures computed from the goals' current amounts only (no history needed)
export function getSavingsOverview(goals) {
    const activeGoals = getActiveGoals(goals);
    const mostAdvancedGoal = activeGoals.reduce(
        (best, goal) => (!best || getGoalProgress(goal).rate > getGoalProgress(best).rate ? goal : best),
        null,
    );

    return {
        activeGoalCount: activeGoals.length,
        reachedGoalCount: goals.length - activeGoals.length,
        totalSaved: sumAmounts(goals, (goal) => goal.currentAmount),
        mostAdvancedGoal,
    };
}

export function getDepositsOfPeriod(savingDeposits, period) {
    return savingDeposits.filter((deposit) => isInPeriod(deposit.depositedAt, period));
}

// Deposits made up to today, most recent first
export function getLatestDeposits(savingDeposits, today) {
    return savingDeposits
        .filter((deposit) => Date.parse(deposit.depositedAt) <= Date.parse(today))
        .sort((a, b) => compareIsoDatesDesc(a.depositedAt, b.depositedAt));
}

// Running total of the recorded movements at the end of each period
// ("Évolution de votre épargne"): a cumulative history, not the amount
// deposited each month. Signed amounts are summed as they are, so future
// withdrawals (negative movements) would lower it.
// periods must be chronological; deposits made before the first period are included.
export function getCumulativeSavings(savingDeposits, periods) {
    return periods.map((period) => ({
        period,
        total: sumAmounts(savingDeposits.filter((deposit) => getPeriodOf(deposit.depositedAt) <= period)),
    }));
}

// Recommended safety fund: a number of months of recurring fixed charges
// (a yearly charge counts for a twelfth). Shared by the budget and goals pages.
export function getSafetyFundRecommendation(recurringTransactions, months = SAFETY_FUND_MONTHS) {
    const monthlyFixedCharges = getMonthlyRecurringAmount(recurringTransactions);

    return {
        months,
        monthlyFixedCharges,
        recommendedAmount: sumAmounts(Array(months).fill(monthlyFixedCharges), (value) => value),
    };
}
