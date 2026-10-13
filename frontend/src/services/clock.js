import { demoContext } from "@/data/private/mocks";
import { isMockMode } from "@/services/config";
import { getPeriodOf } from "@/utils/date";

// Paris wall-clock time as "YYYY-MM-DDTHH:mm:ss", so the date part matches
// the period helpers (src/utils/date) whatever the visitor's time zone.
const parisDateTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
});

// Single source of "now" for the private area: frozen on the demo reference
// date with mock data, the real current time with the API.
export function getToday() {
    return isMockMode ? demoContext.referenceDate : parisDateTime.format(new Date()).replace(" ", "T");
}

export function getDefaultPeriod() {
    return isMockMode ? demoContext.referencePeriod : getPeriodOf(getToday());
}
