import {
    barChartIcon,
    bookOpenIcon,
    creditCard,
    handHelping,
    homeIcon,
    settingsIcon,
    target,
    users,
    walletIcon,
} from "@/assets";
import { LinksData } from "@/data";

// Pages of the private area that do not exist yet are listed but disabled
const SidebarData = {
    logo: {
        icon: walletIcon,
        title: "Budget Manager",
        path: LinksData.dashboard.path,
    },

    navLabel: "Navigation de l'espace personnel",
    disabledReason: "page bientôt disponible",

    nav: [
        { ...LinksData.dashboard, icon: homeIcon },
        { ...LinksData.budget, icon: creditCard },
        { ...LinksData.expenses, icon: barChartIcon },
        { ...LinksData.savingGoals, icon: target },
        { ...LinksData.budgetMethods, icon: bookOpenIcon },
        { ...LinksData.myAids, icon: handHelping },
        // Public page: leaves the private area, so the period is not carried over
        { ...LinksData.community, icon: users, isPublic: true },
        // No route decided yet
        { key: "settings", label: "Paramètres", icon: settingsIcon, disabled: true },
    ],

    account: {
        label: "Mon compte",
    },

    menuToggle: {
        open: "Ouvrir le menu",
        close: "Fermer le menu",
    },
};

export default SidebarData;
