import {
    calendar,
    chevronRightIcon,
    leaf,
    lightbulb,
    mail,
    ruler,
    scale,
    star,
    target,
} from "@/assets";
import { BudgetMethodsData, BudgetSplitData, LinksData } from "@/data";

// Texts and presentation content of the budget methods page (Figma 37:52).
// Educational content only: choosing a method for a budget (Budget.method in
// Symfony) needs the API, so nothing here is saved.
const COMING_SOON = "contenu bientôt disponible";

// Public presentation of a method (Advices page anchor), when it exists
const advicesLinkOf = (key) => {
    const method = BudgetMethodsData.find((item) => item.key === key);
    return `${LinksData.advices.path}#${method.id}`;
};

// Editorial scores out of 5 (Figma comparison table)
const criteria = [
    { key: "ease", label: "Facilité", tone: "blue" },
    { key: "savings", label: "Épargne", tone: "green" },
    { key: "control", label: "Contrôle", tone: "orange" },
    { key: "lowIncome", label: "Petits revenus", tone: "teal" },
];

const MethodsData = {
    header: {
        title: "Méthodes budgétaires",
        subtitle: "Découvrez différentes approches pour mieux gérer votre argent.",
        // Figma "Faire le diagnostic": leads to the self-assessment section
        action: { label: "Trouver ma méthode", variant: "primary", link: "#method-chooser" },
    },

    // Figma says "Recommandée pour vous" / "Selon votre profil": no profile
    // analysis exists, so the method is presented as a good starting point.
    recommended: {
        methodKey: "50-30-20",
        badge: { label: "Conseillée pour débuter", icon: star },
        eyebrow: "Une méthode simple pour commencer",
        title: BudgetSplitData.fiftyThirtyTwenty.label,
        description: "Elle convient à la plupart des budgets et se met en place en quelques minutes. Ce conseil est général : il n'est pas calculé à partir de votre profil.",
        splitLabel: "Répartition de la méthode 50/30/20",
        toggle: { show: "Pourquoi cette méthode ?", hide: "Masquer les explications" },
        reasons: [
            "Trois parts seulement, faciles à retenir et à suivre chaque mois.",
            "Une part d'épargne prévue dès le départ, même modeste.",
            "Une base que vous pouvez ajuster ensuite selon vos charges réelles.",
        ],
    },

    methods: {
        title: "Toutes les méthodes",
        discover: "Découvrir",
        // Icons: existing SVG icons (Figma uses emoji, see "Visual improvements — later")
        items: [
            {
                key: "50-30-20",
                icon: ruler,
                badge: { label: "Populaire", variant: "soft-info" },
                title: "Méthode 50/30/20",
                description: "50 % besoins · 30 % envies · 20 % épargne",
                highlight: "Simple et efficace pour automatiser.",
                link: advicesLinkOf("50-30-20"),
            },
            {
                key: "envelopes",
                icon: mail,
                badge: { label: "Contrôle", variant: "soft-warning" },
                title: "Budget enveloppes",
                description: "Répartissez votre budget par catégories.",
                highlight: "Idéal pour limiter les dépenses.",
                link: advicesLinkOf("envelopes"),
            },
            {
                key: "forecast",
                icon: calendar,
                badge: { label: "Planification", variant: "soft-neutral" },
                title: "Budget prévisionnel",
                description: "Planifiez vos dépenses à l'avance.",
                highlight: "Idéal pour anticiper les imprévus.",
                link: advicesLinkOf("forecast"),
            },
            {
                key: "progressive-savings",
                icon: leaf,
                badge: { label: "Épargne", variant: "soft-success" },
                title: "Épargne progressive",
                description: "Épargnez petit à petit chaque mois.",
                highlight: "Idéal pour débuter sans stress.",
                link: advicesLinkOf("progressive-savings"),
            },
            {
                key: "goals",
                icon: target,
                badge: { label: "Projets", variant: "soft-neutral" },
                title: "Budget par objectifs",
                description: "Organisez vos finances par projets précis.",
                highlight: "Restez motivé par vos rêves.",
                // The private saving goals page applies this method
                link: LinksData.savingGoals.path,
            },
            {
                key: "balanced",
                icon: scale,
                badge: { label: "Flexibilité", variant: "soft-warning" },
                title: "Budget équilibré",
                description: "Répartissez vos revenus selon vos priorités.",
                highlight: "Adaptez votre budget chaque mois.",
                disabledReason: COMING_SOON,
            },
        ],
    },

    comparison: {
        title: "Comparer les méthodes",
        description: "Trouvez celle qui correspond à votre style de vie.",
        caption: "Comparaison des méthodes budgétaires, notes indicatives sur 5",
        note: "Notes indicatives de l'équipe Budget Manager, sur 5.",
        methodColumn: "Méthode",
        criteria,
        score: (value) => `${value} sur 5`,
        recommendedLabel: "conseillée pour débuter",
        rows: [
            { key: "50-30-20", label: "50/30/20", scores: { ease: 3, savings: 4, control: 3, lowIncome: 4 } },
            { key: "envelopes", label: "Budget enveloppes", scores: { ease: 2, savings: 3, control: 5, lowIncome: 5 } },
            { key: "forecast", label: "Budget prévisionnel", scores: { ease: 3, savings: 4, control: 4, lowIncome: 3 } },
            { key: "progressive-savings", label: "Épargne progressive", scores: { ease: 4, savings: 5, control: 3, lowIncome: 5 } },
            { key: "goals", label: "Budget par objectifs", scores: { ease: 3, savings: 5, control: 4, lowIncome: 3 } },
            { key: "balanced", label: "Budget équilibré", scores: { ease: 4, savings: 3, control: 4, lowIncome: 4 } },
        ],
    },

    simulator: {
        id: "method-simulator",
        title: "Simuler une méthode",
        description: "Entrez votre revenu mensuel pour visualiser la répartition. Simple calcul indicatif : rien n'est enregistré.",
        split: BudgetSplitData.fiftyThirtyTwenty,
        income: { label: "Vos revenus mensuels", defaultValue: 2000, min: 0, max: 10000, step: 50 },
        method: (label) => `Méthode appliquée : ${label}`,
        resultsLabel: "Répartition de vos revenus",
        total: (amount) => `= ${amount}`,
    },

    chooser: {
        id: "method-chooser",
        title: "Comment choisir sa méthode ?",
        description: "Identifiez votre situation pour trouver la meilleure approche.",
        chevronIcon: chevronRightIcon,
        linkLabel: (method) => `Voir la méthode ${method}`,
        situations: [
            { key: "beginner", tone: "blue", title: "Je débute", methodKey: "50-30-20", text: "Méthode idéale pour commencer simplement." },
            { key: "overspending", tone: "orange", title: "Je dépense trop", methodKey: "envelopes", text: "Reprendre le contrôle catégorie par catégorie." },
            { key: "project", tone: "violet", title: "Je prépare un projet", methodKey: "goals", text: "Organiser ses finances autour d'un but précis." },
            { key: "anticipate", tone: "teal", title: "Je veux anticiper", methodKey: "forecast", text: "Planifier à l'avance pour éviter les surprises." },
        ],
    },

    testimonials: {
        title: "Ils ont trouvé la méthode adaptée",
        note: "Témoignages fictifs, présentés à titre d'illustration.",
        items: [
            {
                key: "sophie",
                quote: "Le budget enveloppes m'a permis de réduire mes dépenses alimentaires de 30 % en trois mois.",
                author: { initials: "SM", name: "Sophie M.", profile: "Paris" },
                tone: "blue",
            },
            {
                key: "thomas",
                quote: "La méthode 50/30/20 est simple à appliquer. Je n'avais jamais autant épargné.",
                author: { initials: "TC", name: "Thomas C.", profile: "Lyon" },
                tone: "blue",
            },
            {
                key: "marie",
                quote: "Grâce au budget par objectifs, j'ai pu partir en vacances sans stress financier.",
                author: { initials: "ML", name: "Marie L.", profile: "Bordeaux" },
                tone: "blue",
            },
        ],
    },

    advice: {
        icon: lightbulb,
        eyebrow: "Conseil Budget Manager",
        title: "Il n'existe pas de méthode parfaite.",
        text: "La meilleure méthode est celle que vous pouvez appliquer régulièrement sur le long terme.",
    },

    cta: {
        title: "Prêt à essayer une méthode ?",
        text: "Choisissez l'approche qui vous correspond et commencez dès aujourd'hui à transformer vos finances.",
        actions: [
            { key: "simulate", label: "Tester la méthode recommandée", variant: "primary-white", link: "#method-simulator" },
            { key: "create", label: "Créer mon budget", variant: "outline-white", disabledReason: "la création d'un budget n'est pas encore disponible" },
        ],
    },
};

export default MethodsData;
