import {
    alert,
    fileText,
    lightbulb,
    piggyBank,
    shield,
    star,
    target,
    walletIcon,
} from "@/assets";
import { LinksData } from "@/data";

// Texts and presentation content of the budget page (Figma 16:4).
// Figures never live here: they are computed from the services data and
// passed, already formatted, to the few text functions below.
const DEMO_READ_ONLY = "l'enregistrement n'est pas disponible avec les données de démonstration";
const COMING_SOON = "fonctionnalité bientôt disponible";

const plural = (count, word) => `${count} ${word}${count > 1 ? "s" : ""}`;

const BudgetData = {
    header: {
        title: "Budget prévisionnel",
        subtitle: "Préparez votre budget du mois et anticipez vos dépenses.",
        actions: [
            { key: "addExpense", label: "Ajouter une dépense prévue", variant: "outline", disabledReason: DEMO_READ_ONLY },
            // No "planned income" entity exists in the backend
            { key: "addIncome", label: "Ajouter un revenu prévu", variant: "primary", disabledReason: "les revenus prévus ne sont pas encore gérés par l'application" },
        ],
    },

    states: {
        loading: "Chargement de votre budget…",
        error: "Impossible de charger votre budget pour le moment.",
        retry: "Réessayer",
        empty: "Aucun budget, revenu ou dépense n'est enregistré pour ce mois.",
    },

    forecast: {
        label: "Chiffres clés du budget prévisionnel",
        cards: {
            income: { label: "Revenus du mois", icon: walletIcon, iconTone: "blue", detail: "Revenus enregistrés" },
            plannedExpenses: { label: "Dépenses prévues", icon: fileText, iconTone: "orange", detail: "Total des budgets par catégorie" },
            // Actual deposits of the month, not a savings target
            savings: { label: "Épargne du mois", icon: piggyBank, iconTone: "green", detail: "Versements effectués ce mois-ci" },
            remaining: { label: "Reste à vivre prévisionnel", icon: star, iconTone: "green" },
        },
        perDay: "par jour sur le mois",
        note: "Reste à vivre prévisionnel = revenus du mois − dépenses prévues − épargne du mois. Le tableau de bord, lui, calcule le reste à vivre à partir des dépenses réellement enregistrées.",
    },

    table: {
        title: "Répartition prévisionnelle",
        caption: "Budget prévu, dépensé à ce jour et différence par catégorie",
        columns: {
            category: "Catégorie",
            planned: "Budget prévu",
            spent: "Dépensé à ce jour",
            difference: "Différence",
        },
        total: "Total",
        noExpenses: "Aucune dépense n'est encore enregistrée pour ce mois : la colonne « Dépensé à ce jour » est à 0 €.",
        empty: "Aucun budget n'est défini pour ce mois.",
        alertIcon: alert,
        overrun: (amount) => `vos dépenses dépassent le budget prévu de ${amount}.`,
    },

    breakdown: {
        title: "Répartition du budget",
        totalLabel: "Budget total",
        empty: "Aucun budget à répartir pour ce mois.",
    },

    movements: {
        title: "Évolution des mouvements du mois",
        description: "Solde calculé depuis 0 € au début du mois à partir des mouvements enregistrés, semaine par semaine. Ce n'est pas le solde de votre compte bancaire.",
        start: "Début du mois",
        end: "Fin du mois",
        week: (from, to) => `Du ${from} au ${to}`,
        flows: {
            income: "Revenus",
            expenses: "Dépenses",
            savings: "Épargne",
        },
        noMovement: "Aucun mouvement",
        balance: "Solde calculé :",
        empty: "Aucun mouvement n'est enregistré pour ce mois.",
    },

    safetyFund: {
        title: "Fonds de sécurité",
        icon: shield,
        description: "Votre filet de sécurité pour les imprévus.",
        targetPrefix: "sur un objectif de",
        reached: "de l'objectif atteint",
        contributeButton: { label: "Contribuer", disabledReason: DEMO_READ_ONLY },
        recommendation: (months, amount) =>
            `Repère conseillé : ${months} mois de charges fixes, soit environ ${amount}. Ce repère est calculé à partir de vos charges récurrentes ; il est distinct de l'objectif que vous avez fixé.`,
        empty: "Aucun objectif d'épargne n'est identifié comme fonds de sécurité.",
    },

    quickActions: {
        title: "Actions rapides",
        items: [
            { key: "edit", label: "Modifier le budget", variant: "outline", disabledReason: DEMO_READ_ONLY },
            { key: "export", label: "Exporter en PDF", variant: "outline-neutral", disabledReason: COMING_SOON },
            { key: "compare", label: (month) => `Comparer avec ${month}`, variant: "outline-neutral", disabledReason: COMING_SOON },
            { key: "expenses", label: "Voir les dépenses réelles", variant: "outline-success", link: LinksData.expenses.path },
        ],
    },

    suggestions: {
        title: "Suggestions Budget Manager",
        // Figma says "Des conseils personnalisés": suggestions come from simple rules
        description: "Des pistes calculées à partir de votre budget du mois.",
        empty: "Aucune suggestion pour ce mois.",
        types: {
            priority: {
                tone: "red",
                icon: alert,
                badge: { label: "Prioritaire", variant: "soft-danger" },
                title: ({ categoryName }) => `Réduire les dépenses : ${categoryName}`,
                description: ({ amount, rate }) =>
                    `Les dépenses de cette catégorie dépassent le budget prévu de ${amount}${rate ? ` (${rate})` : ""}. Regardez les dernières dépenses pour repérer celles qui peuvent attendre.`,
            },
            advice: {
                tone: "orange",
                icon: lightbulb,
                badge: { label: "Conseil", variant: "soft-warning" },
                title: ({ saved }) => (saved === null ? "Créer un fonds de sécurité" : "Renforcer votre fonds de sécurité"),
                description: ({ saved, recommendedAmount }) =>
                    `${saved === null ? "" : `Il atteint ${saved}. `}Le repère conseillé est d'environ ${recommendedAmount}. Même un petit versement régulier aide à faire face aux imprévus.`,
            },
            opportunity: {
                tone: "green",
                icon: target,
                badge: { label: "Opportunité", variant: "soft-success" },
                title: () => "Budget non utilisé",
                description: ({ amount, categoryCount }) =>
                    `${amount} de budget prévu ne sont pas dépensés à ce jour dans ${plural(categoryCount, "catégorie")}. Vous pouvez les garder en réserve ou les affecter à votre épargne.`,
            },
        },
    },
};

export default BudgetData;
