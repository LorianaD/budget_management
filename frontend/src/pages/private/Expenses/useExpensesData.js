import { useAsyncResource } from "@/hooks";
import { loadPeriodData } from "@/services";

// Transactions page data of a period, with the previous period (suggestions)
// and the recurring transactions. Loading only: every computation lives in
// expensesSelectors.js.
function useExpensesData(period) {
    return useAsyncResource(
        `expenses:${period}`,
        (options) => loadPeriodData(period, { previous: true, recurring: true }, options),
    );
}

export default useExpensesData;
