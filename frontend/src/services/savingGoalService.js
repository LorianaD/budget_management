import { demoContext } from "@/data/private/mocks";
import { savingGoalApi } from "@/services/api";
import { isMockMode, runWrite, selectSource } from "@/services/config";
import { mapSavingDeposit, mapSavingGoal, toSavingGoalPayload } from "@/services/mappers";
import { savingGoalMock } from "@/services/mocks";

// Reads come from the mocks or Symfony depending on the configured data source
const source = selectSource({ api: savingGoalApi, mock: savingGoalMock });

export async function getSavingGoals(options) {
    const goals = await source.getSavingGoals(options);
    return goals.map(mapSavingGoal);
}

export async function getSavingGoal(id, options) {
    const goal = await source.getSavingGoal(id, options);
    return goal ? mapSavingGoal(goal) : null;
}

// FUTURE EXTENSION — the deposit history has no backend entity: it only exists
// with the demo data. With the API it is unavailable, so fictional deposits are
// never mixed with real goals.
export function isSavingHistoryAvailable() {
    return isMockMode;
}

// Deposits of every goal, or null when the history is unavailable (API mode)
export async function getSavingDeposits(options) {
    if (!isSavingHistoryAvailable()) return null;

    const deposits = await savingGoalMock.getSavingDeposits(options);
    return deposits.map(mapSavingDeposit);
}

// Id of the goal used as the safety fund, or null when none is identified.
// Demo configuration only: the backend has no way to flag this goal yet,
// so the API mode returns null until Symfony provides one.
export function getSafetyFundGoalId() {
    return isMockMode ? demoContext.safetyFundGoalId : null;
}

// Writes always target the API and are refused in mock mode (see runWrite)
export async function createSavingGoal(goal, options) {
    return mapSavingGoal(await runWrite(() => savingGoalApi.createSavingGoal(toSavingGoalPayload(goal), options)));
}

export async function updateSavingGoal(id, goal, options) {
    return mapSavingGoal(await runWrite(() => savingGoalApi.updateSavingGoal(id, toSavingGoalPayload(goal), options)));
}

export function deleteSavingGoal(id, options) {
    return runWrite(() => savingGoalApi.deleteSavingGoal(id, options));
}
