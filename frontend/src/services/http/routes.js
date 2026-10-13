// Real state of each Symfony route used by the API modules.
// Only "ready" routes can be called (see callRoute): update a route to
// "ready" once its controller returns the expected business data.
export const ROUTE_STATUS = {
    // Implemented and returning business data
    READY: "ready",
    // Declared in a controller but still returning a placeholder message
    PLACEHOLDER: "placeholder",
    // No route in the backend yet
    MISSING: "missing",
};

// A route declared in a Symfony controller
export const declaredRoute = (method, path, status) => ({ method, path, status });

// An operation the frontend will need but that has no route yet: no path is
// guessed, it must come from the backend.
export const missingRoute = (method) => ({ method, path: null, status: ROUTE_STATUS.MISSING });
