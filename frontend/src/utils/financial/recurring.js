import { sumAmounts } from "./amounts";

// Number of occurrences per month of each supported frequency
const MONTHLY_FACTORS = {
    monthly: 1,
    yearly: 1 / 12,
};

// Monthly cost of the recurring transactions (fixed charges): a yearly
// charge counts for a twelfth, rounded to the cent. Unknown frequencies are ignored.
export function getMonthlyRecurringAmount(transactions) {
    return sumAmounts(
        transactions.filter((transaction) => transaction.frequency in MONTHLY_FACTORS),
        (transaction) => Math.round(transaction.amount * 100 * MONTHLY_FACTORS[transaction.frequency]) / 100,
    );
}
