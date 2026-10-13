import { savingDeposits, savingGoals } from "@/data/private/mocks";
import { mockRequest } from "../mockRequest";

// Same read signatures as savingGoalApi. Writes are not mocked: the demo never fakes a save.
export const getSavingGoals = (options) =>
    mockRequest(() => savingGoals, options);

export const getSavingGoal = (id, options) =>
    mockRequest(() => savingGoals.find((goal) => goal.id === id) ?? null, options);

// FUTURE EXTENSION — deposits are not stored by the backend
export const getSavingDeposits = (options) =>
    mockRequest(() => savingDeposits, options);
