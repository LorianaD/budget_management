import { use } from "react";
import { PeriodContext } from "./PeriodContext";

function usePeriod() {
    const context = use(PeriodContext);

    if (!context) {
        throw new Error("usePeriod must be used inside <PeriodProvider> (private layout).");
    }

    return context;
}

export default usePeriod;
