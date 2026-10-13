
import {
    CommunityHeroImg,
    CommunityFeaturesImg,

    check,
    checkCircle,
    shield,
    flag,
    piggyBank,
    target,
    logement,
    famille,
    etudiant,
    handHeart,

    heart,
    handshake,
    gift,
    users,
    accessibility,
    handHelping,

    helpCircle,
    lightbulb,
    messageSquare,
    bookmark,
    compass,
} from "@/assets";
import { LinksData } from "@/data";

// Le forum n'existe pas encore : les liens vers les discussions et les thèmes
// sont affichés mais désactivés, et les contenus d'exemple sont signalés comme fictifs.
const UPCOMING = "contenu bientôt disponible";
const FICTIONAL_DISCUSSIONS = "Exemples fictifs, présentés à titre d'illustration.";

const disabledLink = (label) => ({ label, disabled: true, disabledReason: UPCOMING });

const CommunityData = {
    hero: {
        eyebrow: {
            label: "Communauté",
            variant: "light",
        },

        title: "Vous n'êtes pas seul",

        description:
            "Des milliers de personnes partagent leurs expériences et s'entraident pour mieux gérer leur budget.",

        stats: [
            { key: "members", value: "12 000+", label: "membres" },
            { key: "tips", value: "5 000+", label: "conseils partagés" },
            { key: "satisfaction", value: "98%", label: "de satisfaction" },
        ],

        statsNote: "Chiffres fictifs, présentés à titre de démonstration.",

        actions: [
            {
                key: "join",
                label: "Rejoindre la communauté",
                link: LinksData.register.path,
                variant: "primary-white",
            },
            {
                key: "discover",
                label: "Découvrir les discussions",
                link: "#popular-discussions",
                variant: "outline-white",
            },
        ],

        image: {
            src: CommunityHeroImg,
            alt: "Illustration d'un groupe de personnes réunies pour échanger et s'entraider",
        },
    },

    popularDiscussions: {
        id: "popular-discussions",

        header: {
            title: "Discussions populaires",
            titleVariant: "default",

            description:
                "Les échanges les plus actifs du moment.",

            descriptionVariant: "default",
            note: FICTIONAL_DISCUSSIONS,
            variant: "default",
        },

        variant: "discussions",
        columns: 2,

        items: [
            {
                key: "save-shopping",
                category: { label: "Budget quotidien", variant: "info" },
                aside: "Populaire",
                title: "Comment économiser sur les courses ?",
                description:
                    "Partage d'astuces sur les marques distributeurs, les promotions et la planification des repas.",
                meta: "42 participants • 18 réponses",
                link: disabledLink("Voir"),
                variant: "popular",
            },
            {
                key: "student-budget",
                category: { label: "Étudiants", variant: "success" },
                aside: "Tendance",
                title: "Réussir son budget étudiant",
                description:
                    "Témoignages et conseils pratiques pour vivre avec un petit budget.",
                meta: "31 participants • 24 réponses",
                link: disabledLink("Voir"),
                variant: "popular",
            },
            {
                key: "emergency-savings",
                category: { label: "Épargne", variant: "orange" },
                aside: "Populaire",
                title: "Créer un fonds d'urgence",
                description:
                    "Comment mettre de côté même avec peu de revenus ? Méthodes et motivations.",
                meta: "27 participants • 15 réponses",
                link: disabledLink("Voir"),
                variant: "popular",
            },
            {
                key: "subscriptions",
                category: { label: "Abonnements", variant: "purple" },
                aside: "Nouveau",
                title: "Réduire ses abonnements inutiles",
                description:
                    "Tour d'horizon des abonnements à auditer et des alternatives gratuites.",
                meta: "19 participants • 11 réponses",
                link: disabledLink("Voir"),
                variant: "popular",
            },
        ],
    },

    themes: {
        id: "themes",

        header: {
            title: "Explorer par thème",
            titleVariant: "center",

            description:
                "Trouvez les discussions qui vous correspondent.",

            descriptionVariant: "center",
            note: FICTIONAL_DISCUSSIONS,
            variant: "center",
        },

        background: "muted",
        variant: "community-themes",
        columns: 3,

        items: [
            {
                key: "daily-budget",
                icon: { src: piggyBank, alt: "" },
                title: "Budget quotidien",
                description: "Astuces et conseils pour le budget de tous les jours.",
                tags: ["1 240 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
            {
                key: "savings",
                icon: { src: target, alt: "" },
                title: "Épargne et projets",
                description: "Objectifs financiers, motivations et stratégies.",
                tags: ["890 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
            {
                key: "housing",
                icon: { src: logement, alt: "" },
                title: "Logement",
                description: "Loyer, charges, déménagement et négociation.",
                tags: ["654 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
            {
                key: "family",
                icon: { src: famille, alt: "" },
                title: "Famille",
                description: "Gérer le budget familial au quotidien.",
                tags: ["723 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
            {
                key: "students",
                icon: { src: etudiant, alt: "" },
                title: "Étudiants",
                description: "Budget étudiant, bourses et vie quotidienne.",
                tags: ["512 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
            {
                key: "financial-aids",
                icon: { src: handHeart, alt: "" },
                title: "Aides financières",
                description: "Droits sociaux, démarches et conseils pratiques.",
                tags: ["431 membres"],
                btn: { label: "Explorer", variant: "outline", size: "small", disabled: true, disabledReason: UPCOMING },
                variant: "communityTheme",
            },
        ],
    },

    testimonials: {
        header: {
            title: "Ils partagent leur expérience",
            titleVariant: "center",

            description:
                "3 témoignages de membres de la communauté.",

            descriptionVariant: "center",
            note: "Témoignages fictifs, présentés à titre d'illustration.",
            variant: "center",
        },

        variant: "testimonials",
        columns: 3,

        items: [
            {
                key: "sophie",
                rating: 5,
                quote:
                    "Grâce aux conseils de la communauté, j'ai réussi à économiser 100 euros par mois. Je ne pensais pas que c'était possible avec mon salaire.",
                author: { initials: "SF", name: "Sophie F.", profile: "Salariée, Lyon" },
                tone: "blue",
                variant: "community",
            },
            {
                key: "thomas",
                rating: 5,
                quote:
                    "J'ai découvert des aides auxquelles je n'avais jamais pensé. La communauté m'a aidé à trouver l'APL et la Prime d'activité.",
                author: { initials: "TM", name: "Thomas M.", profile: "Étudiant, Paris" },
                tone: "green",
                variant: "community",
            },
            {
                key: "marie",
                rating: 5,
                quote:
                    "Les échanges sont bienveillants et très utiles. On se sent vraiment soutenu sans jugement.",
                author: { initials: "MR", name: "Marie R.", profile: "Retraitée, Bordeaux" },
                tone: "yellow",
                variant: "community",
            },
        ],
    },

    values: {
        header: {
            title: "Nos valeurs",
            titleVariant: "center",

            description:
                "Ce qui rend notre communauté unique.",

            descriptionVariant: "center",
            variant: "center",
        },

        background: "muted",
        variant: "values",
        columns: 3,

        items: [
            {
                key: "kindness",
                icon: { src: heart, className: "ui-icon--pink" },
                title: "Bienveillance",
                description: "Chaque message est traité avec respect et empathie.",
                variant: "value",
            },
            {
                key: "respect",
                icon: { src: handshake, className: "ui-icon--blue" },
                title: "Respect",
                description: "Toutes les situations sont accueillies sans jugement.",
                variant: "value",
            },
            {
                key: "sharing",
                icon: { src: gift, className: "ui-icon--green" },
                title: "Partage",
                description: "Les conseils de chacun enrichissent le groupe.",
                variant: "value",
            },
            {
                key: "mutual-help",
                icon: { src: users, className: "ui-icon--orange" },
                title: "Entraide",
                description: "Nous progressons ensemble, pas seuls.",
                variant: "value",
            },
            {
                key: "accessibility",
                icon: { src: accessibility, className: "ui-icon--violet" },
                title: "Accessibilité",
                description: "Contenu clair et accessible à tous les niveaux.",
                variant: "value",
            },
            {
                key: "solidarity",
                icon: { src: handHelping, className: "ui-icon--teal" },
                title: "Solidarité",
                description: "La force du nombre pour relever les défis.",
                variant: "value",
            },
        ],
    },

    features: {
        header: {
            title: "Ce que vous pouvez faire",
            titleVariant: "default",

            description:
                "Participez à votre rythme, sans pression.",

            descriptionVariant: "default",
            variant: "default",
        },

        items: [
            { key: "ask", icon: helpCircle, title: "Poser une question", description: "Obtenez des réponses bienveillantes de la communauté." },
            { key: "share", icon: lightbulb, title: "Partager une astuce", description: "Votre expérience peut aider des centaines de personnes." },
            { key: "react", icon: messageSquare, title: "Réagir à une discussion", description: "Encouragez et complétez les échanges existants." },
            { key: "save", icon: bookmark, title: "Sauvegarder des conseils", description: "Retrouvez facilement vos favoris dans votre espace." },
            { key: "discover", icon: compass, title: "Découvrir des ressources", description: "Articles, guides et outils partagés par la communauté." },
        ],

        image: {
            src: CommunityFeaturesImg,
            alt: "",
        },
    },

    moderation: {
        header: {
            title: "Une communauté respectueuse",
            titleVariant: "center",

            description:
                "Nous veillons à maintenir un espace sûr et constructif.",

            descriptionVariant: "center",
            variant: "center",
        },

        background: "muted",

        items: [
            {
                key: "active-moderation",
                icon: shield,
                tone: "blue",
                title: "Modération active",
                description: "Toutes les discussions sont relues et modérées par notre équipe.",
            },
            {
                key: "charter",
                icon: checkCircle,
                tone: "green",
                title: "Charte communautaire",
                description: "Des règles claires pour garantir des échanges sains et respectueux.",
            },
            {
                key: "reporting",
                icon: flag,
                tone: "orange",
                title: "Signalement facile",
                description: "Tout contenu inapproprié peut être signalé en un clic.",
            },
        ],

        link: {
            ...disabledLink("Découvrir la charte"),
            variant: "underline",
        },
    },

    recentDiscussions: {
        header: {
            title: "Derniers échanges",
            titleVariant: "default",

            description:
                "Les discussions récentes de la communauté.",

            descriptionVariant: "default",
            note: FICTIONAL_DISCUSSIONS,
            variant: "default",
        },

        variant: "discussions",
        columns: 3,

        items: [
            {
                key: "food-budget",
                category: { label: "Question", variant: "info" },
                aside: "Il y a 2 h",
                title: "Comment réduire son budget alimentation ?",
                author: { initials: "MT", name: "Marie T." },
                meta: "15 réponses",
                link: disabledLink("Voir"),
            },
            {
                key: "tracking-apps",
                category: { label: "Astuce", variant: "success" },
                aside: "Il y a 5 h",
                title: "Applications gratuites pour suivre ses dépenses",
                author: { initials: "KL", name: "Kevin L." },
                meta: "23 réactions",
                link: disabledLink("Voir"),
            },
            {
                key: "moving",
                category: { label: "Discussion", variant: "orange" },
                aside: "Il y a 1 j",
                title: "Comment préparer un déménagement ?",
                author: { initials: "LM", name: "Lucie M." },
                meta: "12 réponses",
                link: disabledLink("Voir"),
            },
        ],
    },

    callToAction: {
        header: {
            title: "Rejoignez une communauté qui avance ensemble",
            titleVariant: "cta",

            description:
                "Créez gratuitement votre compte et participez aux échanges. Sans jugement, à votre rythme.",

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
                key: "about",
                label: "Découvrir Budget Manager",
                link: LinksData.about.path,
                variant: "outline-white",
            },
        ],

        trustIndicators: [
            { label: "Gratuit", icon: check },
            { label: "Bienveillant", icon: check },
            { label: "Sans jugement", icon: check },
        ],
    },
};

export default CommunityData;
