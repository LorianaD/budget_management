import { recurringTransactions, transactions } from "@/data/private/mocks";
import { isInPeriod, toPeriod } from "@/utils/date";
import { getTransactionDate } from "@/utils/financial";
import { mockRequest } from "../mockRequest";

// Same read signatures as transactionApi. Writes are not mocked: the demo never fakes a save.
// A period returns its transactions of every status (see getTransactionDate).
export const getTransactions = ({ year, month }, options) =>
    mockRequest(() => transactions.filter((transaction) => isInPeriod(getTransactionDate(transaction), toPeriod(year, month))), options);

export const getTransaction = (id, options) =>
    mockRequest(() => transactions.find((transaction) => transaction.id === id) ?? null, options);

// FUTURE EXTENSION — no entity nor route in the backend
export const getRecurringTransactions = (options) =>
    mockRequest(() => recurringTransactions, options);
