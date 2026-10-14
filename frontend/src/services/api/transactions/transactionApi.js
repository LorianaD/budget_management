import { callRoute, missingRoute } from "@/services/http";

// Transaction entity (backend/src/Entity/Transaction.php). No committed
// controller exposes it yet: every operation is a missing route, no path is
// guessed. Recurring transactions have no entity: they only exist as mocks.
const routes = {
    list: missingRoute("GET"),
    show: missingRoute("GET"),
    create: missingRoute("POST"),
    update: missingRoute("PUT"),
    delete: missingRoute("DELETE"),
};

export const getTransactions = ({ year, month }, options) =>
    callRoute(routes.list, { query: { year, month }, ...options });

export const getTransaction = (id, options) =>
    callRoute(routes.show, { params: { id }, ...options });

export const createTransaction = (payload, options) =>
    callRoute(routes.create, { body: payload, ...options });

export const updateTransaction = (id, payload, options) =>
    callRoute(routes.update, { params: { id }, body: payload, ...options });

export const deleteTransaction = (id, options) =>
    callRoute(routes.delete, { params: { id }, ...options });
