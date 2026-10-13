// Errors raised by the service layer. The UI reads `code` and shows its own
// French message (from the page Data.js files); `message` is for developers.
// Aborted requests are not wrapped: they keep the native AbortError.
export const SERVICE_ERROR_CODES = {
    // Write attempted while the app runs on demo data
    DEMO_READ_ONLY: "DEMO_READ_ONLY",
    // Symfony route missing or still returning a placeholder
    API_NOT_READY: "API_NOT_READY",
    // Symfony answered with a non-2xx status
    HTTP_ERROR: "HTTP_ERROR",
};

export class ServiceError extends Error {
    constructor(code, message, details = {}) {
        super(message);
        this.name = "ServiceError";
        this.code = code;
        this.details = details;
    }
}
