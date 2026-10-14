import { getRate, subtractAmounts, sumAmounts } from "./amounts";
import { getCompletedExpenses, getCompletedIncomes } from "./transactions";

// Key figures of one period. All collections must already be limited to that
// period; only completed transactions are counted (see ./transactions).
// - balance: incomes minus expenses ("Solde du mois")
// - remainingToLive: balance minus the money put aside in saving goals ("Reste à vivre")
export function getMonthlySummary({ transactions, savingDeposits }) {
    const incomes = getCompletedIncomes(transactions);
    const expenses = getCompletedExpenses(transactions);
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
