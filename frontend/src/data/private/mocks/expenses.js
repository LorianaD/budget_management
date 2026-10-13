// FICTIONAL — Expense entity.
// July 2026 totals per category match the "Dépenses" frame alerts
// (Logement 650 / 700, Alimentation 320 / 400, Loisirs 250 / 200) and add up
// to 1 580 €. June 2026 gives a previous month for comparisons.
export const expenses = [
    // ---------- June 2026 (1 449 €) ----------
    { id: 1, label: "Pass Navigo", amount: "86.40", spentAt: "2026-06-01T08:10:00+02:00", category: { id: 3 } },
    { id: 2, label: "Mutuelle", amount: "47.60", spentAt: "2026-06-02T09:00:00+02:00", category: { id: 5 } },
    { id: 3, label: "Loyer", amount: "560.00", spentAt: "2026-06-05T09:00:00+02:00", category: { id: 1 } },
    { id: 4, label: "Courses Carrefour", amount: "96.30", spentAt: "2026-06-07T11:20:00+02:00", category: { id: 2 } },
    { id: 5, label: "Netflix", amount: "13.99", spentAt: "2026-06-08T06:00:00+02:00", category: { id: 4 } },
    { id: 6, label: "Internet (Free)", amount: "39.99", spentAt: "2026-06-12T06:00:00+02:00", category: { id: 1 } },
    { id: 7, label: "Restaurant", amount: "62.00", spentAt: "2026-06-13T20:45:00+02:00", category: { id: 4 } },
    { id: 8, label: "Courses Lidl", amount: "88.40", spentAt: "2026-06-14T10:05:00+02:00", category: { id: 2 } },
    { id: 9, label: "Cours en ligne", amount: "49.00", spentAt: "2026-06-14T18:30:00+02:00", category: { id: 6 } },
    { id: 10, label: "Téléphone", amount: "19.99", spentAt: "2026-06-15T06:00:00+02:00", category: { id: 1 } },
    { id: 11, label: "Essence", amount: "88.60", spentAt: "2026-06-16T17:40:00+02:00", category: { id: 3 } },
    { id: 12, label: "Électricité et eau", amount: "30.02", spentAt: "2026-06-18T06:00:00+02:00", category: { id: 1 } },
    { id: 13, label: "Pharmacie", amount: "22.40", spentAt: "2026-06-19T12:15:00+02:00", category: { id: 5 } },
    { id: 14, label: "Cinéma", amount: "24.00", spentAt: "2026-06-20T21:00:00+02:00", category: { id: 4 } },
    { id: 15, label: "Marché", amount: "41.20", spentAt: "2026-06-21T09:30:00+02:00", category: { id: 2 } },
    { id: 16, label: "Sortie entre amis", amount: "60.01", spentAt: "2026-06-27T22:10:00+02:00", category: { id: 4 } },
    { id: 17, label: "Courses Carrefour", amount: "119.10", spentAt: "2026-06-28T11:00:00+02:00", category: { id: 2 } },

    // ---------- July 2026 (1 580 €) ----------
    // Logement: 650 €
    { id: 18, label: "Loyer", amount: "560.00", spentAt: "2026-07-05T09:00:00+02:00", category: { id: 1 } },
    { id: 19, label: "Internet (Free)", amount: "39.99", spentAt: "2026-07-12T06:00:00+02:00", category: { id: 1 } },
    { id: 20, label: "Téléphone", amount: "19.99", spentAt: "2026-07-15T06:00:00+02:00", category: { id: 1 } },
    { id: 21, label: "Électricité et eau", amount: "30.02", spentAt: "2026-07-18T06:00:00+02:00", category: { id: 1 } },
    // Alimentation: 320 €
    { id: 22, label: "Marché", amount: "34.50", spentAt: "2026-07-04T09:40:00+02:00", category: { id: 2 } },
    { id: 23, label: "Courses Lidl", amount: "68.20", spentAt: "2026-07-08T18:20:00+02:00", category: { id: 2 } },
    { id: 24, label: "Boulangerie", amount: "12.30", spentAt: "2026-07-10T08:05:00+02:00", category: { id: 2 } },
    { id: 25, label: "Courses Carrefour", amount: "82.00", spentAt: "2026-07-12T11:15:00+02:00", category: { id: 2 } },
    { id: 26, label: "Courses Carrefour", amount: "75.40", spentAt: "2026-07-19T10:50:00+02:00", category: { id: 2 } },
    { id: 27, label: "Marché", amount: "15.60", spentAt: "2026-07-25T09:20:00+02:00", category: { id: 2 } },
    { id: 28, label: "Courses Lidl", amount: "32.00", spentAt: "2026-07-26T07:15:00+02:00", category: { id: 2 } },
    // Transport: 180 €
    { id: 29, label: "Pass Navigo", amount: "86.40", spentAt: "2026-07-01T08:10:00+02:00", category: { id: 3 } },
    { id: 30, label: "Essence", amount: "45.00", spentAt: "2026-07-09T17:30:00+02:00", category: { id: 3 } },
    { id: 31, label: "Essence", amount: "48.60", spentAt: "2026-07-23T18:05:00+02:00", category: { id: 3 } },
    // Loisirs: 250 €
    { id: 32, label: "Netflix", amount: "13.99", spentAt: "2026-07-08T06:00:00+02:00", category: { id: 4 } },
    { id: 33, label: "Cinéma", amount: "24.00", spentAt: "2026-07-11T21:00:00+02:00", category: { id: 4 } },
    { id: 34, label: "Concert", amount: "65.00", spentAt: "2026-07-17T20:00:00+02:00", category: { id: 4 } },
    { id: 35, label: "Restaurant", amount: "58.50", spentAt: "2026-07-20T21:10:00+02:00", category: { id: 4 } },
    { id: 36, label: "Livres", amount: "38.51", spentAt: "2026-07-24T16:25:00+02:00", category: { id: 4 } },
    { id: 37, label: "Bowling", amount: "50.00", spentAt: "2026-07-25T20:30:00+02:00", category: { id: 4 } },
    // Santé: 100 €
    { id: 38, label: "Mutuelle", amount: "47.60", spentAt: "2026-07-02T09:00:00+02:00", category: { id: 5 } },
    { id: 39, label: "Pharmacie", amount: "22.40", spentAt: "2026-07-06T12:00:00+02:00", category: { id: 5 } },
    { id: 40, label: "Consultation médecin", amount: "30.00", spentAt: "2026-07-15T10:30:00+02:00", category: { id: 5 } },
    // Formation: 80 €
    { id: 41, label: "Cours en ligne", amount: "49.00", spentAt: "2026-07-14T18:30:00+02:00", category: { id: 6 } },
    { id: 42, label: "Livre professionnel", amount: "31.00", spentAt: "2026-07-22T14:00:00+02:00", category: { id: 6 } },
];
