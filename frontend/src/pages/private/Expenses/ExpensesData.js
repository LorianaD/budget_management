import {
    alert,
    banknoteIcon,
    checkCircle,
    creditCard,
    fileText,
    info,
    lightbulb,
    pencilIcon,
    trashIcon,
    walletIcon,
} from "@/assets";

// Texts and presentation content of the transactions page (Figma 28:52).
// Figures never live here: they come from expensesSelectors and are passed,
// already formatted, to the few text functions below.
const DEMO_READ_ONLY = "l'enregistrement n'est pas disponible avec les données de démonstration";

const plural = (count, singular, pluralForm = `${singular}s`) => `${count} ${count > 1 ? pluralForm : singular}`;

const ExpensesData = {
    header: {
        title: "Mes transactions",
        subtitle: "Suivez vos dépenses et revenus au quotidien.",
        actions: [
            { key: "addExpense", label: "Ajouter une dépense", variant: "outline", disabledReason: DEMO_READ_ONLY },
            { key: "addIncome", label: "Ajouter un revenu", variant: "primary", disabledReason: DEMO_READ_ONLY },
        ],
    },

    states: {
        loading: "Chargement de vos transactions…",
        error: "Impossible de charger vos transactions pour le moment.",
        retry: "Réessayer",
        empty: "Aucune transaction ni aucun budget n'est enregistré pour ce mois.",
    },

    summary: {
        label: "Chiffres clés des transactions du mois",
        cards: {
            expenses: { label: "Dépenses du mois", icon: creditCard, iconTone: "orange", valueTone: "negative", detail: "Dépenses réalisées" },
            incomes: { label: "Revenus du mois", icon: walletIcon, iconTone: "blue", valueTone: "positive", detail: "Revenus réalisés" },
            // Figma says "Solde actuel": this is the month's balance, not a bank balance
            balance: { label: "Solde du mois", icon: banknoteIcon, iconTone: "green", detail: "Revenus − dépenses" },
            count: { label: "Transactions", icon: fileText, iconTone: "blue" },
        },
        countDetail: (otherCount) =>
            (otherCount > 0 ? `réalisées · ${plural(otherCount, "autre prévue ou annulée", "autres prévues ou annulées")}` : "réalisées"),
        note: "Seules les transactions réalisées sont comptées. Le solde du mois est calculé à partir de vos mouvements : ce n'est pas le solde de votre compte bancaire.",
    },

    tabs: {
        label: "Type de transaction",
        items: [
            { key: "expense", label: "Dépenses" },
            { key: "income", label: "Revenus" },
        ],
    },

    filters: {
        label: "Filtres des transactions",
        search: { label: "Rechercher une transaction", placeholder: "Rechercher une transaction…" },
        category: { label: "Catégorie", all: "Toutes les catégories" },
        status: { label: "Statut", all: "Tous les statuts" },
        sort: {
            label: "Trier par",
            options: [
                { value: "date-desc", label: "Date (récentes d'abord)" },
                { value: "amount-desc", label: "Montant décroissant" },
                { value: "amount-asc", label: "Montant croissant" },
            ],
        },
        range: {
            label: "Période affichée",
            options: [
                { value: "today", label: "Aujourd'hui" },
                { value: "week", label: "Cette semaine" },
                { value: "month", label: "Ce mois-ci" },
            ],
            unavailableReason: "disponible uniquement pour le mois en cours",
        },
        reset: { label: "Réinitialiser les filtres", disabledReason: "aucun filtre n'est actif" },
        active: {
            label: "Filtres actifs :",
            search: (value) => `Recherche « ${value} »`,
            categoryId: (value) => `Catégorie : ${value}`,
            status: (value) => `Statut : ${value}`,
            range: (value) => `Période : ${value}`,
            sort: (value) => `Tri : ${value}`,
        },
        results: (count, total) => `${plural(count, "transaction affichée", "transactions affichées")} sur ${total}`,
    },

    table: {
        caption: "Transactions du mois",
        columns: {
            date: "Date",
            description: "Description",
            category: "Catégorie",
            amount: "Montant",
            status: "Statut",
            actions: "Actions",
        },
        statuses: {
            completed: { label: "Validée", badge: "soft-success" },
            planned: { label: "Prévue", badge: "soft-info" },
            cancelled: { label: "Annulée", badge: "soft-neutral" },
        },
        actions: [
            { key: "edit", label: "Modifier", icon: pencilIcon },
            { key: "delete", label: "Supprimer", icon: trashIcon },
        ],
        actionsReason: DEMO_READ_ONLY,
        showMore: "Voir plus de transactions",
        noResult: "Aucune transaction ne correspond à vos filtres.",
        emptyType: {
            expense: "Aucune dépense n'est enregistrée pour ce mois.",
            income: "Aucun revenu n'est enregistré pour ce mois.",
        },
    },

    breakdown: {
        title: "Répartition des dépenses",
        description: "Dépenses réalisées par catégorie",
        totalLabel: "total",
        empty: "Aucune dépense réalisée ce mois-ci.",
    },

    alerts: {
        title: "Alertes budgétaires",
        description: "Catégories ayant utilisé au moins 80 % de leur budget",
        usage: (rate) => `${rate} du budget utilisé`,
        overrun: (amount) => `Dépassement de ${amount}`,
        empty: "Aucune catégorie n'atteint 80 % de son budget.",
        noBudget: "Aucun budget n'est défini pour ce mois.",
    },

    recurring: {
        title: "Transactions récurrentes",
        description: "Lecture seule : la gestion des transactions récurrentes n'est pas encore disponible.",
        frequencies: { monthly: "Mensuel", yearly: "Annuel" },
        actions: [
            { key: "edit", label: "Modifier", variant: "outline" },
            { key: "suspend", label: "Suspendre", variant: "outline-neutral" },
        ],
        actionsReason: "la gestion des transactions récurrentes n'est pas encore disponible",
        empty: "Aucune transaction récurrente.",
    },

    suggestions: {
        title: "Suggestions Budget Manager",
        // Figma says "Conseils personnalisés": suggestions come from simple rules
        description: "Des repères calculés à partir de vos dépenses réalisées.",
        empty: "Aucune suggestion pour ce mois.",
        types: {
            increase: {
                tone: "orange",
                icon: alert,
                title: ({ categoryName }) => `Dépenses en hausse : ${categoryName}`,
                description: ({ amount, previousAmount, rate }) =>
                    `${amount} ce mois-ci contre ${previousAmount} le mois précédent (+${rate}). Vérifiez si cette hausse était prévue.`,
            },
            stable: {
                tone: "green",
                icon: lightbulb,
                title: ({ categoryName }) => `Dépenses stables : ${categoryName}`,
                description: ({ amount, previousAmount }) =>
                    `${amount} ce mois-ci, proche du mois précédent (${previousAmount}).`,
            },
            withinBudget: {
                tone: "blue",
                icon: checkCircle,
                title: ({ categoryName }) => `Budget respecté : ${categoryName}`,
                description: ({ spent, planned }) => `${spent} dépensés sur ${planned} prévus à ce jour.`,
            },
            noComparison: {
                tone: "blue",
                icon: info,
                title: () => "Pas encore de comparaison",
                description: () =>
                    "Aucune dépense n'est enregistrée le mois précédent : l'évolution de vos dépenses apparaîtra le mois prochain.",
            },
        },
    },
};

export default ExpensesData;
