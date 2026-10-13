import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/BudgetController.php — #[Route('api/budget')]
// The year/month query is a provisional convention, to confirm with the backend.
const routes = {
    list: declaredRoute("GET", "api/budget", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
};

export const getBudgets = ({ year, month }, options) =>
    callRoute(routes.list, { query: { year, month }, ...options });

export const getBudget = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });

export const createBudget = (payload, options) =>
    callRoute(routes.create, { body: payload, ...options });

export const updateBudget = (id, payload, options) =>
    callRoute(routes.update, { params: { id }, body: payload, ...options });

export const deleteBudget = (id, options) =>
    callRoute(routes.delete, { params: { id }, ...options });
