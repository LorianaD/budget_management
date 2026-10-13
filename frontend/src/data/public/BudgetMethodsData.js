import { calendar, leaf, mail, ruler } from "@/assets";

// Les quatre méthodes budgétaires présentées gratuitement sur les pages publiques
// (aperçu sur l'Accueil, présentation sur Conseils). L'id sert d'ancre :
// /advices#method-50-30-20
const BudgetMethodsData = [
    {
        key: "50-30-20",
        id: "method-50-30-20",
        icon: {
            src: ruler,
        },
        title: "Méthode 50/30/20",
        description: "50% pour vos besoins essentiels, 30% pour vos envies et 20% pour l'épargne. Simple et efficace.",
        variant: "budgetMethods",
    },
    {
        key: "envelopes",
        id: "method-envelopes",
        icon: {
            src: mail,
        },
        title: "Budget enveloppes",
        description: "Divisez votre budget en enveloppes thématiques : alimentation, transport, loisirs... et ne dépassez jamais.",
        variant: "budgetMethods",
    },
    {
        key: "forecast",
        id: "method-forecast",
        icon: {
            src: calendar,
        },
        title: "Budget prévisionnel",
        description: "Anticipez vos dépenses futures en planifiant vos charges fixes et variables sur plusieurs mois.",
        variant: "budgetMethods",
    },
    {
        key: "progressive-savings",
        id: "method-progressive-savings",
        icon: {
            src: leaf,
        },
        title: "Épargne progressive",
        description: "Commencez à épargner petit à petit, même avec de petits revenus. Chaque euro compte.",
        variant: "budgetMethods",
    },
];

export default BudgetMethodsData;
