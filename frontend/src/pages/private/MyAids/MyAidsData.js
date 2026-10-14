import {
    alert,
    briefcase,
    calendar,
    check,
    externalLink,
    fileText,
    etudiant,
    heart,
    homeIcon,
    info,
    mapPin,
    shield,
    shieldCheck,
    userIcon,
    users,
} from "@/assets";
import { LinksData, SuggestedAidsData } from "@/data";

// Texts and content of the private financial aids page (Figma 40:100).
// Information only: Budget Manager does not compute eligibility nor submit
// any application. Conditions are simplified summaries, always to be checked
// on the official website; no amount or statistic is given (they depend on
// each situation and change every year).

// Aid categories (filter chips)
const CATEGORIES = {
    housing: "Logement",
    family: "Famille",
    health: "Santé",
    disability: "Handicap",
    employment: "Emploi",
    studies: "Études",
    retirement: "Retraite",
};
const ALL_CATEGORIES = Object.keys(CATEGORIES);

const MyAidsData = {
    header: {
        title: "Aides financières",
        subtitle: "Découvrez les aides qui pourraient correspondre à votre situation.",
        // Official simulator of the French administration (new tab)
        action: { label: "Vérifier mon éligibilité", variant: "primary", link: LinksData.socialRights.href, ariaLabel: "Vérifier mon éligibilité sur mesdroitssociaux.gouv.fr (nouvel onglet)" },
    },

    suggested: {
        icon: shieldCheck,
        // Figma "Des aides pourraient vous concerner / Basé sur votre profil":
        // no profile analysis exists, so the wording stays general
        title: "Des aides à vérifier en priorité",
        description: SuggestedAidsData.description,
        items: SuggestedAidsData.items,
        detailsLabel: "Voir les détails",
    },

    filters: {
        searchLabel: "Rechercher une aide",
        searchPlaceholder: "Rechercher une aide...",
        categoriesLabel: "Catégorie d'aide",
        categories: [{ value: "all", label: "Toutes" }, ...ALL_CATEGORIES.map((key) => ({ value: key, label: CATEGORIES[key] }))],
        situationLabel: "Votre situation",
        situations: [
            { value: "all", label: "Sélectionner votre situation" },
            { value: "low-income-worker", label: "Je travaille avec des revenus modestes" },
            { value: "job-seeker", label: "Je cherche un emploi" },
            { value: "student", label: "Je fais des études" },
            { value: "parent", label: "J'ai des enfants à charge" },
            { value: "disability", label: "Je suis en situation de handicap" },
            { value: "retired", label: "Je suis à la retraite" },
        ],
        reset: "Réinitialiser les filtres",
        results: (aids, organizations) =>
            `${aids} aide${aids > 1 ? "s" : ""} dans ${organizations} organisme${organizations > 1 ? "s" : ""}`,
        noResult: "Aucune aide ne correspond à votre recherche. Essayez un autre mot ou réinitialisez les filtres.",
        situationNote: "Les situations proposent les aides souvent associées à ce profil : elles ne valent pas vérification de vos droits.",
    },

    // Aids most often linked to each situation (filter, not an eligibility check)
    situationAids: {
        "low-income-worker": ["activity-bonus", "apl", "css"],
        "job-seeker": ["unemployment-benefit", "training", "mobility", "rsa", "css"],
        student: ["student-grant", "student-housing", "student-emergency", "apl"],
        parent: ["family-allowance", "apl", "rsa"],
        disability: ["aah", "pch", "cmi"],
        retired: ["aspa", "retiree-aids", "home-help"],
    },

    catalog: {
        title: "Organismes et aides disponibles",
        aidButton: (aid) => `Voir le détail : ${aid}`,
        officialLink: { label: "Voir les aides", ariaLabel: (organization) => `Voir les aides de ${organization} sur le site officiel (nouvel onglet)` },
        organizations: [
            { key: "caf", name: "CAF", icon: homeIcon, tone: "blue", badge: { label: "Famille & logement", variant: "soft-info" }, url: LinksData.caf.href },
            { key: "cpam", name: "CPAM", icon: heart, tone: "green", badge: { label: "Santé", variant: "soft-success" }, url: LinksData.ameli.href },
            { key: "mdph", name: "MDPH", icon: userIcon, tone: "violet", badge: { label: "Handicap", variant: "soft-neutral" }, url: LinksData.mdph.href },
            { key: "france-travail", name: "France Travail", icon: briefcase, tone: "orange", badge: { label: "Emploi", variant: "soft-warning" }, url: LinksData.franceTravail.href },
            { key: "retirement", name: "Retraite", icon: users, tone: "teal", badge: { label: "Retraite", variant: "soft-success" }, url: LinksData.retirement.href },
            // Not in Figma: the "Études" filter needs an organization
            { key: "crous", name: "Crous", icon: etudiant, tone: "blue", badge: { label: "Études", variant: "soft-info" }, url: LinksData.studentLife.href },
            { key: "local", name: "Aides locales", icon: mapPin, tone: "yellow", badge: { label: "Territoire", variant: "soft-warning" }, url: LinksData.servicePublic.href },
        ],
        aids: [
            {
                key: "family-allowance", organizationKey: "caf", name: "Allocations familiales", categories: ["family"],
                description: "Allocation versée aux familles qui ont au moins deux enfants à charge.",
                conditions: ["Résider en France", "Avoir au moins deux enfants à charge de moins de 20 ans"],
            },
            {
                key: "apl", organizationKey: "caf", name: "APL — Aide au logement", categories: ["housing"],
                description: "Aide personnalisée au logement pour réduire le loyer ou les mensualités d'un prêt.",
                conditions: ["Occuper le logement comme résidence principale", "Logement conventionné et décent", "Respecter certains plafonds de ressources"],
            },
            {
                key: "rsa", organizationKey: "caf", name: "RSA", categories: ["employment", "family"],
                description: "Revenu de solidarité active : un revenu minimum pour les personnes sans ressources ou aux ressources faibles.",
                conditions: ["Avoir au moins 25 ans (sauf situations particulières)", "Résider en France de façon stable", "Respecter certains plafonds de ressources"],
            },
            {
                key: "activity-bonus", organizationKey: "caf", name: "Prime d'activité", categories: ["employment"],
                description: "Complément de revenu destiné aux travailleurs aux revenus modestes.",
                conditions: ["Résider en France", "Exercer une activité professionnelle", "Respecter certains plafonds de ressources"],
            },
            {
                key: "css", organizationKey: "cpam", name: "Complémentaire Santé Solidaire", categories: ["health"],
                description: "Complémentaire santé gratuite ou à faible coût selon les ressources.",
                conditions: ["Résider en France de façon stable et régulière", "Respecter certains plafonds de ressources"],
            },
            {
                key: "daily-allowance", organizationKey: "cpam", name: "Indemnités journalières", categories: ["health", "employment"],
                description: "Revenu de remplacement versé pendant un arrêt de travail prescrit par un médecin.",
                conditions: ["Être en arrêt de travail prescrit", "Avoir suffisamment travaillé ou cotisé avant l'arrêt"],
            },
            {
                key: "health-aids", organizationKey: "cpam", name: "Aides santé", categories: ["health"],
                description: "Aides financières ponctuelles de l'Assurance Maladie pour certaines dépenses de santé.",
                conditions: ["Être assuré auprès de l'Assurance Maladie", "Situation et ressources étudiées au cas par cas"],
            },
            {
                key: "aah", organizationKey: "mdph", name: "AAH — Allocation adulte handicapé", categories: ["disability"],
                description: "Revenu minimum pour les personnes en situation de handicap.",
                conditions: ["Taux d'incapacité reconnu par la MDPH", "Avoir au moins 20 ans (16 ans dans certains cas)", "Respecter certains plafonds de ressources"],
            },
            {
                key: "pch", organizationKey: "mdph", name: "PCH — Prestation de compensation", categories: ["disability"],
                description: "Aide qui finance les besoins liés à la perte d'autonomie : aide humaine, aménagements, aides techniques.",
                conditions: ["Difficultés importantes pour réaliser certaines activités du quotidien", "Demande déposée auprès de la MDPH"],
            },
            {
                key: "cmi", organizationKey: "mdph", name: "Carte mobilité inclusion", categories: ["disability"],
                description: "Carte qui facilite les déplacements et l'accès à certains droits (priorité, stationnement, invalidité).",
                conditions: ["Handicap ou perte d'autonomie reconnu", "Demande déposée auprès de la MDPH"],
            },
            {
                key: "unemployment-benefit", organizationKey: "france-travail", name: "Allocation chômage", categories: ["employment"],
                description: "Allocation d'aide au retour à l'emploi après la perte involontaire d'un emploi.",
                conditions: ["Être inscrit comme demandeur d'emploi", "Avoir perdu son emploi de façon involontaire", "Avoir travaillé une durée minimale"],
            },
            {
                key: "training", organizationKey: "france-travail", name: "Formation professionnelle", categories: ["employment", "studies"],
                description: "Financement ou rémunération d'une formation pour retrouver un emploi.",
                conditions: ["Être inscrit comme demandeur d'emploi", "Projet de formation validé avec un conseiller"],
            },
            {
                key: "mobility", organizationKey: "france-travail", name: "Aides à la mobilité", categories: ["employment"],
                description: "Prise en charge de frais de déplacement, de repas ou d'hébergement pour un entretien, une formation ou une reprise d'emploi.",
                conditions: ["Être inscrit comme demandeur d'emploi", "Déplacement éloigné du domicile"],
            },
            {
                key: "aspa", organizationKey: "retirement", name: "ASPA — Minimum vieillesse", categories: ["retirement"],
                description: "Allocation de solidarité aux personnes âgées aux faibles ressources.",
                conditions: ["Avoir atteint l'âge requis (65 ans en général)", "Résider en France de façon stable", "Respecter certains plafonds de ressources"],
            },
            {
                key: "retiree-aids", organizationKey: "retirement", name: "Aides aux retraités modestes", categories: ["retirement"],
                description: "Aides ponctuelles de votre caisse de retraite (action sociale) pour faire face à une difficulté.",
                conditions: ["Être retraité", "Demande auprès de sa caisse de retraite"],
            },
            {
                key: "home-help", organizationKey: "retirement", name: "Aide à domicile", categories: ["retirement"],
                description: "Participation au financement d'une aide à domicile pour continuer à vivre chez soi.",
                conditions: ["Avoir besoin d'aide pour les gestes du quotidien", "Conditions fixées par la caisse de retraite ou le département"],
            },
            {
                key: "student-grant", organizationKey: "crous", name: "Bourse sur critères sociaux", categories: ["studies"],
                description: "Aide financière pour les étudiants selon les ressources de la famille.",
                conditions: ["Être inscrit dans une formation habilitée", "Respecter certains plafonds de ressources familiales"],
            },
            {
                key: "student-housing", organizationKey: "crous", name: "Logement étudiant", categories: ["studies", "housing"],
                description: "Logement en résidence universitaire à loyer modéré.",
                conditions: ["Être étudiant", "Demande via le dossier social étudiant"],
            },
            {
                key: "student-emergency", organizationKey: "crous", name: "Aide d'urgence", categories: ["studies"],
                description: "Aide ponctuelle pour un étudiant qui rencontre une difficulté financière.",
                conditions: ["Être étudiant", "Situation étudiée par le service social du Crous"],
            },
            {
                key: "department-aids", organizationKey: "local", name: "Aides départementales", categories: ALL_CATEGORIES,
                description: "Aides du conseil départemental : insertion, autonomie, famille, logement...",
                conditions: ["Conditions propres à chaque département"],
            },
            {
                key: "region-aids", organizationKey: "local", name: "Aides régionales", categories: ALL_CATEGORIES,
                description: "Aides de la région : transports, formation, études...",
                conditions: ["Conditions propres à chaque région"],
            },
            {
                key: "municipal-aids", organizationKey: "local", name: "Aides communales", categories: ALL_CATEGORIES,
                description: "Aides de votre commune, souvent via le centre communal d'action sociale (CCAS).",
                conditions: ["Conditions propres à chaque commune"],
            },
        ],
    },

    detail: {
        defaultAidKey: "activity-bonus",
        breadcrumb: (organization, aid) => `${organization} › ${aid}`,
        conditionsTitle: "Conditions principales",
        conditionsNote: "Résumé simplifié : vérifiez les conditions exactes sur le site officiel.",
        checkIcon: check,
        officialLink: { label: "Accéder au site officiel", ariaLabel: (organization) => `Accéder au site officiel : ${organization} (nouvel onglet)`, icon: externalLink },
        // Figma "Montant moyen observé 180 EUR / mois · 4,5 millions de
        // bénéficiaires": unverified figures, replaced by the official simulator
        amount: {
            title: "Montant",
            text: "Le montant dépend de votre situation et de vos ressources.",
            link: { label: "Estimer mes droits sur le simulateur officiel", url: LinksData.socialRights.href, newTab: "(nouvel onglet)" },
        },
    },

    steps: {
        title: "Comment faire une demande ?",
        description: "Les étapes clés pour constituer votre dossier.",
        items: [
            { key: "eligibility", number: 1, title: "Vérifier son éligibilité", description: "Utilisez le simulateur officiel." },
            { key: "documents", number: 2, title: "Préparer ses justificatifs", description: "Rassemblez vos pièces d'identité et revenus." },
            { key: "application", number: 3, title: "Faire la demande", description: "Remplissez le formulaire en ligne." },
            { key: "follow-up", number: 4, title: "Suivre son dossier", description: "Consultez l'avancement sur votre compte.", variant: "success" },
        ],
    },

    documents: {
        title: "Documents fréquemment demandés",
        items: ["Pièce d'identité", "Justificatif de domicile", "Avis d'imposition", "Bulletins de salaire", "Attestation CAF", "RIB bancaire"]
            .map((title) => ({ key: title, icon: fileText, title })),
    },

    tips: {
        title: "Conseils Budget Manager",
        description: "Pour ne manquer aucune opportunité d'aide.",
        items: [
            { id: "tip-rights", variant: "suggestion", tone: "blue", icon: { src: shield, alt: "" }, title: "Ne laissez pas passer vos droits", description: "Une partie des aides auxquelles les personnes ont droit n'est jamais demandée. Vérifiez votre situation régulièrement." },
            { id: "tip-yearly", variant: "suggestion", tone: "orange", icon: { src: calendar, alt: "" }, title: "Vérifiez votre situation chaque année", description: "Votre situation peut changer : revenus, emploi, famille... Réévaluez vos droits chaque année." },
            { id: "tip-documents", variant: "suggestion", tone: "green", icon: { src: fileText, alt: "" }, title: "Conservez vos justificatifs", description: "Gardez vos documents administratifs classés et accessibles pour faciliter vos démarches." },
            { id: "tip-official", variant: "suggestion", tone: "red", icon: { src: alert, alt: "" }, title: "Effectuez vos démarches sur les sites officiels", description: "Ne communiquez jamais vos informations personnelles sur des sites non officiels." },
        ],
    },

    officialSites: {
        title: "Sites officiels",
        description: "Retrouvez toutes les informations sur les sites des organismes.",
        items: [
            { id: "site-caf", variant: "organization", initials: "C", color: "blue", title: "CAF", description: "Allocations et logement", link: { label: "Accéder au site", url: LinksData.caf.href, variant: "external" } },
            { id: "site-cpam", variant: "organization", initials: "C", color: "green", title: "CPAM", description: "Assurance Maladie", link: { label: "Accéder au site", url: LinksData.ameli.href, variant: "external" } },
            { id: "site-mdph", variant: "organization", initials: "M", color: "purple", title: "MDPH", description: "Droits liés au handicap", link: { label: "Accéder au site", url: LinksData.mdph.href, variant: "external" } },
            { id: "site-france-travail", variant: "organization", initials: "F", color: "orange", title: "France Travail", description: "Emploi et formation", link: { label: "Accéder au site", url: LinksData.franceTravail.href, variant: "external" } },
            { id: "site-service-public", variant: "organization", initials: "S", color: "slate", title: "Service-Public.fr", description: "Portail de l'administration", link: { label: "Accéder au site", url: LinksData.servicePublic.href, variant: "external" } },
        ],
    },

    notice: {
        icon: info,
        title: "Information importante",
        text: "Budget Manager n'est pas un organisme public. Les informations présentées sont fournies à titre informatif uniquement. Les demandes d'aides doivent être effectuées directement auprès des organismes officiels concernés.",
    },
};

export default MyAidsData;
