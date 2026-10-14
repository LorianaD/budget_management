import { useAsyncResource } from "@/hooks";
import { getRecurringTransactions, getSavingDeposits, getSavingGoals } from "@/services";

// Goals reflect their current state: no period. savingDeposits is null when
// the deposit history is unavailable (API mode). The recurring transactions
// give the safety fund recommendation.
async function loadSavingGoalsData(options) {
    const [savingGoals, savingDeposits, recurringTransactions] = await Promise.all([
        getSavingGoals(options),
        getSavingDeposits(options),
        getRecurringTransactions(options),
    ]);

    return { savingGoals, savingDeposits, recurringTransactions };
}

// Saving goals page data. Loading only: every computation lives in savingGoalsSelectors.js.
function useSavingGoalsData() {
    return useAsyncResource("saving-goals", loadSavingGoalsData);
}

export default useSavingGoalsData;
