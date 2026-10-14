import {
    GOAL_STATUSES,
    getActiveGoals,
    getCumulativeSavings,
    getDepositsOfPeriod,
    getGoalProgress,
    getGoalStatus,
    getLatestDeposits,
    getPeriodOf,
    getPeriodRange,
    getSafetyFundRecommendation,
    getSavingsOverview,
    getUpcomingGoals,
    sumAmounts,
} from "@/utils";

// Pure functions turning the raw goals data (useSavingGoalsData) into what
// each section displays. Numbers and statuses only: texts live in SavingGoalsData.js.
//
// Two sources are kept apart:
// - the goals' CURRENT amounts (SavingGoal.currentAmount): list, progress,
//   total saved, upcoming goals, advice;
// - the deposit HISTORY (savingDeposits, demo extension): month deposits,
//   evolution chart, latest deposits. It is null when unavailable (API mode):
//   the selectors then return null and the sections say so.

const EVOLUTION_MONTHS = 7;
const UPCOMING_LIMIT = 3;
const ADVICE_LIMIT = 3;

export function isSavingGoalsPageEmpty(data) {
    return data.savingGoals.length === 0;
}

// Goal + its progress and status, as displayed by the goal cards
function toGoalItem(goal, today, safetyFundGoalId = null) {
    return {
        goal,
        progress: getGoalProgress(goal),
        status: getGoalStatus(goal, today),
        isSafetyFund: goal.id === safetyFundGoalId,
    };
}

// Creation order (id for equal dates), reached goals at the end
export function selectGoalList(data, today, safetyFundGoalId) {
    const items = [...data.savingGoals]
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id)
        .map((goal) => toGoalItem(goal, today, safetyFundGoalId));
    const isReached = (item) => item.status === GOAL_STATUSES.REACHED;

    return [...items.filter((item) => !isReached(item)), ...items.filter(isReached)];
}

// The four key figures. monthDeposits is null when the history is unavailable.
export function selectSavingsSummary(data, today) {
    const overview = getSavingsOverview(data.savingGoals);
    const { mostAdvancedGoal } = overview;
    const period = getPeriodOf(today);

    return {
        activeGoalCount: overview.activeGoalCount,
        reachedGoalCount: overview.reachedGoalCount,
        totalSaved: overview.totalSaved,
        mostAdvanced: mostAdvancedGoal
            ? { title: mostAdvancedGoal.title, rate: getGoalProgress(mostAdvancedGoal).rate }
            : null,
        monthDeposits: data.savingDeposits
            ? { period, amount: sumAmounts(getDepositsOfPeriod(getLatestDeposits(data.savingDeposits, today), period)) }
            : null,
    };
}

// Cumulative deposits at the end of each of the last months (current month
// included). null when the history is unavailable.
export function selectSavingsEvolution(data, today) {
    if (!data.savingDeposits) return null;

    const deposits = getLatestDeposits(data.savingDeposits, today);
    const points = getCumulativeSavings(deposits, getPeriodRange(getPeriodOf(today), EVOLUTION_MONTHS));

    return {
        points,
        hasDeposits: points.some((point) => point.total !== 0),
    };
}

// Goals not reached with a deadline, nearest first (overdue ones included)
export function selectUpcomingGoals(data, today) {
    return getUpcomingGoals(data.savingGoals, UPCOMING_LIMIT).map((goal) => toGoalItem(goal, today));
}

// Most recent deposits first, `visibleCount` of them. null when unavailable.
export function selectLatestDeposits(data, today, visibleCount) {
    if (!data.savingDeposits) return null;

    const goalTitles = new Map(data.savingGoals.map((goal) => [goal.id, goal.title]));
    const deposits = getLatestDeposits(data.savingDeposits, today);

    return {
        rows: deposits.slice(0, visibleCount).map((deposit) => ({
            id: deposit.id,
            date: deposit.depositedAt,
            amount: deposit.amount,
            // null when the goal no longer exists
            goalTitle: goalTitles.get(deposit.savingGoalId) ?? null,
        })),
        total: deposits.length,
        hasMore: deposits.length > visibleCount,
    };
}

// Rule-based advice, most important first. Each one only exists when its
// condition is met: the wording stays factual (see SavingGoalsData.advice).
export function selectSavingsAdvice(data, today, safetyFundGoalId) {
    const advice = [];
    const activeGoals = getActiveGoals(data.savingGoals);

    // Same rule as the budget page: months of recurring fixed charges
    const { months, recommendedAmount } = getSafetyFundRecommendation(data.recurringTransactions);
    const safetyFund = data.savingGoals.find((goal) => goal.id === safetyFundGoalId) ?? null;
    if (recommendedAmount > 0 && (safetyFund?.currentAmount ?? 0) < recommendedAmount) {
        advice.push({ key: "safetyFund", type: "safetyFund", saved: safetyFund?.currentAmount ?? null, recommendedAmount, months });
    }

    const [overdueGoal] = getUpcomingGoals(data.savingGoals)
        .filter((goal) => getGoalStatus(goal, today) === GOAL_STATUSES.OVERDUE);
    if (overdueGoal) {
        advice.push({ key: "overdue", type: "overdue", title: overdueGoal.title, amount: getGoalProgress(overdueGoal).remaining });
    }

    const { mostAdvancedGoal } = getSavingsOverview(data.savingGoals);
    const bestRate = mostAdvancedGoal ? getGoalProgress(mostAdvancedGoal).rate : 0;
    if (bestRate > 0) {
        advice.push({ key: "progress", type: "progress", title: mostAdvancedGoal.title, rate: bestRate });
    }

    if (activeGoals.length > 0) {
        advice.push({ key: "regularity", type: "regularity" });
    }

    return advice.slice(0, ADVICE_LIMIT);
}
