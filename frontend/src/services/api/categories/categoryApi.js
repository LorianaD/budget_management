import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/CategoryController.php — #[Route('api/category')]
// Categories are global (no user relation): the private area only reads them.
const routes = {
    list: declaredRoute("GET", "api/category", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
};

export const getCategories = (options) =>
    callRoute(routes.list, { ...options });

export const getCategory = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });
