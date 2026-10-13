// FICTIONAL — Budget entity: one planned amount per category and month.
// `month` uses the provisional "07" format, `year` is an integer.
// July 2026 matches the "Budget prévisionnel" frame (total 1 750 €).
export const budgets = [
    // June 2026
    { id: 1, month: "06", year: 2026, plannedAmount: "700.00", category: { id: 1 } },
    { id: 2, month: "06", year: 2026, plannedAmount: "400.00", category: { id: 2 } },
    { id: 3, month: "06", year: 2026, plannedAmount: "200.00", category: { id: 3 } },
    { id: 4, month: "06", year: 2026, plannedAmount: "150.00", category: { id: 4 } },
    { id: 5, month: "06", year: 2026, plannedAmount: "150.00", category: { id: 5 } },
    { id: 6, month: "06", year: 2026, plannedAmount: "100.00", category: { id: 6 } },

    // July 2026
    { id: 7, month: "07", year: 2026, plannedAmount: "700.00", category: { id: 1 } },
    { id: 8, month: "07", year: 2026, plannedAmount: "400.00", category: { id: 2 } },
    { id: 9, month: "07", year: 2026, plannedAmount: "200.00", category: { id: 3 } },
    { id: 10, month: "07", year: 2026, plannedAmount: "200.00", category: { id: 4 } },
    { id: 11, month: "07", year: 2026, plannedAmount: "150.00", category: { id: 5 } },
    { id: 12, month: "07", year: 2026, plannedAmount: "100.00", category: { id: 6 } },
];
