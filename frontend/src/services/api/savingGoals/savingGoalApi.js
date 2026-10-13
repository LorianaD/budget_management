import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/SavingGoalController.php — #[Route('/api/saving')]
// SavingGoalService::addMoney exists but no route exposes it, and deposits
// are not stored: the deposit history only exists as mocks.
const routes = {
    list: declaredRoute("GET", "/api/saving", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
};

export const getSavingGoals = (options) =>
    callRoute(routes.list, { ...options });

export const getSavingGoal = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });

export const createSavingGoal = (payload, options) =>
    callRoute(routes.create, { body: payload, ...options });

export const updateSavingGoal = (id, payload, options) =>
    callRoute(routes.update, { params: { id }, body: payload, ...options });

export const deleteSavingGoal = (id, options) =>
    callRoute(routes.delete, { params: { id }, ...options });
