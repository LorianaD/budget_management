import { useCallback, useEffect, useEffectEvent, useState } from "react";

// Loads asynchronous data identified by `key` (e.g. "dashboard:2026-07").
// fetcher({ signal }) must return a promise and honour the AbortSignal.
//
// Stale responses are impossible:
// - changing the key (or unmounting) aborts the previous request;
// - a result is only shown if it was produced for the current key and attempt,
//   so data from a previous period is never displayed, even briefly.
//
// Returns { data, error, isLoading, reload }.
function useAsyncResource(key, fetcher) {
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState({ requestId: null, data: undefined, error: null });

    const requestId = `${key}#${attempt}`;
    const runFetcher = useEffectEvent((signal) => fetcher({ signal }));

    useEffect(() => {
        const controller = new AbortController();

        runFetcher(controller.signal).then(
            (data) => {
                if (!controller.signal.aborted) setResult({ requestId, data, error: null });
            },
            (error) => {
                if (!controller.signal.aborted) setResult({ requestId, data: undefined, error });
            },
        );

        return () => controller.abort();
    }, [requestId]);

    const reload = useCallback(() => setAttempt((current) => current + 1), []);
    const isCurrent = result.requestId === requestId;

    return {
        data: isCurrent ? result.data : undefined,
        error: isCurrent ? result.error : null,
        isLoading: !isCurrent,
        reload,
    };
}

export default useAsyncResource;
