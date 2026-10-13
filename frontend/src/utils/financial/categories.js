import { distributePercentages, getRate, subtractAmounts, sumAmounts } from "./amounts";

// Map categoryId -> total spent
const sumByCategory = (expenses) => {
    const totals = new Map();
    expenses.forEach(({ categoryId, amount }) => {
        totals.set(categoryId, sumAmounts([totals.get(categoryId) ?? 0, amount], (value) => value));
    });
    return totals;
};

// Planned vs spent per category for one period (budgets and expenses of that period).
// Categories with spending but no budget are kept with a planned amount of 0.
export function getBudgetUsage({ budgets, expenses, categories }) {
    const spentByCategory = sumByCategory(expenses);
    const plannedByCategory = new Map(budgets.map((budget) => [budget.categoryId, budget.plannedAmount]));

    const items = categories
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

// Categories whose usage reached the threshold, most critical first
export function getBudgetAlerts(usageItems, threshold) {
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

// Expense breakdown by category ("Répartition des dépenses")
export function getExpenseShares(expenses, categories) {
    const entries = [...sumByCategory(expenses)].map(([categoryId, amount]) => ({ categoryId, amount }));
    return getCategoryShares(entries, categories);
}
