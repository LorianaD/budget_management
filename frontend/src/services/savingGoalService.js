import { savingGoalApi } from "@/services/api";
import { runWrite, selectSource } from "@/services/config";
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

// FUTURE EXTENSION — no backend entity: always read from the mocks, whatever the data source
export async function getSavingDeposits(options) {
    const deposits = await savingGoalMock.getSavingDeposits(options);
    return deposits.map(mapSavingDeposit);
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
