// FICTIONAL — SavingGoal entity, matching the "Objectifs d'épargne" frame.
// currentAmount equals the sum of each goal's deposits in extensions/savingDeposits.
export const savingGoals = [
    {
        id: 1,
        title: "Vacances en famille",
        targetAmount: "1000.00",
        currentAmount: "450.00",
        deadline: "2026-12-31T00:00:00+01:00",
        createdAt: "2026-01-02T10:00:00+01:00",
    },
    {
        id: 2,
        title: "Nouvelle voiture",
        targetAmount: "8000.00",
        currentAmount: "2500.00",
        deadline: "2027-06-30T00:00:00+02:00",
        createdAt: "2026-01-02T10:05:00+01:00",
    },
    {
        id: 3,
        title: "Fonds d'urgence",
        targetAmount: "3000.00",
        currentAmount: "300.00",
        deadline: null,
        createdAt: "2026-03-01T09:00:00+01:00",
    },
    {
        id: 4,
        title: "Formation professionnelle",
        targetAmount: "1200.00",
        currentAmount: "600.00",
        deadline: "2027-03-31T00:00:00+02:00",
        createdAt: "2026-02-01T09:00:00+01:00",
    },
];
