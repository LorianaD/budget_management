import { getPeriodParts, toPeriod } from "@/utils/date";
import { toAmount, toDecimalString, toId, toRelation } from "./mapperUtils";

export const mapBudget = (dto) => ({
    id: dto.id,
    month: dto.month,
    year: dto.year,
    period: toPeriod(dto.year, dto.month),
    plannedAmount: toAmount(dto.plannedAmount, "Budget.plannedAmount"),
    categoryId: toId(dto.category),
});

// budget = { period, plannedAmount, categoryId }
export const toBudgetPayload = (budget) => ({
    ...getPeriodParts(budget.period),
    plannedAmount: toDecimalString(budget.plannedAmount),
    category: toRelation(budget.categoryId),
});
