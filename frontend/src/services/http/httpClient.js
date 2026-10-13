import { apiBaseUrl, defaultHeaders } from "@/services/config";
import { SERVICE_ERROR_CODES, ServiceError } from "@/services/errors";
import { ROUTE_STATUS } from "./routes";

const buildUrl = (path, query) => {
    const url = `${apiBaseUrl}/${path.replace(/^\//, "")}`;
    const search = new URLSearchParams(
        Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== null),
    ).toString();

    return search ? `${url}?${search}` : url;
};

// "api/budget/{id}" + { id: 7 } -> "api/budget/7"
const fillPath = (path, params = {}) =>
    path.replace(/\{(\w+)\}/g, (_, name) => encodeURIComponent(params[name]));

// Calls a Symfony route described in an API module.
// Routes that are missing or still placeholders are refused before any
// network call. The AbortSignal is passed to fetch, so an aborted request
// rejects with the native AbortError.
export async function callRoute(route, { params, query, body, signal } = {}) {
    if (route.status !== ROUTE_STATUS.READY) {
        throw new ServiceError(
            SERVICE_ERROR_CODES.API_NOT_READY,
            `${route.method} ${route.path ?? "(no route yet)"} is ${route.status} in the Symfony backend.`,
            { route },
        );
    }

    const response = await fetch(buildUrl(fillPath(route.path, params), query), {
        method: route.method,
        headers: body ? { ...defaultHeaders, "Content-Type": "application/json" } : defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal,
    });

    if (!response.ok) {
        throw new ServiceError(
            SERVICE_ERROR_CODES.HTTP_ERROR,
            `${route.method} ${route.path} failed with status ${response.status}.`,
            { status: response.status },
        );
    }

    return response.status === 204 ? null : response.json();
}
