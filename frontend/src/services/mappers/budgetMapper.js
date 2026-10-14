import { getPeriodParts, toPeriod } from "@/utils/date";
import { toAmount, toDecimalString, toId, toRelation } from "./mapperUtils";

// method: BudgetMethod value ("custom", "50_30_20", "zero_based", "envelope")
export const mapBudget = (dto) => ({
    id: dto.id,
    year: dto.year,
    month: dto.month,
    period: toPeriod(dto.year, dto.month),
    method: dto.method,
});

export const mapBudgetAllocation = (dto) => ({
    id: dto.id,
    budgetId: toId(dto.budget),
    categoryId: toId(dto.category),
    plannedAmount: toAmount(dto.plannedAmount, "BudgetAllocation.plannedAmount"),
});

// budget = { period, method }
export const toBudgetPayload = (budget) => ({
    ...getPeriodParts(budget.period),
    method: budget.method,
});

// allocation = { budgetId, categoryId, plannedAmount }
export const toBudgetAllocationPayload = (allocation) => ({
    plannedAmount: toDecimalString(allocation.plannedAmount),
    budget: toRelation(allocation.budgetId),
    category: toRelation(allocation.categoryId),
});
