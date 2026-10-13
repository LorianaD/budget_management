import { arrowRight, checkChip, inputLock, inputMail, loginImg, lockSmall } from "@/assets";
import { LinksData } from "@/data";

const LoginData = {
    backLink: {
        label: "Retour à l'accueil",
        path: LinksData.home.path,
    },

    heading: {
        title: "Connexion",
        subtitle: "Accédez à votre espace personnel.",
    },

    form: {
        fields: [
            {
                name: "email",
                label: "Adresse e-mail",
                type: "email",
                placeholder: "votre@email.fr",
                icon: inputMail,
                autoComplete: "email",
                required: true,
            },
            {
                name: "password",
                label: "Mot de passe",
                type: "password",
                placeholder: "Votre mot de passe",
                icon: inputLock,
                autoComplete: "current-password",
                required: true,
            },
        ],

        rememberMe: {
            name: "remember",
            label: "Se souvenir de moi",
        },

        // No password reset flow yet
        forgotPassword: {
            label: "Mot de passe oublié ?",
            variant: "inline",
            disabled: true,
            disabledReason: "fonctionnalité bientôt disponible",
        },

        submit: {
            label: "Se connecter",
            icon: arrowRight,
        },

        // UI only: authentication is not wired yet
        unavailableNotice:
            "La connexion n'est pas encore disponible : l'espace personnel est en cours de développement. Aucune donnée n'a été envoyée.",
    },

    signup: {
        divider: "ou",
        text: "Vous n'avez pas encore de compte ?",
        label: "Créer un compte",
        path: LinksData.register.path,
    },

    // Opens the demo private area directly: no authentication is simulated
    demo: {
        label: "Découvrir le tableau de bord de démonstration",
        path: LinksData.dashboard.path,
    },

    reassurance: {
        icon: lockSmall,
        text: "Connexion sécurisée — Données protégées",
    },

    panel: {
        variant: "blue",
        layout: "login",
        image: loginImg,
        title: "Bienvenue sur Budget Manager",
        description:
            "Votre espace personnel pour gérer votre budget, suivre vos objectifs et découvrir les aides disponibles.",
        chips: {
            icon: checkChip,
            items: [
                { key: "budget", label: "Suivre son budget" },
                { key: "goals", label: "Atteindre ses objectifs" },
                { key: "aids", label: "Découvrir les aides" },
                { key: "expenses", label: "Gérer ses dépenses" },
            ],
        },
    },
};

export default LoginData;
