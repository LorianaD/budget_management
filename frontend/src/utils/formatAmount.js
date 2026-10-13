// Intl uses a narrow no-break space (U+202F) as French thousands separator,
// almost invisible with the Geist font: it is replaced by a regular
// no-break space (U+00A0), which also keeps "2 150 €" on one line.
const NO_BREAK_SPACE = String.fromCharCode(0x00a0);
const NARROW_NO_BREAK_SPACE = new RegExp(String.fromCharCode(0x202f), "g");

// useGrouping "always": otherwise French does not group 4-digit numbers
// ("2150") while the mockups show "2 150".
const numberFormatter = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
    useGrouping: "always",
});

const preciseFormatter = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
});

const withNoBreakSpaces = (text) => text.replace(NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE);

// 2150 -> "2 150"
export function formatNumber(value) {
    return withNoBreakSpaces(numberFormatter.format(value));
}

// Whole euros: 2150 -> "2 150 EUR" (public pages) or "2 150 €" with currency "€"
function formatAmount(value, currency = "EUR") {
    return `${formatNumber(value)}${NO_BREAK_SPACE}${currency}`;
}

// Keeps the cents when there are any: 13.99 -> "13,99 €", 32 -> "32 €"
export function formatPreciseAmount(value, currency = "€") {
    const text = Number.isInteger(value) ? formatNumber(value) : withNoBreakSpaces(preciseFormatter.format(value));
    return `${text}${NO_BREAK_SPACE}${currency}`;
}

// Ratio -> percentage: 0.9 -> "90 %"
export function formatPercent(rate) {
    return `${Math.round(rate * 100)}${NO_BREAK_SPACE}%`;
}

export default formatAmount;
