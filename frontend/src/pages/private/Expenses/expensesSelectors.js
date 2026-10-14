import {
    compareIsoDatesDesc,
    getBudgetAlerts,
    getBudgetStatus,
    getBudgetUsage,
    getCategoriesOfType,
    getCompletedExpenses,
    getExpenseShares,
    getIsoDay,
    getMonthlyRecurringAmount,
    getMonthlySummary,
    getPeriodOf,
    getVariationRate,
    getWeekBounds,
    normalizeText,
    sumAmounts,
} from "@/utils";

// Pure functions turning the raw page data (useExpensesData) and the UI
// filters (useTransactionFilters) into what each section displays.
// Numbers and statuses only: texts live in ExpensesData.js.

// Below 10 % of change a category is "stable", above it is "in increase"
const TREND_THRESHOLD = 0.1;

const SORTS = {
    "date-desc": (a, b) => compareIsoDatesDesc(a.date, b.date),
    "amount-desc": (a, b) => b.amount - a.amount || compareIsoDatesDesc(a.date, b.date),
    "amount-asc": (a, b) => a.amount - b.amount || compareIsoDatesDesc(a.date, b.date),
};

const categoryNamesOf = (data) => new Map(data.categories.map((category) => [category.id, category.name]));

// No transaction (whatever its status) and no budget for the period
export function isTransactionsPageEmpty(data) {
    return data.transactions.length === 0 && data.allocations.length === 0;
}

// Key figures: completed transactions only; the others are only counted apart
export function selectTransactionSummary(data) {
    const summary = getMonthlySummary({ transactions: data.transactions, savingDeposits: [] });

    return {
        expenses: summary.totalExpenses,
        incomes: summary.totalIncome,
        balance: summary.balance,
        completedCount: summary.transactionCount,
        otherCount: data.transactions.length - summary.transactionCount,
    };
}

// "Aujourd'hui" / "Cette semaine" only make sense for the current month
export function isRangeFilterAvailable(period, today) {
    return getPeriodOf(today) === period;
}

// Filters and sort that differ from the defaults AND are applied: the period
// chips only count for the current month. Drives the "Filtres actifs" summary
// and the reset button. -> [{ key, value }] (value: raw filter value or category name)
export function selectActiveFilters(data, filters, defaults, today) {
    const categoryNames = categoryNamesOf(data);
    const isApplied = {
        search: filters.search.trim() !== "",
        categoryId: filters.categoryId !== defaults.categoryId,
        status: filters.status !== defaults.status,
        range: filters.range !== defaults.range && isRangeFilterAvailable(data.period, today),
        sort: filters.sort !== defaults.sort,
    };

    return Object.keys(isApplied)
        .filter((key) => isApplied[key])
        .map((key) => ({
            key,
            value: key === "categoryId" ? categoryNames.get(Number(filters.categoryId)) : filters[key].trim(),
        }));
}

// Categories offered by the category filter: those of the active tab type
export function selectCategoryOptions(data, type) {
    return getCategoriesOfType(data.categories, type).map((category) => ({ id: category.id, name: category.name }));
}

function isInRange(transaction, range, today) {
    if (range === "today") return getIsoDay(transaction.date) === getIsoDay(today);
    if (range === "week") {
        const { start, end } = getWeekBounds(today);
        const day = getIsoDay(transaction.date);
        return day >= start && day <= end;
    }
    return true;
}

// Transactions of the active tab matching the filters, every status included.
// filters = { search, categoryId ("all" | id as string), status, range, sort }
export function selectTransactionList(data, { type, filters, visibleCount }, today) {
    const categoryNames = categoryNamesOf(data);
    const range = isRangeFilterAvailable(data.period, today) ? filters.range : "month";
    const query = normalizeText(filters.search);

    const ofType = data.transactions
        .filter((transaction) => transaction.type === type)
        .map((transaction) => ({ ...transaction, categoryName: categoryNames.get(transaction.categoryId) }));

    const matches = ofType
        .filter((transaction) => filters.categoryId === "all" || String(transaction.categoryId) === filters.categoryId)
        .filter((transaction) => filters.status === "all" || transaction.status === filters.status)
        .filter((transaction) => isInRange(transaction, range, today))
        .filter((transaction) => !query || normalizeText(
            `${transaction.label} ${transaction.description ?? ""} ${transaction.categoryName ?? ""}`,
        ).includes(query))
        .sort(SORTS[filters.sort]);

    return {
        rows: matches.slice(0, visibleCount),
        matchCount: matches.length,
        typeCount: ofType.length,
        hasMore: matches.length > visibleCount,
    };
}

// "Répartition des dépenses": completed expenses by category
export function selectExpenseBreakdown(data) {
    return {
        total: sumAmounts(getCompletedExpenses(data.transactions)),
        shares: getExpenseShares(data.transactions, data.categories),
    };
}

// "Alertes budgétaires": shared 80 % rule, most critical first
export function selectBudgetAlerts(data) {
    const usage = getBudgetUsage(data);

    return {
        hasBudget: data.allocations.length > 0,
        items: getBudgetAlerts(usage.items).map((item) => ({
            ...item,
            status: getBudgetStatus(item),
            overrun: item.isOverBudget ? -item.remaining : 0,
        })),
    };
}

// Recurring transactions (future extension, read only)
export function selectRecurringTransactions(data) {
    const categoryNames = categoryNamesOf(data);

    return {
        items: data.recurringTransactions.map((transaction) => ({
            ...transaction,
            categoryName: categoryNames.get(transaction.categoryId),
        })),
        monthlyTotal: getMonthlyRecurringAmount(data.recurringTransactions),
    };
}

const spentByCategory = (transactions, categories) =>
    new Map(getExpenseShares(transactions, categories).map((share) => [share.categoryId, share]));

// Rule-based suggestions comparing each category with the previous month.
// Without any expense in the previous month, no trend is computed.
export function selectExpenseSuggestions(data) {
    const current = spentByCategory(data.transactions, data.categories);
    const previous = spentByCategory(data.previousTransactions, data.categories);
    const suggestions = [];

    if (previous.size === 0) {
        suggestions.push({ key: "noComparison", type: "noComparison" });
    } else {
        // Categories spent both months (a new category has no variation rate)
        const comparisons = [...current.values()]
            .filter((share) => previous.has(share.categoryId))
            .map((share) => {
                const previousAmount = previous.get(share.categoryId).amount;
                return {
                    categoryId: share.categoryId,
                    categoryName: share.categoryName,
                    amount: share.amount,
                    previousAmount,
                    rate: getVariationRate(share.amount, previousAmount),
                    difference: share.amount - previousAmount,
                };
            });

        // Largest increase in euros among the significant ones
        const [increase] = comparisons
            .filter((comparison) => comparison.rate >= TREND_THRESHOLD)
            .sort((a, b) => b.difference - a.difference);
        if (increase) suggestions.push({ key: "increase", type: "increase", ...increase });

        // Most stable category with the largest spending
        const [stable] = comparisons
            .filter((comparison) => Math.abs(comparison.rate) < TREND_THRESHOLD)
            .sort((a, b) => b.amount - a.amount);
        if (stable) suggestions.push({ key: "stable", type: "stable", ...stable });
    }

    // Category furthest from its budget limit, still with spending
    const [withinBudget] = getBudgetUsage(data).items
        .filter((item) => item.planned > 0 && item.spent > 0 && getBudgetStatus(item) === "ok")
        .sort((a, b) => a.usageRate - b.usageRate);
    if (withinBudget) {
        suggestions.push({
            key: "withinBudget",
            type: "withinBudget",
            categoryName: withinBudget.categoryName,
            spent: withinBudget.spent,
            planned: withinBudget.planned,
        });
    }

    return suggestions;
}
