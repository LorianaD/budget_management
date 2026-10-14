import { categoryApi } from "@/services/api";
import { selectSource } from "@/services/config";
import { mapCategory } from "@/services/mappers";
import { categoryMock } from "@/services/mocks";

// Income and expense categories (Category.type), read-only for the private area.
// Callers filter them by type with getCategoriesOfType (utils/financial).
const source = selectSource({ api: categoryApi, mock: categoryMock });

export async function getCategories(options) {
    const categories = await source.getCategories(options);
    return categories.map(mapCategory);
}

export async function getCategory(id, options) {
    const category = await source.getCategory(id, options);
    return category ? mapCategory(category) : null;
}
