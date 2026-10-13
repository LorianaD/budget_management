import { callRoute, declaredRoute, missingRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/IncomeController.php — #[Route('/api/income')]
// The year/month query is a provisional convention, to confirm with the backend.
const routes = {
    list: declaredRoute("GET", "/api/income", ROUTE_STATUS.PLACEHOLDER),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
};

export const getIncomes = ({ year, month }, options) =>
    callRoute(routes.list, { query: { year, month }, ...options });

export const getIncome = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });

export const createIncome = (payload, options) =>
    callRoute(routes.create, { body: payload, ...options });

export const updateIncome = (id, payload, options) =>
    callRoute(routes.update, { params: { id }, body: payload, ...options });

export const deleteIncome = (id, options) =>
    callRoute(routes.delete, { params: { id }, ...options });
