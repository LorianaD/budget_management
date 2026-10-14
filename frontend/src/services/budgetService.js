import { budgetApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
import {
    mapBudget,
    mapBudgetAllocation,
    toBudgetAllocationPayload,
    toBudgetPayload,
} from "@/services/mappers";
import { budgetMock } from "@/services/mocks";
import { getPeriodParts } from "@/utils/date";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: budgetApi, mock: budgetMock });

// Budget of a period ("2026-07") with its allocations, or null when the user
// has no budget for that month (one budget per user and month).
// -> { id, year, month, period, method, allocations: [{ id, budgetId, categoryId, plannedAmount }] }
export async function getBudgetOfPeriod(period, options) {
    const [budget] = await source.getBudgets(getPeriodParts(period), options);
    if (!budget) return null;

    const allocations = await source.getBudgetAllocations(budget.id, options);
    return { ...mapBudget(budget), allocations: allocations.map(mapBudgetAllocation) };
}

// Writes always target the API and are refused in mock mode (see runWrite)
export async function createBudget(budget, options) {
    return mapBudget(await runWrite(() => budgetApi.createBudget(toBudgetPayload(budget), options)));
}

export async function updateBudget(id, budget, options) {
    return mapBudget(await runWrite(() => budgetApi.updateBudget(id, toBudgetPayload(budget), options)));
}

export function deleteBudget(id, options) {
    return runWrite(() => budgetApi.deleteBudget(id, options));
}

export async function createBudgetAllocation(allocation, options) {
    return mapBudgetAllocation(await runWrite(() => budgetApi.createBudgetAllocation(toBudgetAllocationPayload(allocation), options)));
}

export async function updateBudgetAllocation(id, allocation, options) {
    return mapBudgetAllocation(await runWrite(() => budgetApi.updateBudgetAllocation(id, toBudgetAllocationPayload(allocation), options)));
}

export function deleteBudgetAllocation(id, options) {
    return runWrite(() => budgetApi.deleteBudgetAllocation(id, options));
}
