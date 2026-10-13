import { budgets } from "@/data/private/mocks";
import { mockRequest } from "../mockRequest";

// Same read signatures as budgetApi. Writes are not mocked: the demo never fakes a save.
export const getBudgets = ({ year, month }, options) =>
    mockRequest(() => budgets.filter((budget) => budget.year === year && budget.month === month), options);

export const getBudget = (id, options) =>
    mockRequest(() => budgets.find((budget) => budget.id === id) ?? null, options);
