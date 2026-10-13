import { incomes } from "@/data/private/mocks";
import { isInPeriod, toPeriod } from "@/utils/date";
import { mockRequest } from "../mockRequest";

// Same read signatures as incomeApi. Writes are not mocked: the demo never fakes a save.
export const getIncomes = ({ year, month }, options) =>
    mockRequest(() => incomes.filter((income) => isInPeriod(income.receivedAt, toPeriod(year, month))), options);

export const getIncome = (id, options) =>
    mockRequest(() => incomes.find((income) => income.id === id) ?? null, options);
