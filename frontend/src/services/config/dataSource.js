import { SERVICE_ERROR_CODES, ServiceError } from "@/services/errors";

// Where the private area reads its data: "mock" (fictional data, default)
// or "api" (Symfony). Set VITE_DATA_SOURCE in a Vite .env file to change it.
// This module is the only place that checks the mode.
const DATA_SOURCES = ["mock", "api"];

// import.meta.env is provided by Vite; the fallback keeps the module usable in Node scripts
const env = import.meta.env ?? {};
const configuredSource = env.VITE_DATA_SOURCE ?? "mock";

if (!DATA_SOURCES.includes(configuredSource)) {
    throw new Error(`Invalid VITE_DATA_SOURCE "${configuredSource}": expected ${DATA_SOURCES.join(" or ")}.`);
}

export const dataSource = configuredSource;
export const isMockMode = dataSource === "mock";

// Picks the read implementation of a resource once, when its service module loads
export function selectSource({ api, mock }) {
    return isMockMode ? mock : api;
}

// Runs a write operation against the API. In mock mode the operation is never
// called, so no HTTP request can leave the app and nothing pretends to be saved.
export function runWrite(operation) {
    if (isMockMode) {
        return Promise.reject(new ServiceError(
            SERVICE_ERROR_CODES.DEMO_READ_ONLY,
            "Write operations are disabled with demo data.",
        ));
    }

    return operation();
}
