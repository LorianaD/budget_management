import { useAsyncResource } from "@/hooks";
import {
    getBudgets,
    getCategories,
    getExpenses,
    getIncomes,
    getSavingDeposits,
    getSavingGoals,
} from "@/services";
import { shiftPeriod } from "@/utils";

// Fetches everything the dashboard needs for a period (and the previous one,
// for comparisons) in parallel. Loading orchestration only: every computation
// lives in dashboardSelectors.js.
async function loadDashboardData(period, options) {
    const previousPeriod = shiftPeriod(period, -1);

    const [
        categories,
        budgets,
        expenses,
        incomes,
        previousExpenses,
        previousIncomes,
        savingGoals,
        savingDeposits,
    ] = await Promise.all([
        getCategories(options),
        getBudgets(period, options),
        getExpenses(period, options),
        getIncomes(period, options),
        getExpenses(previousPeriod, options),
        getIncomes(previousPeriod, options),
        getSavingGoals(options),
        getSavingDeposits(options),
    ]);

    return {
        period,
        previousPeriod,
        categories,
        budgets,
        expenses,
        incomes,
        previousExpenses,
        previousIncomes,
        savingGoals,
        savingDeposits,
    };
}

function useDashboardData(period) {
    return useAsyncResource(`dashboard:${period}`, (options) => loadDashboardData(period, options));
}

export default useDashboardData;
