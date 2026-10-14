import { useAsyncResource } from "@/hooks";
import { loadPeriodData } from "@/services";

// Budget page data of a period, with the savings and the recurring
// transactions. Loading only: every computation lives in budgetSelectors.js.
function useBudgetData(period) {
    return useAsyncResource(
        `budget:${period}`,
        (options) => loadPeriodData(period, { savings: true, recurring: true }, options),
    );
}

export default useBudgetData;
