// Amounts are summed in cents to avoid floating point drift (0.1 + 0.2).
const toCents = (amount) => Math.round(amount * 100);
const fromCents = (cents) => cents / 100;

export function sumAmounts(items, getAmount = (item) => item.amount) {
    return fromCents(items.reduce((total, item) => total + toCents(getAmount(item)), 0));
}

export function subtractAmounts(amount, ...amountsToSubtract) {
    return fromCents(amountsToSubtract.reduce((total, value) => total - toCents(value), toCents(amount)));
}

// Ratio between 0 and n (1 = 100 %). A zero or negative total gives 0.
export function getRate(part, total) {
    return total > 0 ? part / total : 0;
}

export function toPercent(rate) {
    return Math.round(rate * 100);
}

// Relative change from the previous value, null when there is nothing to compare with
export function getVariationRate(current, previous) {
    return previous > 0 ? (current - previous) / previous : null;
}

// Amount available per remaining day, rounded down to the cent
export function getDailyAmount(amount, days) {
    return days > 0 ? Math.floor(toCents(amount) / days) / 100 : 0;
}

// Integer percentages that always add up to 100 (largest remainder method),
// so a chart legend never shows 99 % or 101 %.
export function distributePercentages(values) {
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total <= 0) return values.map(() => 0);

    const exact = values.map((value) => (value / total) * 100);
    const rounded = exact.map(Math.floor);
    let missing = 100 - rounded.reduce((sum, value) => sum + value, 0);

    exact
        .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
        .sort((a, b) => b.remainder - a.remainder)
        .forEach(({ index }) => {
            if (missing > 0) {
                rounded[index] += 1;
                missing -= 1;
            }
        });

    return rounded;
}
