// FICTIONAL — BudgetAllocation entity: planned amount of one expense category
// in one budget (UNIQ_BUDGET_ALLOCATION_CATEGORY).
// July 2026 matches the "Budget prévisionnel" frame (total 1 750 €).
export const budgetAllocations = [
    // June 2026 (budget 1): 1 700 €
    { id: 1, plannedAmount: "700.00", budget: { id: 1 }, category: { id: 1 } },
    { id: 2, plannedAmount: "400.00", budget: { id: 1 }, category: { id: 2 } },
    { id: 3, plannedAmount: "200.00", budget: { id: 1 }, category: { id: 3 } },
    { id: 4, plannedAmount: "150.00", budget: { id: 1 }, category: { id: 4 } },
    { id: 5, plannedAmount: "150.00", budget: { id: 1 }, category: { id: 5 } },
    { id: 6, plannedAmount: "100.00", budget: { id: 1 }, category: { id: 6 } },

    // July 2026 (budget 2): 1 750 €
    { id: 7, plannedAmount: "700.00", budget: { id: 2 }, category: { id: 1 } },
    { id: 8, plannedAmount: "400.00", budget: { id: 2 }, category: { id: 2 } },
    { id: 9, plannedAmount: "200.00", budget: { id: 2 }, category: { id: 3 } },
    { id: 10, plannedAmount: "200.00", budget: { id: 2 }, category: { id: 4 } },
    { id: 11, plannedAmount: "150.00", budget: { id: 2 }, category: { id: 5 } },
    { id: 12, plannedAmount: "100.00", budget: { id: 2 }, category: { id: 6 } },
];
