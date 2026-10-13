import { budgetApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
import { mapBudget, toBudgetPayload } from "@/services/mappers";
import { budgetMock } from "@/services/mocks";
import { getPeriodParts } from "@/utils/date";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: budgetApi, mock: budgetMock });

// period: "2026-07"
export async function getBudgets(period, options) {
    const budgets = await source.getBudgets(getPeriodParts(period), options);
    return budgets.map(mapBudget);
}

export async function getBudget(id, options) {
    const budget = await source.getBudget(id, options);
    return budget ? mapBudget(budget) : null;
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
