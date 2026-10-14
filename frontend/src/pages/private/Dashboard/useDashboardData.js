import { useAsyncResource } from "@/hooks";
import { loadPeriodData } from "@/services";

// Dashboard data of a period, with the previous period for comparisons and
// the savings. Loading only: every computation lives in dashboardSelectors.js.
function useDashboardData(period) {
    return useAsyncResource(
        `dashboard:${period}`,
        (options) => loadPeriodData(period, { previous: true, savings: true }, options),
    );
}

export default useDashboardData;
