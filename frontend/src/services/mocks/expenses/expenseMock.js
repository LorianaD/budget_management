import { expenses, recurringTransactions } from "@/data/private/mocks";
import { isInPeriod, toPeriod } from "@/utils/date";
import { mockRequest } from "../mockRequest";

// Same read signatures as expenseApi. Writes are not mocked: the demo never fakes a save.
export const getExpenses = ({ year, month }, options) =>
    mockRequest(() => expenses.filter((expense) => isInPeriod(expense.spentAt, toPeriod(year, month))), options);

export const getExpense = (id, options) =>
    mockRequest(() => expenses.find((expense) => expense.id === id) ?? null, options);

// FUTURE EXTENSION — no entity nor route in the backend
export const getRecurringTransactions = (options) =>
    mockRequest(() => recurringTransactions, options);
