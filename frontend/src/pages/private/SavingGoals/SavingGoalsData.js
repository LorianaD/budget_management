import {
    alert,
    calendar,
    lightbulb,
    piggyBank,
    shield,
    star,
    target,
    walletIcon,
} from "@/assets";

// Texts and presentation content of the saving goals page (Figma 34:52).
// Figures never live here: they are computed from the services data and
// passed, already formatted, to the few text functions below.
const DEMO_READ_ONLY = "l'enregistrement n'est pas disponible avec les données de démonstration";
// The backend stores each goal's current amount, not the deposits themselves
const HISTORY_UNAVAILABLE = "L'historique des versements n'est pas encore disponible : l'application n'enregistre pas encore chaque versement.";

const plural = (count, word) => `${count} ${word}${count > 1 ? "s" : ""}`;

const SavingGoalsData = {
    header: {
        title: "Mes objectifs d'épargne",
        subtitle: "Suivez votre progression et atteignez vos projets.",
        actions: [
            { key: "newGoal", label: "Nouvel objectif", variant: "outline", disabledReason: DEMO_READ_ONLY },
            { key: "addDeposit", label: "Ajouter un versement", variant: "primary", disabledReason: DEMO_READ_ONLY },
        ],
    },

    states: {
        loading: "Chargement de vos objectifs d'épargne…",
        error: "Impossible de charger vos objectifs d'épargne pour le moment.",
        retry: "Réessayer",
        empty: "Vous n'avez pas encore d'objectif d'épargne.",
    },

    summary: {
        label: "Chiffres clés de votre épargne",
        cards: {
            activeGoals: { label: "Objectifs actifs", icon: target, iconTone: "blue" },
            totalSaved: { label: "Montant épargné", icon: piggyBank, iconTone: "green", detail: "Montant actuel de vos objectifs" },
            mostAdvanced: { label: "Objectif le plus avancé", icon: star, iconTone: "orange" },
            monthDeposits: { label: "Versements ce mois-ci", icon: walletIcon, iconTone: "blue" },
        },
        reachedGoals: (count) => `${plural(count, "objectif")} atteint${count > 1 ? "s" : ""}`,
        noActiveGoal: "Aucun objectif en cours",
        unavailable: "Indisponible",
        unavailableDetail: "Historique des versements pas encore enregistré",
        monthDetail: (month) => `Versements de ${month.toLowerCase()}`,
        note: (date) => `Situation au ${date}.`,
    },

    goals: {
        title: "Mes objectifs",
        icon: piggyBank,
        safetyFund: { icon: shield, label: "Fonds de sécurité" },
        calendarIcon: calendar,
        // Status colours: hex values, also read by the charts (canvas)
        statuses: {
            active: { label: "En cours", color: "#1565C0", badge: "soft-info" },
            overdue: { label: "Échéance dépassée", color: "#F57C00", badge: "soft-warning" },
            reached: { label: "Objectif atteint", color: "#2E7D32", badge: "soft-success" },
        },
        // month: formatted deadline ("Décembre 2026"), null without deadline
        deadline: (month, isOverdue) => {
            if (month === null) return "Sans date cible";
            return isOverdue ? `Échéance dépassée : ${month}` : `Date cible : ${month}`;
        },
        // Read before the amounts by screen readers ("450 € sur 1 000 €")
        amountsLabel: (saved, target) => `${saved} épargnés sur ${target}`,
        actions: [
            { key: "details", label: "Voir les détails", variant: "outline", disabledReason: "la fiche détaillée d'un objectif n'est pas encore disponible" },
            { key: "deposit", label: "Ajouter un versement", variant: "primary", disabledReason: DEMO_READ_ONLY },
        ],
    },

    evolution: {
        title: "Évolution de votre épargne",
        description: "Cumul des versements enregistrés à la fin de chaque mois. C'est un historique : le « Montant épargné » ci-dessus correspond au montant actuel de vos objectifs.",
        caption: "Cumul des versements enregistrés, mois par mois",
        columns: ["Mois", "Cumul des versements"],
        empty: "Aucun versement n'est enregistré sur ces mois.",
        unavailable: HISTORY_UNAVAILABLE,
    },

    upcoming: {
        title: "Prochaines étapes",
        description: "Objectifs en cours ayant une date cible, de la plus proche à la plus lointaine.",
        remaining: (amount) => `Encore ${amount} à économiser`,
        empty: "Aucun objectif en cours n'a de date cible.",
    },

    advice: {
        title: "Conseils Budget Manager",
        // Figma says "Des conseils personnalisés": advice comes from simple rules
        description: "Des pistes calculées à partir de vos objectifs.",
        types: {
            safetyFund: {
                tone: "red",
                icon: alert,
                badge: { label: "Objectif prioritaire", variant: "soft-danger" },
                title: ({ saved }) => (saved === null ? "Créer un fonds de sécurité" : "Renforcer votre fonds de sécurité"),
                description: ({ saved, recommendedAmount, months }) =>
                    `${saved === null ? "Aucun objectif n'est identifié comme fonds de sécurité. " : `Il atteint ${saved}. `}Le repère conseillé est de ${months} mois de charges fixes, soit environ ${recommendedAmount}.`,
            },
            overdue: {
                tone: "orange",
                icon: calendar,
                badge: { label: "Échéance dépassée", variant: "soft-warning" },
                title: ({ title }) => `Revoir l'échéance : ${title}`,
                description: ({ amount }) =>
                    `La date cible est passée et il reste ${amount} à épargner. Vous pouvez ajuster la date ou le montant visé : l'objectif reste suivi.`,
            },
            progress: {
                tone: "green",
                icon: star,
                badge: { label: "Bonne progression", variant: "soft-success" },
                title: ({ title }) => title,
                description: ({ title, rate }) => `Votre objectif « ${title} » est déjà atteint à ${rate}.`,
            },
            // General advice: the application does not schedule deposits
            regularity: {
                tone: "blue",
                icon: lightbulb,
                badge: { label: "Suggestion", variant: "soft-info" },
                title: () => "Épargner régulièrement",
                description: () =>
                    "Un petit versement chaque mois fait avancer vos objectifs. Vous pouvez, par exemple, mettre en place un virement permanent vers votre épargne auprès de votre banque.",
            },
        },
    },

    latestDeposits: {
        title: "Derniers versements",
        icon: piggyBank,
        unknownGoal: "Objectif introuvable",
        showMore: "Voir plus de versements",
        count: (shown, total) => `${plural(shown, "versement")} affiché${shown > 1 ? "s" : ""} sur ${total}`,
        empty: "Aucun versement n'est encore enregistré.",
        unavailable: HISTORY_UNAVAILABLE,
    },

    motivation: {
        // Figma title ends with the 💪 emoji (see "Visual improvements — later")
        title: "Chaque euro compte",
        text: "Même de petits versements réguliers permettent d'atteindre de grands objectifs.",
        button: { label: "Ajouter un versement", disabledReason: DEMO_READ_ONLY },
    },
};

export default SavingGoalsData;
