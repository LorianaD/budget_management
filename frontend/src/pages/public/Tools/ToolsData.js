
import { check, piggyBank, ToolsHeroImg, search, target, shield, piggyBankViolet, info, alert, checkCircle, calendar, logement, famille } from "@/assets";
import { ToolsInterpretationImg } from "@/assets/images/tools";
import { LinksData } from "@/data";

const ToolsData = {
    hero: {
        eyebrow: {
            label: "Outils & simulateurs",
            variant: "info",
        },

        title: "Simulateurs budgétaires gratuits",

        description: "Testez différentes méthodes et obtenez une vision plus claire de votre situation financière.",

        search: {
            label: "Rechercher un simulateur",
            placeholder: "Rechercher un simulateur...",
            buttonLabel: "Rechercher",
        },

        suggestionsLabel: "Simulateurs populaires",

        suggestions: [
            {
                key: "50-30-20",
                label: "Calculateur 50/30/20",
                link: "#calculator",
            },
            {
                key: "reste-a-vivre",
                label: "Reste à vivre",
                link: "#reste-a-vivre",
            },
            {
                key: "budget-familial",
                label: "Budget familial",
                link: "#budget-familial",
            },
        ],

        image: {
            src: ToolsHeroImg,
            alt: "Illustration d'un ordinateur présentant des graphiques budgétaires",
        },
    },

    calculator: {
        eyebrow: {
            label: "Simulation rapide",
            variant: "warning",
        },

        header: {
            title: "Calculateur 50/30/20",
            titleVariant: "default",
            variant: "default",
        },

        variant: "calculator",

        income: {
            label: "Revenu mensuel net",
            defaultValue: 2000,
            min: 0,
            max: 10000,
            step: 50,
            currency: "EUR",
        },

        allocations: [
            {
                key: "needs",
                label: "Besoins essentiels",
                percentage: 50,
                color: "#1565C0",
            },
            {
                key: "wants",
                label: "Envies",
                percentage: 30,
                color: "#F57C00",
            },
            {
                key: "savings",
                label: "Épargne",
                percentage: 20,
                color: "#2E7D32",
            },
        ],

        methodLabel: "Méthode appliquée : 50/30/20",
        chartLabel: "50/30/20",

        results: {
            title: "Répartition de votre budget",
            totalLabel: "Total",
        },

        actions: [
            {
                label: "Tester maintenant",
                link: "#simulators",
                variant: "primary",
            },
        ],
    },

    simulators: {
        header: {
            title: "Tous les simulateurs",
            titleVariant: "center",

            description: "6 outils gratuits pour mieux comprendre votre budget.",
            descriptionVariant: "center",

            variant: "center",
        },

        variant: "simulators",

        emptyMessage: "Aucun simulateur ne correspond à votre recherche.",

        // Les pages de chaque simulateur n'existent pas encore :
        // les boutons restent désactivés tant que la route n'est pas créée.
        items: [
            {
                key: "reste-a-vivre",
                id: "reste-a-vivre",
                icon: {
                    src: piggyBank,
                    alt: "",
                },
                title: "Reste à vivre",
                description: "Calculez votre budget disponible après vos dépenses fixes.",
                badge: {
                    label: "Populaire",
                    variant: "success",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
            {
                key: "objectif-epargne",
                icon: {
                    src: target,
                    alt: "",
                },
                title: "Objectif d'épargne",
                description: "Découvrez combien épargner chaque mois pour atteindre votre objectif.",
                badge: {
                    label: "Épargne",
                    variant: "info",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
            {
                key: "fonds-urgence",
                icon: {
                    src: shield,
                    alt: "",
                },
                title: "Fonds d'urgence",
                description: "Estimez le montant recommandé pour faire face aux imprévus.",
                badge: {
                    label: "Sécurité",
                    variant: "warning",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
            {
                key: "budget-previsionnel",
                icon: {
                    src: calendar,
                    alt: "",
                },
                title: "Budget prévisionnel",
                description: "Préparez et planifiez votre budget du mois à l'avance.",
                badge: {
                    label: "Planification",
                    variant: "teal",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
            {
                key: "budget-logement",
                icon: {
                    src: logement,
                    alt: "",
                },
                title: "Budget logement",
                description: "Vérifiez si vos dépenses logement sont équilibrées.",
                badge: {
                    label: "Logement",
                    variant: "orange",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
            {
                key: "budget-familial",
                id: "budget-familial",
                icon: {
                    src: famille,
                    alt: "",
                },
                title: "Budget familial",
                description: "Analysez et organisez les dépenses du foyer au quotidien.",
                badge: {
                    label: "Famille",
                    variant: "purple",
                },
                btn: {
                    label: "Utiliser le simulateur",
                    variant: "outline",
                    size: "small",
                    disabled: true,
                    disabledReason: "Ce simulateur sera bientôt disponible.",
                },
                variant: "simulator",
            },
        ],
    },

    simulationExample: {
        header: {
            title: "Exemple de simulation",
            titleVariant: "center",

            description: "Voyez à quoi ressemble votre tableau de bord personnalisé.",
            descriptionVariant: "center",

            variant: "center",
        },

        variant: "simulationExample",

        preview: {
            label: "Aperçu de votre simulation",
            period: "Juillet 2026",

            stats: [
                {
                    key: "income",
                    label: "Revenus",
                    value: 2150,
                    color: "green",
                },
                {
                    key: "expenses",
                    label: "Dépenses",
                    value: 1750,
                    color: "red",
                },
                {
                    key: "savings",
                    label: "Épargne",
                    value: 250,
                    color: "blue",
                },
                {
                    key: "remaining",
                    label: "Reste à vivre",
                    value: 150,
                    color: "orange",
                },
            ],

            expensesDistribution: [
                {
                    key: "housing",
                    label: "Logement",
                    percentage: 45,
                    color: "#1565C0",
                },
                {
                    key: "food",
                    label: "Alimentation",
                    percentage: 35,
                    color: "#7B1FA2",
                },
                {
                    key: "transport",
                    label: "Transport",
                    percentage: 20,
                    color: "#00897B",
                },
            ],

            // Le centre de l'anneau affiche le total des dépenses réparties
            distributionTitle: "Dépenses du mois",

            budgetUsage: {
                label: "du budget utilisé",
            },
        },
    },

    benefits: {
        header: {
            title: "Pourquoi utiliser nos simulateurs ?",
            titleVariant: "center",
            variant: "center",
        },

        variant: "benefits",

        items: [
            {
                key: "understand",
                icon: {
                   src: search,
                   className: 'ui-icon--blue'
                },
                title: "Comprendre sa situation",
                description: "Avoir une vision claire de vos revenus, dépenses et épargne.",
                variant: "benefits",
            },
            {
                key: "projects",
                icon: {
                   src: target,
                   className: 'ui-icon--green'
                },
                title: "Préparer ses projets",
                description: "Anticiper vos projets futurs : vacances, achat, formation.",
                variant: "benefits",
            },
            {
                key: "overdraft",
                icon: {
                   src: shield,
                   className: 'ui-icon--orange'
                },
                title: "Éviter les découverts",
                description: "Identifiez les risques budgétaires avant qu'ils n'arrivent.",
                variant: "benefits",
            },
            {
                key: "savings",
                icon: {
                   src: piggyBankViolet,
                   className: 'ui-icon--violet'
                },
                title: "Améliorer son épargne",
                description: "Découvrez combien vous pouvez épargner chaque mois.",
                variant: "benefits",
            },
        ],
    },

    interpretation: {
        header: {
            title: "Comment interpréter les résultats ?",
            titleVariant: "default",

            description: "Nos simulateurs vous aident à mieux planifier, pas à remplacer un expert.",
            descriptionVariant: "default",

            variant: "default",
        },

        variant: "interpretation",

        items: [
            {
                key: "indicative",
                icon: {
                   src: info,
                   className: 'ui-icon--blue'
                },
                title: "Les résultats sont indicatifs",
                description: "Les chiffres sont des estimations basées sur vos données saisies.",
                variant: "interpretation",
            },
            {
                key: "professional",
                icon: {
                   src: alert,
                   className: 'ui-icon--orange'
                },
                title: "Ils ne remplacent pas un conseil professionnel",
                description: "Pour des décisions importantes, consultez un conseiller financier.",
                variant: "interpretation",
            },
            {
                key: "adjust",
                icon: {
                   src: checkCircle,
                   className: 'ui-icon--green'
                },
                title: "Ils permettent de mieux préparer son budget",
                description: "Utilisez ces résultats comme point de départ pour vos décisions.",
                variant: "interpretation",
            },
        ],

        image: {
            src: ToolsInterpretationImg,
            alt: "Illustration d'une personne analysant ses finances",
        },
    },

    callToAction: {
        header: {
            title: "Enregistrez vos simulations",
            titleVariant: "cta",

            description: "Créez gratuitement un compte pour conserver vos résultats et suivre votre évolution.",
            descriptionVariant: "cta",
            
            variant: "center",
        },

        actions: [
            {
                key: "register-btn",
                label: "Créer un compte",
                link: LinksData.register.path,
                variant: "primary-white",
            },
            {
                // Le tableau de bord est privé : on passe par la connexion
                key: "discovery-btn",
                label: "Découvrir le tableau de bord",
                link: LinksData.login.path,
                variant: "outline-white",
            },
        ],

        trustIndicators: [
            {
                label: "Gratuit",
                icon: check,
            },
            {
                label: "Sans engagement",
                icon: check,
            },
            {
                label: "Sans carte bancaire",
                icon: check,
            },
        ],
    },
};

export default ToolsData;
