// Helpers shared by the resource mappers.
//
// Amount invariant: every amount in a normalized model is a number of euros
// holding WHOLE CENTS (82, 13.99, never 13.995). The financial utils sum in
// integer cents (Math.round(amount * 100)), which is exact for such values.
//
// DECIMAL strings are parsed digit by digit, never through floating point
// ("1.005" would become 1.00499... as a float). Income.amount is DECIMAL(10, 3):
// a non-zero third decimal cannot be represented, so it is rounded half away
// from zero to the cent AND reported with console.warn — never dropped silently.

const DECIMAL_PATTERN = /^(-?)(\d+)(?:\.(\d+))?$/;

function reportPrecisionLoss(field, value, rounded) {
    console.warn(`[mappers] ${field}: "${value}" has sub-cent precision, rounded to ${rounded}.`);
}

// "2150.000" -> 2150, "13.99" -> 13.99, "12.345" -> 12.35 (+ warning), null -> 0
export function toAmount(value, field = "amount") {
    if (value === null || value === undefined) return 0;

    const match = DECIMAL_PATTERN.exec(String(value));
    if (!match) {
        throw new TypeError(`[mappers] ${field}: "${value}" is not a decimal amount.`);
    }

    const [, sign, units, decimals = ""] = match;
    const extraDigits = decimals.slice(2);
    let cents = Number(units) * 100 + Number(decimals.slice(0, 2).padEnd(2, "0"));

    if (/[1-9]/.test(extraDigits)) {
        if (Number(extraDigits[0]) >= 5) cents += 1;
        reportPrecisionLoss(field, value, (sign ? -cents : cents) / 100);
    }

    return (sign ? -cents : cents) / 100;
}

// Model amount (whole cents) -> DECIMAL string expected by Doctrine
export const toDecimalString = (amount) => amount.toFixed(2);

// { id: 3 } -> 3
export const toId = (relation) => relation?.id ?? null;

// 3 -> { id: 3 }. Provisional: the payload format of relations is not defined
// by the backend yet (it may expect an IRI or a plain id).
export const toRelation = (id) => (id === null || id === undefined ? null : { id });
