import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { getDefaultPeriod } from "@/services";
import { shiftPeriod } from "@/utils";
import { PeriodContext } from "./PeriodContext";

const PERIOD_PARAM = "period";
const PERIOD_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

// The selected month lives in the URL (?period=2026-07): it survives a reload,
// can be shared, and is never duplicated in React state. A missing or invalid
// value falls back to the default period.
function PeriodProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedPeriod = searchParams.get(PERIOD_PARAM);
    const hasPeriodInUrl = PERIOD_PATTERN.test(requestedPeriod ?? "");
    const period = hasPeriodInUrl ? requestedPeriod : getDefaultPeriod();

    const setPeriod = useCallback((nextPeriod) => {
        setSearchParams((params) => {
            const nextParams = new URLSearchParams(params);
            nextParams.set(PERIOD_PARAM, nextPeriod);
            return nextParams;
        });
    }, [setSearchParams]);

    const value = useMemo(() => ({
        period,
        setPeriod,
        goToPreviousPeriod: () => setPeriod(shiftPeriod(period, -1)),
        goToNextPeriod: () => setPeriod(shiftPeriod(period, 1)),
        // Keeps the selected period when navigating between private pages
        linkWithPeriod: (pathname) => ({
            pathname,
            search: hasPeriodInUrl ? `?${PERIOD_PARAM}=${period}` : "",
        }),
    }), [period, setPeriod, hasPeriodInUrl]);

    return <PeriodContext value={value}>{children}</PeriodContext>;
}

export default PeriodProvider;
