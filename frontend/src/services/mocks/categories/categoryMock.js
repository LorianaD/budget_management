import { categories } from "@/data/private/mocks";
import { mockRequest } from "../mockRequest";

// Same read signatures as categoryApi
export const getCategories = (options) =>
    mockRequest(() => categories, options);

export const getCategory = (id, options) =>
    mockRequest(() => categories.find((category) => category.id === id) ?? null, options);
