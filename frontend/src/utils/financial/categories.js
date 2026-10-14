import { distributePercentages, getRate, subtractAmounts, sumAmounts } from "./amounts";
import { getCategoriesOfType, getCompletedExpenses, TRANSACTION_TYPES } from "./transactions";

// Map categoryId -> total spent (completed expenses only)
const sumSpentByCategory = (transactions) => {
    const totals = new Map();
    getCompletedExpenses(transactions).forEach(({ categoryId, amount }) => {
        totals.set(categoryId, sumAmounts([totals.get(categoryId) ?? 0, amount], (value) => value));
    });
    return totals;
};

// Planned vs spent per expense category for one period: the budget
// allocations and the transactions of that period. Only completed expenses
// count as spent. Categories with spending but no allocation are kept with a
// planned amount of 0.
export function getBudgetUsage({ allocations, transactions, categories }) {
    const spentByCategory = sumSpentByCategory(transactions);
    const plannedByCategory = new Map(allocations.map((allocation) => [allocation.categoryId, allocation.plannedAmount]));

    const items = getCategoriesOfType(categories, TRANSACTION_TYPES.EXPENSE)
        .filter((category) => plannedByCategory.has(category.id) || spentByCategory.has(category.id))
        .map((category) => {
            const planned = plannedByCategory.get(category.id) ?? 0;
            const spent = spentByCategory.get(category.id) ?? 0;

            return {
                categoryId: category.id,
                categoryName: category.name,
                planned,
                spent,
                remaining: subtractAmounts(planned, spent),
                usageRate: getRate(spent, planned),
                isOverBudget: spent > planned,
            };
        });

    const totalPlanned = sumAmounts(items, (item) => item.planned);
    const totalSpent = sumAmounts(items, (item) => item.spent);

    return {
        items,
        totalPlanned,
        totalSpent,
        totalRemaining: subtractAmounts(totalPlanned, totalSpent),
        usageRate: getRate(totalSpent, totalPlanned),
    };
}

// Usage rate from which a category is flagged. Single source of the alert rule,
// shared by every page showing budget statuses.
export const BUDGET_WARNING_RATE = 0.8;

// "ok" | "warning" (threshold reached) | "over" (more spent than planned)
export function getBudgetStatus(usageItem) {
    if (usageItem.isOverBudget) return "over";
    if (usageItem.usageRate >= BUDGET_WARNING_RATE) return "warning";
    return "ok";
}

// Categories whose usage reached the threshold, most critical first
export function getBudgetAlerts(usageItems, threshold = BUDGET_WARNING_RATE) {
    return usageItems
        .filter((item) => item.planned > 0 && item.usageRate >= threshold)
        .sort((a, b) => b.usageRate - a.usageRate);
}

// Share of each category in a set of amounts, largest first.
// entries = [{ categoryId, amount }] (e.g. spent or planned amounts)
export function getCategoryShares(entries, categories) {
    const names = new Map(categories.map((category) => [category.id, category.name]));
    const sorted = entries.filter((entry) => entry.amount > 0).sort((a, b) => b.amount - a.amount);
    const percentages = distributePercentages(sorted.map((entry) => entry.amount));

    return sorted.map((entry, index) => ({
        categoryId: entry.categoryId,
        categoryName: names.get(entry.categoryId),
        amount: entry.amount,
        percentage: percentages[index],
    }));
}

// Breakdown of the completed expenses by category ("Répartition des dépenses")
export function getExpenseShares(transactions, categories) {
    const entries = [...sumSpentByCategory(transactions)].map(([categoryId, amount]) => ({ categoryId, amount }));
    return getCategoryShares(entries, categories);
}
