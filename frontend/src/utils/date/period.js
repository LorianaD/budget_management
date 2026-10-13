// A period is a month written "YYYY-MM" (e.g. "2026-07").
//
// Dates stay RFC 3339 strings ("2026-07-12T11:15:00+02:00") in the normalized
// models. Their first 10 characters are the calendar date in the offset the
// API used (Europe/Paris), so period checks read the string directly instead
// of converting through the browser's time zone.

export function toPeriod(year, month) {
    return `${year}-${String(month).padStart(2, "0")}`;
}

// "2026-07" -> { year: 2026, month: "07" } (Budget entity format)
export function getPeriodParts(period) {
    const [year, month] = period.split("-");
    return { year: Number(year), month };
}

export function getPeriodOf(isoDate) {
    return isoDate.slice(0, 7);
}

export function isInPeriod(isoDate, period) {
    return getPeriodOf(isoDate) === period;
}

export function shiftPeriod(period, offset) {
    const { year, month } = getPeriodParts(period);
    const monthIndex = year * 12 + (Number(month) - 1) + offset;
    return toPeriod(Math.floor(monthIndex / 12), (monthIndex % 12) + 1);
}

// Chronological list of `count` periods ending with `lastPeriod`
export function getPeriodRange(lastPeriod, count) {
    return Array.from({ length: count }, (_, index) => shiftPeriod(lastPeriod, index - count + 1));
}

export function getDaysInPeriod(period) {
    const { year, month } = getPeriodParts(period);
    return new Date(Date.UTC(year, Number(month), 0)).getUTCDate();
}

// Days left in the period, today included: all of them for a future period,
// none for a past one.
export function getRemainingDaysInPeriod(period, todayIso) {
    const todayPeriod = getPeriodOf(todayIso);

    if (period < todayPeriod) return 0;
    if (period > todayPeriod) return getDaysInPeriod(period);

    const today = Number(todayIso.slice(8, 10));
    return getDaysInPeriod(period) - today + 1;
}

// Sort comparator, most recent first
export function compareIsoDatesDesc(a, b) {
    return Date.parse(b) - Date.parse(a);
}
