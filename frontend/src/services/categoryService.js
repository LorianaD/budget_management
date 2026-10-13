import { categoryApi } from "@/services/api";
import { selectSource } from "@/services/config";
import { mapCategory } from "@/services/mappers";
import { categoryMock } from "@/services/mocks";

// Categories are global and read-only for the private area
const source = selectSource({ api: categoryApi, mock: categoryMock });

export async function getCategories(options) {
    const categories = await source.getCategories(options);
    return categories.map(mapCategory);
}

export async function getCategory(id, options) {
    const category = await source.getCategory(id, options);
    return category ? mapCategory(category) : null;
}
