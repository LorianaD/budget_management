// FUTURE EXTENSION — FICTIONAL. Proposed SavingDeposit entity.
// For each goal, the deposits add up to SavingGoal.currentAmount.
export const savingDeposits = [
    // Vacances en famille (450 €)
    { id: 1, amount: "50.00", depositedAt: "2026-01-10T10:00:00+01:00", savingGoal: { id: 1 } },
    { id: 2, amount: "50.00", depositedAt: "2026-02-10T10:00:00+01:00", savingGoal: { id: 1 } },
    { id: 3, amount: "75.00", depositedAt: "2026-03-10T10:00:00+01:00", savingGoal: { id: 1 } },
    { id: 4, amount: "75.00", depositedAt: "2026-04-10T10:00:00+02:00", savingGoal: { id: 1 } },
    { id: 5, amount: "75.00", depositedAt: "2026-05-10T10:00:00+02:00", savingGoal: { id: 1 } },
    { id: 6, amount: "75.00", depositedAt: "2026-06-10T10:00:00+02:00", savingGoal: { id: 1 } },
    { id: 7, amount: "50.00", depositedAt: "2026-07-10T10:00:00+02:00", savingGoal: { id: 1 } },

    // Nouvelle voiture (2 500 €)
    { id: 8, amount: "1000.00", depositedAt: "2026-01-03T10:00:00+01:00", savingGoal: { id: 2 } },
    { id: 9, amount: "300.00", depositedAt: "2026-02-03T10:00:00+01:00", savingGoal: { id: 2 } },
    { id: 10, amount: "300.00", depositedAt: "2026-03-03T10:00:00+01:00", savingGoal: { id: 2 } },
    { id: 11, amount: "300.00", depositedAt: "2026-04-03T10:00:00+02:00", savingGoal: { id: 2 } },
    { id: 12, amount: "300.00", depositedAt: "2026-05-03T10:00:00+02:00", savingGoal: { id: 2 } },
    { id: 13, amount: "300.00", depositedAt: "2026-06-03T10:00:00+02:00", savingGoal: { id: 2 } },

    // Fonds d'urgence (300 €)
    { id: 14, amount: "100.00", depositedAt: "2026-03-01T10:00:00+01:00", savingGoal: { id: 3 } },
    { id: 15, amount: "75.00", depositedAt: "2026-04-01T10:00:00+02:00", savingGoal: { id: 3 } },
    { id: 16, amount: "50.00", depositedAt: "2026-05-01T10:00:00+02:00", savingGoal: { id: 3 } },
    { id: 17, amount: "50.00", depositedAt: "2026-06-01T10:00:00+02:00", savingGoal: { id: 3 } },
    { id: 18, amount: "25.00", depositedAt: "2026-07-01T10:00:00+02:00", savingGoal: { id: 3 } },

    // Formation professionnelle (600 €)
    { id: 19, amount: "100.00", depositedAt: "2026-02-05T10:00:00+01:00", savingGoal: { id: 4 } },
    { id: 20, amount: "100.00", depositedAt: "2026-03-05T10:00:00+01:00", savingGoal: { id: 4 } },
    { id: 21, amount: "100.00", depositedAt: "2026-04-05T10:00:00+02:00", savingGoal: { id: 4 } },
    { id: 22, amount: "100.00", depositedAt: "2026-05-05T10:00:00+02:00", savingGoal: { id: 4 } },
    { id: 23, amount: "100.00", depositedAt: "2026-06-05T10:00:00+02:00", savingGoal: { id: 4 } },
    { id: 24, amount: "100.00", depositedAt: "2026-07-05T10:00:00+02:00", savingGoal: { id: 4 } },
];
