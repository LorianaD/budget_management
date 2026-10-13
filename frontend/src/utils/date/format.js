import { getPeriodOf, getPeriodParts } from "./period";

// Displayed dates always use the French locale and the Paris time zone,
// whatever the visitor's settings.
const LOCALE = "fr-FR";
const TIME_ZONE = "Europe/Paris";

const shortDateFormatter = new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
});

const longDateFormatter = new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
});

const monthYearFormatter = new Intl.DateTimeFormat(LOCALE, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
});

const relativeFormatter = new Intl.RelativeTimeFormat(LOCALE, {
    numeric: "auto",
    style: "short",
});

// Chart axis labels as written in the mockups
const SHORT_MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// "12/07/2026"
export function formatDate(isoDate) {
    return shortDateFormatter.format(new Date(isoDate));
}

// "12 juillet 2026"
export function formatLongDate(isoDate) {
    return longDateFormatter.format(new Date(isoDate));
}

// "09:15"
export function formatTime(isoDate) {
    return timeFormatter.format(new Date(isoDate));
}

// "09h15", the French way of writing a time in a sentence
export function formatHour(isoDate) {
    return formatTime(isoDate).replace(":", "h");
}

// "2026-07" -> "Juillet 2026"
export function formatPeriod(period) {
    const { year, month } = getPeriodParts(period);
    return capitalize(monthYearFormatter.format(new Date(Date.UTC(year, Number(month) - 1, 1))));
}

// Deadline "2026-12-31T00:00:00+01:00" -> "Décembre 2026"
export function formatMonthYear(isoDate) {
    return formatPeriod(getPeriodOf(isoDate));
}

// "2026-07" -> "Juil"
export function formatShortMonth(period) {
    return SHORT_MONTHS[Number(getPeriodParts(period).month) - 1];
}

// "Il y a 2 h", "Hier", "Il y a 3 jours", relative to the given reference date
export function formatRelativeTime(isoDate, referenceIso) {
    const elapsedMinutes = Math.round((Date.parse(referenceIso) - Date.parse(isoDate)) / 60000);

    if (elapsedMinutes < 60) {
        return capitalize(relativeFormatter.format(-Math.max(elapsedMinutes, 0), "minute"));
    }

    const elapsedHours = Math.round(elapsedMinutes / 60);
    if (elapsedHours < 24) {
        return capitalize(relativeFormatter.format(-elapsedHours, "hour"));
    }

    return capitalize(relativeFormatter.format(-Math.round(elapsedHours / 24), "day"));
}
