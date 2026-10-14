import { transactionApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
import { mapRecurringTransaction, mapTransaction, toTransactionPayload } from "@/services/mappers";
import { transactionMock } from "@/services/mocks";
import { getPeriodParts } from "@/utils/date";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: transactionApi, mock: transactionMock });

// Incomes and expenses of a period ("2026-07"), every status included:
// callers keep the completed ones for real movements (see utils/financial).
export async function getTransactions(period, options) {
    const transactions = await source.getTransactions(getPeriodParts(period), options);
    return transactions.map(mapTransaction);
}

export async function getTransaction(id, options) {
    const transaction = await source.getTransaction(id, options);
    return transaction ? mapTransaction(transaction) : null;
}

// FUTURE EXTENSION — no backend entity: always read from the mocks, whatever the data source
export async function getRecurringTransactions(options) {
    const transactions = await transactionMock.getRecurringTransactions(options);
    return transactions.map(mapRecurringTransaction);
}

// Writes always target the API and are refused in mock mode (see runWrite)
export async function createTransaction(transaction, options) {
    return mapTransaction(await runWrite(() => transactionApi.createTransaction(toTransactionPayload(transaction), options)));
}

export async function updateTransaction(id, transaction, options) {
    return mapTransaction(await runWrite(() => transactionApi.updateTransaction(id, toTransactionPayload(transaction), options)));
}

export function deleteTransaction(id, options) {
    return runWrite(() => transactionApi.deleteTransaction(id, options));
}
