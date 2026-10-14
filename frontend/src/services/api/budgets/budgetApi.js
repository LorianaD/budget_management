import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/BudgetController.php — #[Route('api/budget')]
// The year/month query is a provisional convention, to confirm with the backend.
// BudgetAllocation (planned amount per category) has no committed controller:
// its operations are missing routes, no path is guessed.
const routes = {
    list: declaredRoute("GET", "api/budget", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
    listAllocations: missingRoute("GET"),
    createAllocation: missingRoute("POST"),
    updateAllocation: missingRoute("PUT"),
    deleteAllocation: missingRoute("DELETE"),
};

// Budgets of one month (at most one per user: UNIQ_BUDGET_USER_PERIOD)
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

export const getBudgetAllocations = (budgetId, options) =>
    callRoute(routes.listAllocations, { params: { budgetId }, ...options });

export const createBudgetAllocation = (payload, options) =>
    callRoute(routes.createAllocation, { body: payload, ...options });

export const updateBudgetAllocation = (id, payload, options) =>
    callRoute(routes.updateAllocation, { params: { id }, body: payload, ...options });

export const deleteBudgetAllocation = (id, options) =>
    callRoute(routes.deleteAllocation, { params: { id }, ...options });
