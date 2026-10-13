import { aidesLocalesIcon, cafIcon, calendarCheck, chartPie, check, cpamIcon, franceTravailIcon, handHeart, HomeCommunity, HomeFinancialAid, HomeHeroImg, mdphIcon, piggyBank, shieldCheck } from "@/assets";
import { BudgetMethodsData, LinksData } from "@/data";

const HomeData = {
    hero: {
        eyebrow: {
            label: "Gratuit & sans engagement",
            variant: "success",
        },

        title: "Reprenez le contrôle de votre budget",

        description:
            "Des outils simples, des conseils pratiques et des informations fiables pour mieux gérer votre argent au quotidien.",

        actions: [
            {
                label: "Commencer gratuitement",
                link: LinksData.register.path,
                variant: "primary",
            },
            {
                label: "Découvrir les aides",
                link: LinksData.helps.path,
                variant: "outline",
            },
        ],

        trustIndicators: [
            {
                label: "100% gratuit",
                icon: check,
            },
            {
                label: "Sans données bancaires",
                icon: check,
            },
            {
                label: "Données sécurisées",
                icon: check,
            },
        ],

        image: {
            src: HomeHeroImg,
            alt: "Des personnes réunies pour échanger sur leur budget",
        },
    },

    features: {
        header: {
            title: "Pourquoi utiliser Budget Manager ?",
            titleVariant: "center",
            description: "Tout ce dont vous avez besoin pour mieux gérer votre argent",
            descriptionVariant: "center",
            variant: "center",
        }, 

        items: [
            {
                key: "1",
                icon: {
                    src: calendarCheck,
                    variant: "blue",
                },
                title: "Suivre ses dépenses",
                description: "Enregistrez vos revenus et dépenses en quelques clics pour savoir où va votre argent.",
                variant: "features",
            },
            {
                key: "2",
                icon: {
                    src: chartPie,
                    variant: "blue",
                },
                title: "Préparer son budget mensuel",
                description: "Planifiez vos dépenses mois par mois grâce à nos outils simples et intuitifs.",
                variant: "features",
            },
            {
                key: "3",
                icon: {
                    src: handHeart,
                    variant: "blue",
                },
                title: "Découvrir les aides disponibles",
                description: "Accédez à la liste complète des aides sociales auxquelles vous pouvez prétendre.",
                variant: "features",
            },
            {
                key: "4",
                icon: {
                    src: piggyBank,
                    variant: "blue",
                },
                title: "Atteindre ses objectifs d'épargne",
                description: "Définissez vos objectifs et suivez votre progression pas à pas.",
                variant: "features",
            },
        ],
    },

    budgetMethods: {
        header: {
            title: "Découvrez les méthodes de gestion budgétaire",
            titleVariant: "center",

            description: "Des approches simples adaptées à toutes les situations",
            descriptionVariant: "center",

            variant: "center",
        },
        
        // Méthodes partagées avec la page Conseils : chaque bouton mène à
        // la présentation de la méthode (/advices#method-...).
        items: BudgetMethodsData.map(({ id, ...method }) => ({
            ...method,
            btn: {
                label: "En savoir plus",
                link: `${LinksData.advices.path}#${id}`,
                variant: "outline",
                size: "small",
            },
        })),
    },

    financialAid: {
        header: {
            title: "Trouvez les aides adaptées à votre situation",
            titleVariant: "default",

            description: "Nous référençons les principales aides sociales françaises pour vous aider à les trouver facilement.",
            descriptionVariant: "default",
            
            variant: "default",
        },

        variant: "financialAid",
        
        image: HomeFinancialAid,

        items: [
            {
                key: 1,
                icon: {
                    src: cafIcon,
                    variant: "blue",
                    className: "icon--financialAid",
                },
                title: "CAF — Allocations Familiales",
                description: "Allocations familiales, APL, RSA et bien d'autres aides.",
                link: {
                    label: "En savoir plus",
                    url: LinksData.helps.path,
                    variant: "default",
                },
                variant: "financialAid",
            },
            {
                key: 2,
                icon: {
                    src: mdphIcon,
                    variant: "blue",
                    className: "icon--financialAid",
                },
                title: "MDPH — Handicap",
                description: "Accompagnement et aides pour les personnes handicapées.",
                link: {
                    label: "En savoir plus",
                    url: LinksData.helps.path,
                    variant: "default",
                },
                variant: "financialAid",
            },
            {
                key: 3,
                icon: {
                    src: cpamIcon,
                    variant: "blue",
                    className: "icon--financialAid",
                },
                title: "CPAM — Assurance Maladie",
                description: "Complémentaire santé solidaire (C2S) et aides à la santé.",
                link: {
                    label: "En savoir plus",
                    url: LinksData.helps.path,
                    variant: "default",
                },
                variant: "financialAid",
            },
            {
                key: 4,
                icon: {
                    src: franceTravailIcon,
                    variant: "blue",
                    className: "icon--financialAid",
                },
                title: "France Travail",
                description: "Allocations chômage, formation et retour à l'emploi.",
                link: {
                    label: "En savoir plus",
                    url: LinksData.helps.path,
                    variant: "default",
                },
                variant: "financialAid",
            },
            {
                key: 5,
                icon: {
                    src: aidesLocalesIcon,
                    variant: "blue",
                    className: "icon--financialAid",
                },
                title: "Aides locales",
                description: "Découvrez les aides de votre commune, département et région.",
                link: {
                    label: "En savoir plus",
                    url: LinksData.helps.path,
                    variant: "default",
                },
                variant: "financialAid",
            },
        ],
    },

    community: {
        header: {
            title: "Vous n'êtes pas seul",
            titleVariant: "community",

            description: "Échangez des conseils, partagez vos expériences et entraidez-vous au sein de notre communauté bienveillante. Nous croyons que la solidarité est la clé d'une meilleure inclusion financière pour tous.",
            descriptionVariant: "community",
            
            variant: "community",
        },

        stats: [
            {
                key: "members",
                value: "12 000+",
                label: "membres",
            },
            {
                key: "tips",
                value: "5 000+",
                label: "conseils partagés",
            },
            {
                key: "satisfaction",
                value: "98%",
                label: "satisfaits",
            },
        ],

        statsNote: "Chiffres fictifs, présentés à titre de démonstration.",

        actions: [
            {
                key: "forum",
                label: "Accéder au forum",
                link: LinksData.community.path,
                variant: "secondary",
            },
        ],

        image: HomeCommunity,
    },

    callToAction: {
        header: {
            title: "Commencez dès aujourd'hui",
            titleVariant: "cta-boxed",

            description: "Créez gratuitement votre espace personnel et construisez un budget adapté à vos besoins. Aucune carte bancaire requise.",
            descriptionVariant: "cta-boxed",

            variant: "center",
        },

        actions: [
            {
                key: "register",
                label: "Créer un compte",
                link: LinksData.register.path,
                variant: "primary",
            },
            {
                key: "discover",
                label: "Découvrir la plateforme",
                link: LinksData.tools.path,
                variant: "outline",
            },
        ],

        trustIndicators: [
            {
                label: "Gratuit",
                icon: shieldCheck,
            },
            {
                label: "Sans publicité",
                icon: shieldCheck,
            },
            {
                label: "Données protégées",
                icon: shieldCheck,
            },
        ],
    },
};

export default HomeData;