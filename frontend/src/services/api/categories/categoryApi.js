import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/CategoryController.php — #[Route('api/category')]
// System categories (isSystem) are shared; user categories have a user relation.
// The private area only reads them for now.
const routes = {
    list: declaredRoute("GET", "api/category", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
};

export const getCategories = (options) =>
    callRoute(routes.list, { ...options });

export const getCategory = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });
