// FICTIONAL — Budget entity: one budget per user and month (UNIQ_BUDGET_USER_PERIOD).
// month and year are integers; method is a BudgetMethod value
// ("custom" | "50_30_20" | "zero_based" | "envelope").
// The planned amounts live in BudgetAllocation (./budgetAllocations.js).
export const budgets = [
    { id: 1, month: 6, year: 2026, method: "custom", createdAt: "2026-05-28T18:00:00+02:00", updatedAt: null },
    { id: 2, month: 7, year: 2026, method: "custom", createdAt: "2026-06-28T18:00:00+02:00", updatedAt: "2026-07-01T09:00:00+02:00" },
];
