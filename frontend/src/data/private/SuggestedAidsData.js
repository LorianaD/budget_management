// Aids suggested in the private area (dashboard, aids page).
// Not an eligibility computation: no profile analysis exists, so the badge
// shows the aid's domain (Figma "Potentiellement éligible" / "À vérifier"
// would claim a check the app does not make).
// aidKey: the aid in the private aids catalog (MyAids page).
const SuggestedAidsData = {
    description: "Quelques aides à vérifier selon votre situation.",
    items: [
        {
            key: "activity-bonus",
            aidKey: "activity-bonus",
            tone: "green",
            title: "Prime d'activité",
            badge: { label: "Revenus", variant: "soft-success" },
            description: "Complément de revenu pour les travailleurs à faibles salaires. Aide versée par la CAF.",
        },
        {
            key: "housing",
            aidKey: "apl",
            tone: "blue",
            title: "APL — Aide au logement",
            badge: { label: "Logement", variant: "soft-info" },
            description: "Aide personnalisée pour réduire votre loyer ou remboursement de prêt.",
        },
        {
            key: "health",
            aidKey: "css",
            tone: "green",
            title: "Complémentaire Santé Solidaire",
            badge: { label: "Santé", variant: "soft-success" },
            description: "Mutuelle gratuite ou à faible coût pour les personnes à revenus modestes.",
        },
    ],
};

export default SuggestedAidsData;
