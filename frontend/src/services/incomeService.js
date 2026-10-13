import { incomeApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
import { mapIncome, toIncomePayload } from "@/services/mappers";
import { incomeMock } from "@/services/mocks";
import { getPeriodParts } from "@/utils/date";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: incomeApi, mock: incomeMock });

// period: "2026-07"
export async function getIncomes(period, options) {
    const incomes = await source.getIncomes(getPeriodParts(period), options);
    return incomes.map(mapIncome);
}

export async function getIncome(id, options) {
    const income = await source.getIncome(id, options);
    return income ? mapIncome(income) : null;
}

// Writes always target the API and are refused in mock mode (see runWrite)
export async function createIncome(income, options) {
    return mapIncome(await runWrite(() => incomeApi.createIncome(toIncomePayload(income), options)));
}

export async function updateIncome(id, income, options) {
    return mapIncome(await runWrite(() => incomeApi.updateIncome(id, toIncomePayload(income), options)));
}

export function deleteIncome(id, options) {
    return runWrite(() => incomeApi.deleteIncome(id, options));
}
