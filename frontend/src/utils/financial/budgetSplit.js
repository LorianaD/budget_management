// Amount of each share of a fixed income split (e.g. 50/30/20), to the cent.
// allocations = [{ key, percentage, ... }]: every field is kept, amount is added.
export function getBudgetSplit(income, allocations) {
    return allocations.map((allocation) => ({
        ...allocation,
        amount: Math.round(income * allocation.percentage) / 100,
    }));
}
