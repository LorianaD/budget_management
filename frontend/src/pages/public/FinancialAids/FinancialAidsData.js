
import {
    FinancialAidsHeroImg,
    FinancialAidsStepsImg,
    FinancialAidsRecommendationImg,

    check,
    shieldCheck,

    logement,
    famille,
    handicap,
    retraite,
    salarie,

    userIcon,
    homeIcon,
    fileText,
    briefcase,
    creditCard,
    hash,
} from "@/assets";
import { LinksData } from "@/data";

// Les fiches détaillées des aides et des guides n'existent pas encore :
// leurs liens sont affichés mais désactivés.
const UPCOMING = "contenu bientôt disponible";

const disabledLink = (label) => ({ label, disabled: true, disabledReason: UPCOMING });

const disabledButton = (label) => ({
    label,
    variant: "outline",
    size: "small",
    disabled: true,
    disabledReason: UPCOMING,
});

const FinancialAidsData = {
    hero: {
        eyebrow: {
            label: "Aides financières en France",
            variant: "success",
        },

        title: "Découvrez les aides financières disponibles",

        description:
            "Retrouvez les principales aides sociales françaises et comprenez comment y accéder.",

        search: {
            label: "Rechercher une aide",
            placeholder: "Rechercher une aide... APL",
            buttonLabel: "Rechercher",
            buttonVariant: "success",
            // La recherche n'est pas encore branchée : elle mène aux aides.
            targetId: "popular-aids",
        },

        actions: [
            {
                key: "discovery",
                label: "Découvrir les aides",
                link: "#popular-aids",
                variant: "primary",
            },
        ],

        trustIndicators: [
            {
                label: "Gratuit",
                icon: check,
            },
            {
                label: "Aides nationales",
                icon: check,
            },
            {
                label: "Informations pratiques",
                icon: shieldCheck,
            },
        ],

        image: {
            src: FinancialAidsHeroImg,
            alt: "Illustration de plusieurs personnes échangeant autour des aides financières",
        },
    },

    popularAids: {
        id: "popular-aids",

        header: {
            title: "Aides les plus consultées",
            titleVariant: "center",

            description:
                "Découvrez les principales aides auxquelles vous pourriez avoir droit.",

            descriptionVariant: "center",
            variant: "center",
        },

        variant: "aids",
        columns: 3,

        items: [
            {
                key: "activity-bonus",
                badge: { label: "CAF", variant: "solid-green" },
                title: "Prime d'activité",
                description: "Complément de revenu pour les travailleurs aux revenus modestes.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
            {
                key: "apl",
                badge: { label: "CAF", variant: "solid-green" },
                title: "APL",
                description: "Aide personnalisée au logement pour les locataires.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
            {
                key: "rsa",
                badge: { label: "CAF", variant: "solid-green" },
                title: "RSA",
                description: "Revenu minimum pour les personnes sans ou avec faibles ressources.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
            {
                key: "css",
                badge: { label: "CPAM", variant: "solid-teal" },
                title: "Complémentaire Santé Solidaire",
                description: "Mutuelle gratuite ou à faible coût pour les revenus modestes.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
            {
                key: "aah",
                badge: { label: "MDPH", variant: "solid-purple" },
                title: "AAH",
                description: "Allocation adulte handicapé pour les personnes en situation de handicap.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
            {
                key: "aspa",
                badge: { label: "Retraite", variant: "solid-orange" },
                title: "ASPA",
                description: "Allocation de solidarité aux personnes âgées aux faibles ressources.",
                link: disabledLink("En savoir plus"),
                variant: "aid",
            },
        ],
    },

    categories: {
        id: "categories",

        header: {
            title: "Parcourir par catégorie",
            titleVariant: "center",

            description:
                "Trouvez les aides adaptées à votre situation.",

            descriptionVariant: "center",
            variant: "center",
        },

        background: "muted",
        variant: "aid-categories",
        columns: 3,

        items: [
            {
                key: "housing",
                icon: { src: logement, alt: "" },
                title: "Logement",
                list: [
                    "APL — Aide personnalisée au logement",
                    "FSL — Fonds de solidarité logement",
                    "Aides locales",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
            {
                key: "family",
                icon: { src: famille, alt: "" },
                title: "Famille",
                list: [
                    "Allocations familiales",
                    "Prime de naissance",
                    "Complément familial",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
            {
                key: "health",
                icon: { src: shieldCheck, alt: "" },
                title: "Santé",
                list: [
                    "Complémentaire Santé Solidaire",
                    "Aides CPAM",
                    "Soins dentaires",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
            {
                key: "disability",
                icon: { src: handicap, alt: "" },
                title: "Handicap",
                list: [
                    "AAH — Allocation adulte handicapé",
                    "PCH — Prestation de compensation",
                    "Cartes mobilité inclusion",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
            {
                key: "employment",
                icon: { src: salarie, alt: "" },
                title: "Emploi",
                list: [
                    "Allocation chômage — France Travail",
                    "Formation professionnelle",
                    "Aides à la mobilité",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
            {
                key: "retirement",
                icon: { src: retraite, alt: "" },
                title: "Retraite",
                list: [
                    "ASPA — Minimum vieillesse",
                    "Aides aux retraités modestes",
                    "Aide à domicile",
                ],
                btn: disabledButton("Voir les aides"),
                variant: "aidCategory",
            },
        ],
    },

    organizations: {
        id: "organizations",

        header: {
            title: "Les principaux organismes",
            titleVariant: "center",

            description:
                "Chaque organisme gère un ensemble spécifique d'aides.",

            descriptionVariant: "center",
            variant: "center",
        },

        variant: "organizations",
        columns: 5,

        items: [
            {
                key: "caf",
                initials: "C",
                color: "blue",
                title: "CAF",
                tags: ["Logement", "Famille", "Prime d'activité"],
                link: { label: "Visiter le site officiel", url: LinksData.caf.href, variant: "external" },
                variant: "organization",
            },
            {
                key: "cpam",
                initials: "C",
                color: "green",
                title: "CPAM",
                tags: ["Santé", "Indemnités", "CSS"],
                link: { label: "Visiter le site officiel", url: "https://www.ameli.fr", variant: "external" },
                variant: "organization",
            },
            {
                key: "mdph",
                initials: "M",
                color: "purple",
                title: "MDPH",
                tags: ["Handicap", "Autonomie"],
                link: { label: "Visiter le site officiel", url: LinksData.mdph.href, variant: "external" },
                variant: "organization",
            },
            {
                key: "france-travail",
                initials: "F",
                color: "orange",
                title: "France Travail",
                tags: ["Emploi", "Formation"],
                link: { label: "Visiter le site officiel", url: LinksData.franceTravail.href, variant: "external" },
                variant: "organization",
            },
            {
                key: "service-public",
                initials: "S",
                color: "slate",
                title: "Service Public",
                tags: ["Démarches", "Informations"],
                link: { label: "Visiter le site officiel", url: LinksData.servicePublic.href, variant: "external" },
                variant: "organization",
            },
        ],
    },

    applicationSteps: {
        header: {
            title: "Comment faire une demande ?",
            titleVariant: "default",

            description:
                "Suivez ces étapes pour démarrer vos démarches.",

            descriptionVariant: "default",
            variant: "default",
        },

        background: "muted",

        steps: [
            {
                key: "identify",
                number: 1,
                title: "Identifier les aides possibles",
                description: "Utilisez notre guide ou le moteur de recherche.",
            },
            {
                key: "eligibility",
                number: 2,
                title: "Vérifier son éligibilité",
                description: "Consultez les conditions sur le site de l'organisme.",
            },
            {
                key: "documents",
                number: 3,
                title: "Préparer les justificatifs",
                description: "Rassemblez les documents nécessaires.",
            },
            {
                key: "application",
                number: 4,
                title: "Faire la demande auprès de l'organisme",
                description: "Déposez votre dossier directement sur le site officiel.",
            },
            {
                key: "follow-up",
                number: 5,
                title: "Suivre son dossier",
                description: "L'organisme vous informera de l'avancement.",
                variant: "success",
            },
        ],

        image: {
            src: FinancialAidsStepsImg,
            alt: "",
        },
    },

    requiredDocuments: {
        header: {
            title: "Documents fréquemment demandés",
            titleVariant: "center",

            description:
                "Préparez ces documents pour faciliter vos démarches.",

            descriptionVariant: "center",
            variant: "center",
        },

        items: [
            { key: "identity", icon: userIcon, title: "Pièce d'identité" },
            { key: "address", icon: homeIcon, title: "Justificatif de domicile" },
            { key: "tax", icon: fileText, title: "Avis d'imposition" },
            { key: "payslips", icon: briefcase, title: "Bulletins de salaire" },
            { key: "bank", icon: creditCard, title: "RIB bancaire" },
            { key: "caf", icon: hash, title: "Attestation CAF" },
        ],
    },

    guides: {
        header: {
            title: "Guides pour vos démarches",
            titleVariant: "center",

            description:
                "5 guides pratiques pour vous accompagner étape par étape.",

            descriptionVariant: "center",
            variant: "center",
        },

        background: "muted",
        variant: "guides",
        columns: 5,

        items: [
            {
                key: "apl",
                tone: "blue",
                category: "Logement",
                title: "Comment demander l'APL ?",
                link: disabledLink("Lire le guide"),
            },
            {
                key: "activity-bonus",
                tone: "green",
                category: "Emploi",
                title: "Comprendre la Prime d'activité",
                link: disabledLink("Lire le guide"),
            },
            {
                key: "mdph",
                tone: "purple",
                category: "Handicap",
                title: "Préparer un dossier MDPH",
                link: disabledLink("Lire le guide"),
            },
            {
                key: "students",
                tone: "yellow",
                category: "Études",
                title: "Les aides pour les étudiants",
                link: disabledLink("Lire le guide"),
            },
            {
                key: "retirement",
                tone: "teal",
                category: "Retraite",
                title: "Les aides pour les retraités",
                link: disabledLink("Lire le guide"),
            },
        ],
    },

    recommendations: {
        header: {
            eyebrow: {
                label: "Recommandations personnalisées",
                variant: "warning",
            },

            title: "Obtenez des recommandations adaptées à votre situation",
            titleVariant: "default",

            description:
                "Créez gratuitement un compte Budget Manager pour découvrir les aides qui pourraient vous concerner.",

            descriptionVariant: "default",
            variant: "default",
        },

        actions: [
            {
                key: "register",
                label: "Créer un compte",
                link: LinksData.register.path,
                variant: "primary",
            },
            {
                // Le tableau de bord est privé : on passe par la connexion
                key: "dashboard",
                label: "Découvrir le tableau de bord",
                link: LinksData.login.path,
                variant: "outline",
            },
        ],

        image: {
            src: FinancialAidsRecommendationImg,
            alt: "",
        },
    },

    importantInformation: {
        header: {
            title: "Information importante",
            titleVariant: "notice",

            description:
                "Budget Manager n'est pas un organisme public.",

            descriptionVariant: "notice",
            variant: "center",
        },

        paragraphs: [
            "Les informations présentées sur cette page sont fournies à titre indicatif et éducatif uniquement.",
            "Les demandes d'aides doivent être effectuées directement auprès des organismes officiels concernés : CAF, CPAM, MDPH, France Travail ou Service-Public.fr",
        ],

        linksLabel: "Sites officiels",

        links: [
            { key: "caf", label: "caf.fr", link: LinksData.caf.href },
            { key: "ameli", label: "ameli.fr", link: "https://www.ameli.fr" },
            { key: "mdph", label: "mdphenligne.cnsa.fr", link: LinksData.mdph.href },
            { key: "france-travail", label: "francetravail.fr", link: LinksData.franceTravail.href },
            { key: "service-public", label: "service-public.gouv.fr", link: LinksData.servicePublic.href },
        ],
    },
};

export default FinancialAidsData;
