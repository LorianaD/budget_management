import {
    arrowRight,
    checkChipBold,
    checkGreen14,
    checkGreen18,
    checkWhite20,
    checkWhite32,
    inputCurrency,
    inputLock,
    inputMail,
    inputUser,
    lockSmall,
    registerStep1,
    registerStep2,
    registerStep3,
    registerStep4,
} from "@/assets";
import { LinksData } from "@/data";

// Legal pages do not exist yet: their links are disabled
const UNAVAILABLE_REASON = "page bientôt disponible";

const RegisterData = {
    // Initial form values (UI only, nothing is saved)
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        situation: "",
        income: "",
        objectives: [],
        preferences: {
            advice: true,
            alerts: true,
            aids: true,
            newsletter: false,
        },
        terms: false,
    },

    steps: [
        // ---------- Step 1 ----------
        {
            id: "identity",
            progressLabel: "Étape 1 sur 3 — Informations personnelles",
            title: "Créer votre compte",
            subtitle: "Rejoignez des milliers de personnes qui gèrent mieux leur budget.",
            nameFields: [
                {
                    name: "firstName",
                    label: "Prénom",
                    placeholder: "Votre prénom",
                    autoComplete: "given-name",
                    required: true,
                },
                {
                    name: "lastName",
                    label: "Nom",
                    placeholder: "Votre nom",
                    autoComplete: "family-name",
                    required: true,
                },
            ],
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
                    placeholder: "Min. 8 caractères",
                    icon: inputLock,
                    autoComplete: "new-password",
                    minLength: 8,
                    hint: "8 caractères minimum.",
                    required: true,
                },
                {
                    name: "passwordConfirm",
                    label: "Confirmation du mot de passe",
                    type: "password",
                    placeholder: "Répétez votre mot de passe",
                    icon: inputLock,
                    autoComplete: "new-password",
                    required: true,
                },
            ],
            passwordMismatch: "Les deux mots de passe ne sont pas identiques.",
            submit: { label: "Continuer", icon: arrowRight },
            reassurance: {
                icon: lockSmall,
                text: "Inscription gratuite — Données protégées",
            },
            panel: {
                variant: "blue",
                image: registerStep1,
                title: "Votre budget, enfin sous contrôle",
                chips: {
                    icon: checkChipBold,
                    items: [
                        { key: "tools", label: "Outils gratuits" },
                        { key: "advice", label: "Conseils personnalisés" },
                        { key: "aids", label: "Aides détectées" },
                        { key: "tracking", label: "Suivi simplifié" },
                    ],
                },
            },
        },

        // ---------- Step 2 ----------
        {
            id: "situation",
            progressLabel: "Étape 2 sur 3 — Votre situation",
            title: "Parlez-nous un peu de vous",
            subtitle: "Ces informations nous permettent de personnaliser votre expérience.",
            fields: [
                {
                    name: "situation",
                    label: "Situation principale",
                    placeholder: "Choisir votre situation",
                    icon: inputUser,
                    options: [
                        { value: "employee", label: "Salarié" },
                        { value: "student", label: "Étudiant" },
                        { value: "single-parent", label: "Parent isolé" },
                        { value: "retired", label: "Retraité" },
                        { value: "job-seeker", label: "Recherche d'emploi" },
                        { value: "disability", label: "Situation de handicap" },
                        { value: "other", label: "Autre situation" },
                    ],
                },
                {
                    name: "income",
                    label: "Tranche de revenus mensuels",
                    placeholder: "Choisir une tranche",
                    icon: inputCurrency,
                    options: [
                        { value: "under-1000", label: "Moins de 1 000 €" },
                        { value: "1000-1500", label: "De 1 000 à 1 500 €" },
                        { value: "1500-2000", label: "De 1 500 à 2 000 €" },
                        { value: "2000-3000", label: "De 2 000 à 3 000 €" },
                        { value: "over-3000", label: "Plus de 3 000 €" },
                        { value: "no-answer", label: "Je préfère ne pas répondre" },
                    ],
                },
            ],
            objectives: {
                legend: "Votre objectif principal",
                hint: "Vous pouvez sélectionner plusieurs options.",
                options: [
                    { value: "manage-budget", label: "Mieux gérer mon budget" },
                    { value: "save", label: "Économiser" },
                    { value: "project", label: "Préparer un projet" },
                    { value: "aids", label: "Découvrir les aides" },
                    { value: "reduce-expenses", label: "Réduire mes dépenses" },
                ],
            },
            back: { label: "Retour" },
            submit: { label: "Continuer", icon: arrowRight },
            panel: {
                variant: "light",
                image: registerStep2,
                title: "Personnalisé pour votre situation",
                description:
                    "Vos réponses nous aident à vous proposer des conseils et des aides adaptés à votre profil.",
                badges: [
                    { key: "employee", label: "Salarié", variant: "solid-blue" },
                    { key: "budget", label: "Budget optimisé", variant: "solid-green" },
                    { key: "aids", label: "Aides détectées", variant: "solid-yellow" },
                ],
            },
        },

        // ---------- Step 3 ----------
        {
            id: "preferences",
            progressLabel: "Étape 3 sur 3 — Personnalisation",
            title: "Configurez votre espace",
            subtitle: "Choisissez les options qui vous correspondent. Vous pourrez les modifier plus tard.",
            preferences: [
                {
                    name: "advice",
                    title: "Activer les conseils budgétaires",
                    description: "Recevez des conseils adaptés à votre profil.",
                },
                {
                    name: "alerts",
                    title: "Recevoir les alertes budgétaires",
                    description: "Soyez prévenu si vous dépassez votre budget.",
                },
                {
                    name: "aids",
                    title: "Recevoir des recommandations d'aides",
                    description: "Découvrez les aides auxquelles vous pourriez avoir droit.",
                },
                {
                    name: "newsletter",
                    title: "Recevoir la newsletter",
                    description: "Conseils et actualités budgétaires mensuels.",
                },
            ],
            terms: {
                before: "J'accepte les ",
                termsLink: {
                    label: LinksData.termsOfUse.label.toLowerCase(),
                    variant: "inline",
                    disabled: true,
                    disabledReason: UNAVAILABLE_REASON,
                },
                between: " et la ",
                privacyLink: {
                    label: LinksData.privacyPolicy.label.toLowerCase(),
                    variant: "inline",
                    disabled: true,
                    disabledReason: UNAVAILABLE_REASON,
                },
                after: ".",
            },
            back: { label: "Retour" },
            submit: { label: "Créer mon compte", icon: checkWhite20 },
            note: "100 % gratuit — Sans carte bancaire",
            panel: {
                variant: "green",
                image: registerStep3,
                title: "Presque prêt\u00A0!",
                description: "Votre espace Budget Manager sera prêt en quelques secondes.",
                checklist: {
                    icon: checkGreen18,
                    items: [
                        { key: "secure", label: "Compte sécurisé" },
                        { key: "profile", label: "Profil personnalisé" },
                        { key: "tools", label: "Outils disponibles immédiatement" },
                    ],
                },
            },
        },
    ],

    // ---------- Confirmation screen ----------
    success: {
        image: registerStep4,
        icon: checkWhite32,
        // \u00A0: French typography requires a non-breaking space before "!" (also prevents a lone "!" on a new line)
        title: "Bienvenue sur Budget Manager\u00A0!",
        description: "Votre espace est prêt. Vous pouvez maintenant accéder à tous vos outils.",
        // UI only: this screen is a preview, no account actually exists
        previewNotice:
            "Aperçu de l'écran de confirmation : l'inscription n'est pas encore reliée au serveur, aucun compte n'a été créé et aucune donnée n'a été envoyée.",
        buttons: [
            {
                key: "dashboard",
                label: "Accéder à mon tableau de bord",
                variant: "primary",
                // The dashboard is private: go through login
                link: LinksData.login.path,
            },
            {
                key: "tools",
                label: "Découvrir les outils",
                variant: "outline",
                link: LinksData.tools.path,
            },
        ],
        checklist: {
            icon: checkGreen14,
            items: [
                { key: "budget", label: "Budget configuré" },
                { key: "advice", label: "Conseils activés" },
                { key: "aids", label: "Aides identifiées" },
                { key: "community", label: "Communauté prête" },
            ],
        },
    },
};

export default RegisterData;
