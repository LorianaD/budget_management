import { useCallback, useState } from "react";

// Number of rows shown at first, and added by "Voir plus de transactions"
const PAGE_SIZE = 10;

export const DEFAULT_FILTERS = {
    search: "",
    categoryId: "all",
    status: "all",
    range: "month",
    sort: "date-desc",
};

// UI state of the transactions list: active tab, filters and number of
// visible rows. No data and no computation here (see expensesSelectors).
// Owned by the page so the filters survive a period change.
function useTransactionFilters() {
    const [type, setTypeState] = useState("expense");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // Categories differ between incomes and expenses: the category filter is reset
    const setType = useCallback((nextType) => {
        setTypeState(nextType);
        setFilters((current) => ({ ...current, categoryId: DEFAULT_FILTERS.categoryId }));
        setVisibleCount(PAGE_SIZE);
    }, []);

    const setFilter = useCallback((name, value) => {
        setFilters((current) => ({ ...current, [name]: value }));
        setVisibleCount(PAGE_SIZE);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
        setVisibleCount(PAGE_SIZE);
    }, []);

    const showMore = useCallback(() => setVisibleCount((count) => count + PAGE_SIZE), []);

    // Which filters are really applied depends on the period: see selectActiveFilters
    return { type, filters, visibleCount, setType, setFilter, resetFilters, showMore };
}

export default useTransactionFilters;
