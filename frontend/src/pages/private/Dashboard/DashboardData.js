import {
    banknoteIcon,
    creditCard,
    lightbulb,
    piggyBank,
    star,
    target,
    walletIcon,
} from "@/assets";
import { LinksData } from "@/data";

// Texts and presentation content of the dashboard (Figma 11:4).
// Figures never live here: they are computed from the services data.
const UNAVAILABLE_PAGE = "page bientôt disponible";

const DashboardData = {
    header: {
        greeting: "Bonjour",
        updatedAt: "Mise à jour aujourd'hui à",
    },

    states: {
        loading: "Chargement de votre tableau de bord…",
        error: "Impossible de charger vos données pour le moment.",
        retry: "Réessayer",
        empty: "Aucune donnée n'est disponible pour cette période.",
    },

    summary: {
        label: "Chiffres clés du mois",
        cards: {
            income: { label: "Revenus du mois", icon: walletIcon, iconTone: "green" },
            expenses: { label: "Dépenses du mois", icon: creditCard, iconTone: "orange" },
            savings: { label: "Épargne", icon: piggyBank, iconTone: "green" },
            remainingToLive: { label: "Reste à vivre", icon: banknoteIcon, iconTone: "orange" },
        },
        trend: {
            stable: "stable",
            previousMonth: "vs mois dernier",
        },
        budget: {
            within: "dans le budget",
            over: "budget dépassé",
        },
        perDay: "par jour restant",
    },

    budget: {
        title: "Budget du mois",
        used: "utilisé",
        spent: "dépensés",
        totalPrefix: "Sur un budget total de",
        detailsButton: {
            label: "Voir l'analyse détaillée",
            disabledReason: UNAVAILABLE_PAGE,
        },
        empty: "Aucun budget n'est défini pour ce mois.",
    },

    savingGoal: {
        title: "Objectif épargne",
        icon: target,
        reached: "atteint",
        noDeadline: "Sans échéance",
        depositButton: {
            label: "Ajouter un versement",
            disabledReason: "les versements ne sont pas disponibles avec les données de démonstration",
        },
        empty: "Aucun objectif d'épargne en cours.",
    },

    recommendedMethod: {
        title: "Méthode recommandée",
        icon: star,
        card: {
            variant: "recommendedMethod",
            title: "Méthode 50/30/20",
            // Figma says "correspond à votre profil": no profile analysis exists yet
            description: "50 % besoins essentiels · 30 % envies · 20 % épargne. Une méthode simple pour équilibrer votre budget.",
            btn: {
                label: "Découvrir",
                variant: "outline",
                size: "small",
                link: `${LinksData.advices.path}#method-50-30-20`,
            },
        },
    },

    suggestedAids: {
        title: "Aides qui pourraient vous intéresser",
        // Figma says "Basé sur votre profil": eligibility is not computed, so the
        // badges show the aid's domain instead of an eligibility status.
        description: "Quelques aides à vérifier selon votre situation.",
        items: [
            {
                id: "aid-activity-bonus",
                variant: "suggestedAid",
                tone: "green",
                title: "Prime d'activité",
                badge: { label: "Revenus", variant: "soft-success" },
                description: "Complément de revenu pour les travailleurs à faibles salaires. Aide versée par la CAF.",
                btn: { label: "Voir les détails", variant: "outline", size: "small", link: LinksData.helps.path },
            },
            {
                id: "aid-housing",
                variant: "suggestedAid",
                tone: "blue",
                title: "APL — Aide au logement",
                badge: { label: "Logement", variant: "soft-info" },
                description: "Aide personnalisée pour réduire votre loyer ou remboursement de prêt.",
                btn: { label: "Voir les détails", variant: "outline", size: "small", link: LinksData.helps.path },
            },
            {
                id: "aid-health",
                variant: "suggestedAid",
                tone: "green",
                title: "Complémentaire Santé Solidaire",
                badge: { label: "Santé", variant: "soft-success" },
                description: "Mutuelle gratuite ou à faible coût pour les personnes à revenus modestes.",
                btn: { label: "Voir les détails", variant: "outline", size: "small", link: LinksData.helps.path },
            },
        ],
    },

    dailyTip: {
        title: "Conseil du jour",
        icon: lightbulb,
        text: "Pensez à prévoir une catégorie « imprévus » dans votre budget mensuel afin d'éviter les découverts. Même 20 € de côté par mois peuvent faire la différence.",
        link: { label: "Voir plus de conseils", url: LinksData.advices.path },
    },

    recentActivity: {
        title: "Activité récente",
        types: {
            expense: { label: "Dépense", icon: creditCard, tone: "orange" },
            income: { label: "Revenu", icon: walletIcon, tone: "blue" },
            deposit: { label: "Versement épargne", icon: piggyBank, tone: "green" },
        },
        empty: "Aucune activité récente sur cette période.",
    },
};

export default DashboardData;
