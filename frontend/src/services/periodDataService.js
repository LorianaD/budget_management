import { shiftPeriod } from "@/utils/date";
import { getBudgetOfPeriod } from "./budgetService";
import { getCategories } from "./categoryService";
import { getSavingDeposits, getSavingGoals } from "./savingGoalService";
import { getRecurringTransactions, getTransactions } from "./transactionService";

const NO_DATA = Promise.resolve(undefined);

// Loads, in parallel, the data of one period shared by the private pages:
// categories, budget allocations and transactions (every status), plus the
// optional extras a page asks for:
// - previous: transactions of the previous period (comparisons)
// - savings: saving goals and deposits
// - recurring: recurring transactions (future extension)
// Loading only: computations stay in the page selectors and utils/financial.
export async function loadPeriodData(period, { previous = false, savings = false, recurring = false } = {}, options) {
    const previousPeriod = shiftPeriod(period, -1);

    const [categories, budget, transactions, previousTransactions, savingGoals, savingDeposits, recurringTransactions] =
        await Promise.all([
            getCategories(options),
            getBudgetOfPeriod(period, options),
            getTransactions(period, options),
            previous ? getTransactions(previousPeriod, options) : NO_DATA,
            savings ? getSavingGoals(options) : NO_DATA,
            savings ? getSavingDeposits(options) : NO_DATA,
            recurring ? getRecurringTransactions(options) : NO_DATA,
        ]);

    return {
        period,
        categories,
        // No budget for the month: no allocation
        allocations: budget?.allocations ?? [],
        transactions,
        ...(previous && { previousPeriod, previousTransactions }),
        // Unavailable deposit history (API mode, null): counted as no deposit.
        // TODO: explicit "unavailable" state on the dashboard and budget pages.
        ...(savings && { savingGoals, savingDeposits: savingDeposits ?? [] }),
        ...(recurring && { recurringTransactions }),
    };
}
