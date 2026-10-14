import { alimentation, banknoteIcon, etudes, gift, handHeart, heart, logement, transport, walletIcon } from "@/assets";

// Presentation of each budget category (not business data): the backend
// Category entity has no icon nor colour. Keyed by category name until
// categories get a stable technical identifier.
// color: hex value (charts draw on a canvas, which cannot read CSS variables),
// taken from the "Répartition du budget" legend (Figma 16:4).
const CategoryAppearanceData = {
    Logement: { icon: logement, color: "#1565C0" },
    Alimentation: { icon: alimentation, color: "#2E7D32" },
    Transport: { icon: transport, color: "#F9A825" },
    Loisirs: { icon: gift, color: "#C62828" },
    Santé: { icon: heart, color: "#7B1FA2" },
    Formation: { icon: etudes, color: "#0288D1" },

    // Income categories (no Figma colour: existing icons, neutral palette)
    Salaire: { icon: walletIcon, color: "#2E7D32" },
    "Aides et allocations": { icon: handHeart, color: "#00796B" },
    "Autres revenus": { icon: banknoteIcon, color: "#546E7A" },
};

const fallbackAppearance = { icon: walletIcon, color: "#94A3B8" };

export function getCategoryAppearance(categoryName) {
    return CategoryAppearanceData[categoryName] ?? fallbackAppearance;
}

export default CategoryAppearanceData;
