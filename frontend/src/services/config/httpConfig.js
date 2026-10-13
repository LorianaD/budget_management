// Base URL of the Symfony API. Empty by default: requests go to the same
// origin (e.g. through a Vite dev proxy, to be configured with the backend).
const env = import.meta.env ?? {};

export const apiBaseUrl = env.VITE_API_BASE_URL ?? "";

export const defaultHeaders = {
    Accept: "application/json",
};
