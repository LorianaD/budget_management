import { expenseApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
import { mapExpense, mapRecurringTransaction, toExpensePayload } from "@/services/mappers";
import { expenseMock } from "@/services/mocks";
import { getPeriodParts } from "@/utils/date";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: expenseApi, mock: expenseMock });

// period: "2026-07"
export async function getExpenses(period, options) {
    const expenses = await source.getExpenses(getPeriodParts(period), options);
    return expenses.map(mapExpense);
}

export async function getExpense(id, options) {
    const expense = await source.getExpense(id, options);
    return expense ? mapExpense(expense) : null;
}

// FUTURE EXTENSION — no backend entity: always read from the mocks, whatever the data source
export async function getRecurringTransactions(options) {
    const transactions = await expenseMock.getRecurringTransactions(options);
    return transactions.map(mapRecurringTransaction);
}

// Writes always target the API and are refused in mock mode (see runWrite)
export async function createExpense(expense, options) {
    return mapExpense(await runWrite(() => expenseApi.createExpense(toExpensePayload(expense), options)));
}

export async function updateExpense(id, expense, options) {
    return mapExpense(await runWrite(() => expenseApi.updateExpense(id, toExpensePayload(expense), options)));
}

export function deleteExpense(id, options) {
    return runWrite(() => expenseApi.deleteExpense(id, options));
}
