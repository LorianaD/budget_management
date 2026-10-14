// FICTIONAL — Category entity.
// - type: "expense" | "income" (TransactionType): expense and income
//   categories are distinct, a transaction uses a category of its own type
// - code: stable technical identifier
// - isSystem: categories provided by the application (user = null, omitted)
// - parent: optional sub-category relation (unused by the demo)
const SYSTEM = { isSystem: true, parent: null, createdAt: "2026-01-01T00:00:00+01:00", updatedAt: null, deletedAt: null };

export const categories = [
    // Expenses
    { id: 1, name: "Logement", code: "housing", type: "expense", ...SYSTEM },
    { id: 2, name: "Alimentation", code: "food", type: "expense", ...SYSTEM },
    { id: 3, name: "Transport", code: "transport", type: "expense", ...SYSTEM },
    { id: 4, name: "Loisirs", code: "leisure", type: "expense", ...SYSTEM },
    { id: 5, name: "Santé", code: "health", type: "expense", ...SYSTEM },
    { id: 6, name: "Formation", code: "education", type: "expense", ...SYSTEM },

    // Incomes
    { id: 7, name: "Salaire", code: "salary", type: "income", ...SYSTEM },
    { id: 8, name: "Aides et allocations", code: "benefits", type: "income", ...SYSTEM },
    { id: 9, name: "Autres revenus", code: "other_income", type: "income", ...SYSTEM },
];
