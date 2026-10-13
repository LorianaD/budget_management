
import {
    AdviceHeroImg,
    AdviceQuicklyImg,
    AdviceStartStepImg,
    check,
    smartphone,
    calculator,
    scale,
    targetOrange,
    calendarPurple,
    logement,
    alimentation,
    transport,
    etudes,
    famille,
    epargne,
    etudiant,
    parentIsole,
    retraite,
    salarie,
    rechercheEmploi,
    handicap,
} from "@/assets";
import { BudgetMethodsData, LinksData } from "@/data";

// Les pages de détail (articles, thèmes, profils, simulateurs) n'existent pas
// encore : leurs liens sont affichés mais désactivés.
const UPCOMING = "contenu bientôt disponible";

const disabledLink = (label) => ({ label, disabled: true, disabledReason: UPCOMING });

const AdvicesData = {
    hero: {
        eyebrow: {
            label: "Conseils & Guides",
            variant: "info",
        },

        title: "Conseils budgétaires pour mieux gérer votre argent",

        description:
            "Des guides simples, pratiques et accessibles pour vous aider à améliorer votre budget au quotidien.",

        search: {
            label: "Rechercher un conseil",
            placeholder: "Rechercher un conseil... réduire mes dépenses",
            buttonLabel: "Rechercher",
            // La recherche n'est pas encore branchée : elle mène aux thèmes.
            targetId: "themes",
        },

        actions: [
            {
                key: "discovery",
                label: "Découvrir les conseils",
                link: "#themes",
                variant: "primary",
            },
            {
                key: "register",
                label: "Créer un compte",
                link: LinksData.register.path,
                variant: "outline",
            },
        ],

        // Engagements vérifiables plutôt que des statistiques d'audience fictives
        trustIndicators: [
            {
                label: "Accès libre et gratuit",
                icon: check,
            },
            {
                label: "Sans inscription",
                icon: check,
            },
            {
                label: "Conseils indépendants",
                icon: check,
            },
        ],

        image: {
            src: AdviceHeroImg,
            alt: "Illustration de personnes échangeant autour de la gestion de leur budget",
        },
    },

    themes: {
        id: "themes",

        header: {
            title: "Explorez les thèmes",
            titleVariant: "center",

            description:
                "Choisissez le domaine qui correspond à vos besoins.",

            descriptionVariant: "center",
            variant: "center",
        },

        variant: "themes",
        columns: 3,

        items: [
            {
                key: "housing",
                icon: { src: logement, alt: "" },
                title: "Logement",
                description:
                    "Conseils pour réduire les charges et mieux gérer son logement.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
            {
                key: "food",
                icon: { src: alimentation, alt: "" },
                title: "Alimentation",
                description:
                    "Faire ses courses sans dépasser son budget.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
            {
                key: "transport",
                icon: { src: transport, alt: "" },
                title: "Transport",
                description:
                    "Réduire les frais de déplacement.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
            {
                key: "studies",
                icon: { src: etudes, alt: "" },
                title: "Études",
                description:
                    "Gérer un budget étudiant.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
            {
                key: "family",
                icon: { src: famille, alt: "" },
                title: "Famille",
                description:
                    "Organiser le budget du foyer.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
            {
                key: "savings",
                icon: { src: epargne, alt: "" },
                title: "Épargne",
                description:
                    "Commencer à économiser progressivement.",
                link: disabledLink("Voir les conseils"),
                variant: "theme",
            },
        ],
    },

    popularGuides: {
        id: "guides",

        header: {
            title: "Guides les plus consultés",
            titleVariant: "default",

            description:
                "Des ressources pratiques pour vous accompagner.",

            descriptionVariant: "default",
            variant: "default",
        },

        background: "muted",
        variant: "guides",
        columns: 3,

        items: [
            {
                key: "monthly-budget",
                tone: "blue",
                category: "Budget",
                title: "Comment préparer son budget mensuel ?",
                duration: "5 min",
                link: disabledLink("Lire l'article"),
            },
            {
                key: "reduce-food-expenses",
                tone: "green",
                category: "Économies",
                title: "10 astuces pour réduire ses dépenses alimentaires",
                duration: "7 min",
                link: disabledLink("Lire l'article"),
            },
            {
                key: "emergency-savings",
                tone: "yellow",
                category: "Épargne",
                title: "Comment constituer une épargne de sécurité ?",
                duration: "6 min",
                link: disabledLink("Lire l'article"),
            },
            {
                key: "income-drop",
                tone: "orange",
                category: "Crise",
                title: "Faire face à une baisse de revenus",
                duration: "8 min",
                link: disabledLink("Lire l'article"),
            },
            {
                // Cet article renvoie à la présentation de la méthode, plus bas
                key: "method-50-30-20",
                tone: "purple",
                category: "Méthode",
                title: "Comprendre la méthode 50/30/20",
                duration: "4 min",
                link: {
                    label: "Lire l'article",
                    url: "#method-50-30-20",
                },
            },
            {
                key: "avoid-overdraft",
                tone: "teal",
                category: "Gestion",
                title: "Comment éviter les découverts bancaires ?",
                duration: "5 min",
                link: disabledLink("Lire l'article"),
            },
        ],
    },

    situations: {
        header: {
            title: "Votre situation",
            titleVariant: "center",

            description:
                "Des conseils personnalisés selon votre profil.",

            descriptionVariant: "center",
            variant: "center",
        },

        variant: "situations",
        columns: 3,

        items: [
            {
                key: "student",
                icon: { src: etudiant, alt: "" },
                title: "Étudiant",
                description:
                    "Conseils adaptés aux étudiants pour gérer un petit budget.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
            {
                key: "single-parent",
                icon: { src: parentIsole, alt: "" },
                title: "Parent isolé",
                description:
                    "Conseils pour gérer un budget familial en solo.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
            {
                key: "retired",
                icon: { src: retraite, alt: "" },
                title: "Retraité",
                description:
                    "Optimiser ses revenus et ses dépenses à la retraite.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
            {
                key: "employee",
                icon: { src: salarie, alt: "" },
                title: "Salarié",
                description:
                    "Mieux organiser son budget mensuel et épargner.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
            {
                key: "job-seeker",
                icon: { src: rechercheEmploi, alt: "" },
                title: "Recherche d'emploi",
                description:
                    "Gérer une période de transition financièrement.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
            {
                key: "disability",
                icon: { src: handicap, alt: "" },
                title: "Situation de handicap",
                description:
                    "Informations utiles et aides disponibles spécifiques.",
                btn: {
                    label: "Voir les recommandations",
                    variant: "outline",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "situation",
            },
        ],
    },

    quickTips: {
        header: {
            title: "Conseils rapides",
            titleVariant: "default",

            description:
                "De petites habitudes qui font une grande différence.",

            descriptionVariant: "default",
            variant: "default",
        },

        background: "muted",

        items: [
            { key: "shopping-list", icon: check, tone: "green", title: "Préparer une liste avant les courses" },
            { key: "compare-subscriptions", icon: check, tone: "green", title: "Comparer les abonnements chaque année" },
            { key: "emergency-fund", icon: check, tone: "green", title: "Prévoir un fonds imprévus" },
            { key: "automatic-saving", icon: check, tone: "green", title: "Automatiser son épargne" },
            { key: "review-aids", icon: check, tone: "green", title: "Vérifier ses droits aux aides" },
            { key: "weekly-tracking", icon: check, tone: "green", title: "Suivre ses dépenses chaque semaine" },
        ],

        image: {
            src: AdviceQuicklyImg,
            alt: "",
        },
    },

    gettingStarted: {
        header: {
            title: "Par où commencer ?",
            titleVariant: "default",

            description:
                "Suivez ces étapes pour prendre le contrôle de votre budget.",

            descriptionVariant: "default",
            variant: "default",
        },

        steps: [
            {
                key: "income",
                number: 1,
                title: "Comprendre ses revenus",
                description: "Identifiez toutes vos sources de revenus mensuels.",
            },
            {
                key: "expenses",
                number: 2,
                title: "Lister ses dépenses",
                description: "Classez vos dépenses par catégories.",
            },
            {
                key: "budget",
                number: 3,
                title: "Créer son budget",
                description: "Établissez un plan de répartition de vos revenus.",
            },
            {
                key: "reduce",
                number: 4,
                title: "Réduire les dépenses inutiles",
                description: "Identifiez et éliminez les dépenses superflues.",
            },
            {
                key: "save",
                number: 5,
                title: "Commencer à épargner",
                description: "Mettez de côté une partie de vos revenus chaque mois.",
                variant: "success",
            },
        ],

        image: {
            src: AdviceStartStepImg,
            alt: "",
        },
    },

    testimonials: {
        header: {
            title: "Ils ont amélioré leur budget",
            titleVariant: "center",
            note: "Témoignages fictifs, présentés à titre d'illustration.",
            variant: "center",
        },

        background: "muted",
        variant: "testimonials",
        columns: 3,

        items: [
            {
                key: "marie",
                rating: 5,
                quote:
                    "Grâce aux conseils Budget Manager, notre famille a économisé 200 euros par mois en réorganisant nos dépenses. Les guides sont clairs et faciles à appliquer.",
                author: {
                    initials: "MF",
                    name: "Marie F.",
                    profile: "Paris — Famille de 3 enfants",
                },
            },
            {
                key: "laura",
                rating: 5,
                quote:
                    "En tant qu'étudiante, je ne savais pas comment gérer mon budget. Les conseils m'ont permis de finir le mois sans stress.",
                author: {
                    initials: "LC",
                    name: "Laura C.",
                    profile: "Lyon — Étudiante",
                },
            },
            {
                key: "gerard",
                rating: 5,
                quote:
                    "À la retraite, optimiser mes dépenses est devenu essentiel. Budget Manager m'a aidé à trouver des aides que je ne connaissais pas.",
                author: {
                    initials: "GP",
                    name: "Gérard P.",
                    profile: "Bordeaux — Retraité",
                },
            },
        ],
    },

    tools: {
        header: {
            title: "Passez à l'action",
            titleVariant: "center",

            description:
                "Utilisez nos outils gratuits pour mettre en pratique vos conseils.",

            descriptionVariant: "center",
            variant: "center",
        },

        variant: "tools",
        columns: 4,

        items: [
            {
                key: "calculator-50-30-20",
                icon: { src: calculator, className: "ui-icon--blue" },
                title: "Calculateur 50/30/20",
                description: "Répartissez vos revenus selon la méthode populaire.",
                btn: {
                    label: "Utiliser l'outil",
                    link: `${LinksData.tools.path}#calculator`,
                    variant: "primary",
                },
                variant: "tool",
            },
            {
                key: "remaining-budget",
                icon: { src: scale, className: "ui-icon--green" },
                title: "Calculateur reste à vivre",
                description: "Calculez ce qu'il vous reste après vos charges fixes.",
                btn: {
                    label: "Utiliser l'outil",
                    variant: "primary",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "tool",
            },
            {
                key: "savings-goal",
                icon: { src: targetOrange, className: "ui-icon--orange" },
                title: "Objectif d'épargne",
                description: "Définissez et suivez vos objectifs d'épargne.",
                btn: {
                    label: "Utiliser l'outil",
                    variant: "primary",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "tool",
            },
            {
                key: "forecast-budget",
                icon: { src: calendarPurple, className: "ui-icon--violet" },
                title: "Budget prévisionnel",
                description: "Planifiez votre budget mois par mois.",
                btn: {
                    label: "Utiliser l'outil",
                    variant: "primary",
                    disabled: true,
                    disabledReason: UPCOMING,
                },
                variant: "tool",
            },
        ],
    },

    // Section ajoutée (absente de la maquette 44:148) : présentation publique
    // des méthodes, cible des liens « En savoir plus » de l'accueil.
    budgetMethods: {
        id: "budget-methods",

        header: {
            title: "Les méthodes budgétaires",
            titleVariant: "center",

            description:
                "Quatre approches simples pour organiser votre argent, à découvrir librement.",

            descriptionVariant: "center",
            variant: "center",
        },

        background: "muted",
        variant: "methods",
        columns: 4,
        items: BudgetMethodsData,
    },

    callToAction: {
        header: {
            title: "Prêt à reprendre le contrôle de votre budget ?",
            titleVariant: "cta",

            description:
                "Créez gratuitement votre espace personnel et profitez d'outils adaptés à votre situation.",

            descriptionVariant: "cta",
            variant: "center",
        },

        actions: [
            {
                key: "register",
                label: "Créer un compte",
                link: LinksData.register.path,
                variant: "primary-white",
            },
            {
                key: "tools",
                label: "Découvrir les outils",
                link: LinksData.tools.path,
                variant: "outline-white",
            },
        ],

        trustIndicators: [
            {
                label: "Disponible sur mobile",
                icon: smartphone,
            },
        ],
    },
};

export default AdvicesData;
