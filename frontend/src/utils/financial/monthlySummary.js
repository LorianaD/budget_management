import { getRate, subtractAmounts, sumAmounts } from "./amounts";

// Key figures of one period. All collections must already be limited to that period.
// - balance: incomes minus expenses ("Solde actuel")
// - remainingToLive: balance minus the money put aside in saving goals ("Reste à vivre")
export function getMonthlySummary({ incomes, expenses, savingDeposits }) {
    const totalIncome = sumAmounts(incomes);
    const totalExpenses = sumAmounts(expenses);
    const totalSavings = sumAmounts(savingDeposits);

    return {
        totalIncome,
        totalExpenses,
        totalSavings,
        balance: subtractAmounts(totalIncome, totalExpenses),
        remainingToLive: subtractAmounts(totalIncome, totalExpenses, totalSavings),
        savingsRate: getRate(totalSavings, totalIncome),
        transactionCount: incomes.length + expenses.length,
    };
}
