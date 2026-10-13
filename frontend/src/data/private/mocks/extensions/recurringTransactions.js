// FUTURE EXTENSION — FICTIONAL. Proposed RecurringTransaction entity.
// Amounts match the corresponding monthly expenses in ../expenses.js.
// frequency: "monthly" | "yearly"
export const recurringTransactions = [
    { id: 1, label: "Loyer", amount: "560.00", frequency: "monthly", category: { id: 1 } },
    { id: 2, label: "Internet (Free)", amount: "39.99", frequency: "monthly", category: { id: 1 } },
    { id: 3, label: "Téléphone", amount: "19.99", frequency: "monthly", category: { id: 1 } },
    { id: 4, label: "Netflix", amount: "13.99", frequency: "monthly", category: { id: 4 } },
    { id: 5, label: "Mutuelle", amount: "47.60", frequency: "monthly", category: { id: 5 } },
    { id: 6, label: "Assurance habitation", amount: "240.00", frequency: "yearly", category: { id: 1 } },
];
