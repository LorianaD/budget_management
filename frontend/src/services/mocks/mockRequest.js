// Simulates an HTTP call to the Symfony API until it exists:
// - asynchronous, with a small latency so loading states are visible
// - returns a deep copy, so callers can never mutate the mocks
// - honours an AbortSignal like fetch(): an aborted request rejects with an
//   AbortError and never resolves, which prevents stale responses.
const MOCK_LATENCY_MS = 300;

const abortError = () => new DOMException("The request was aborted.", "AbortError");

export function mockRequest(getPayload, { signal } = {}) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(abortError());
            return;
        }

        const timer = setTimeout(() => {
            signal?.removeEventListener("abort", onAbort);
            resolve(structuredClone(getPayload()));
        }, MOCK_LATENCY_MS);

        function onAbort() {
            clearTimeout(timer);
            reject(abortError());
        }

        signal?.addEventListener("abort", onAbort, { once: true });
    });
}
