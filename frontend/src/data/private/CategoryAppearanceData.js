import { alimentation, etudes, gift, heart, logement, transport, walletIcon } from "@/assets";

// Presentation of each budget category (not business data): the backend
// Category entity has no icon. Keyed by category name until categories get
// a stable technical identifier.
const CategoryAppearanceData = {
    Logement: { icon: logement },
    Alimentation: { icon: alimentation },
    Transport: { icon: transport },
    Loisirs: { icon: gift },
    Santé: { icon: heart },
    Formation: { icon: etudes },
};

const fallbackAppearance = { icon: walletIcon };

export function getCategoryAppearance(categoryName) {
    return CategoryAppearanceData[categoryName] ?? fallbackAppearance;
}

export default CategoryAppearanceData;
