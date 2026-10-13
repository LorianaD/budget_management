import { getPeriodOf, isInPeriod } from "../date";
import { getRate, subtractAmounts, sumAmounts } from "./amounts";

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

// Figures of the "Objectifs d'épargne" summary cards
export function getSavingsOverview({ goals, savingDeposits, period }) {
    const activeGoals = goals.filter((goal) => !getGoalProgress(goal).isReached);
    const mostAdvancedGoal = activeGoals.reduce(
        (best, goal) => (!best || getGoalProgress(goal).rate > getGoalProgress(best).rate ? goal : best),
        null,
    );

    return {
        activeGoalCount: activeGoals.length,
        totalSaved: sumAmounts(goals, (goal) => goal.currentAmount),
        mostAdvancedGoal,
        periodDeposits: sumAmounts(savingDeposits.filter((deposit) => isInPeriod(deposit.depositedAt, period))),
    };
}

// Total saved at the end of each period ("Évolution de votre épargne").
// periods must be chronological; deposits made before the first period are included.
export function getCumulativeSavings(savingDeposits, periods) {
    return periods.map((period) => ({
        period,
        total: sumAmounts(savingDeposits.filter((deposit) => getPeriodOf(deposit.depositedAt) <= period)),
    }));
}
