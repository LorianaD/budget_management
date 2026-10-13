import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/ExpenseController.php — #[Route('api/expense')]
// The year/month query is a provisional convention, to confirm with the backend.
// Recurring transactions have no entity nor route: they only exist as mocks.
const routes = {
    list: declaredRoute("GET", "api/expense", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
};

export const getExpenses = ({ year, month }, options) =>
    callRoute(routes.list, { query: { year, month }, ...options });

export const getExpense = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });

export const createExpense = (payload, options) =>
    callRoute(routes.create, { body: payload, ...options });

export const updateExpense = (id, payload, options) =>
    callRoute(routes.update, { params: { id }, body: payload, ...options });

export const deleteExpense = (id, options) =>
    callRoute(routes.delete, { params: { id }, ...options });
