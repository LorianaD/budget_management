// A period is a month written "YYYY-MM" (e.g. "2026-07").
//
// Dates stay RFC 3339 strings ("2026-07-12T11:15:00+02:00") in the normalized
// models. Their first 10 characters are the calendar date in the offset the
// API used (Europe/Paris), so period checks read the string directly instead
// of converting through the browser's time zone.

export function toPeriod(year, month) {
    return `${year}-${String(month).padStart(2, "0")}`;
}

// "2026-07" -> { year: 2026, month: 7 } (Budget entity format: two integers)
export function getPeriodParts(period) {
    const [year, month] = period.split("-");
    return { year: Number(year), month: Number(month) };
}

export function getPeriodOf(isoDate) {
    return isoDate.slice(0, 7);
}

// "2026-07-12T11:15:00+02:00" -> 12
export function getDayOfMonth(isoDate) {
    return Number(isoDate.slice(8, 10));
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

    const today = getDayOfMonth(todayIso);
    return getDaysInPeriod(period) - today + 1;
}

// "2026-07-12T11:15:00+02:00" -> "2026-07-12" (calendar day, see the note above)
export function getIsoDay(isoDate) {
    return isoDate.slice(0, 10);
}

// Monday-to-Sunday week containing the given date: { start, end } as "YYYY-MM-DD"
export function getWeekBounds(isoDate) {
    const day = new Date(`${getIsoDay(isoDate)}T00:00:00Z`);
    const mondayOffset = (day.getUTCDay() + 6) % 7;
    const start = new Date(day);
    start.setUTCDate(day.getUTCDate() - mondayOffset);
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 6);
    return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}

// Sort comparator, most recent first
export function compareIsoDatesDesc(a, b) {
    return Date.parse(b) - Date.parse(a);
}
