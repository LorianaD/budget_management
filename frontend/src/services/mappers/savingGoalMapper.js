import { toAmount, toDecimalString, toId } from "./mapperUtils";

export const mapSavingGoal = (dto) => ({
    id: dto.id,
    title: dto.title,
    targetAmount: toAmount(dto.targetAmount, "SavingGoal.targetAmount"),
    currentAmount: toAmount(dto.currentAmount, "SavingGoal.currentAmount"),
    deadline: dto.deadline,
    createdAt: dto.createdAt,
});

// goal = { title, targetAmount, currentAmount, deadline }
export const toSavingGoalPayload = (goal) => ({
    title: goal.title,
    targetAmount: toDecimalString(goal.targetAmount),
    currentAmount: toDecimalString(goal.currentAmount),
    deadline: goal.deadline,
});

// FUTURE EXTENSION — SavingDeposit has no backend entity yet
export const mapSavingDeposit = (dto) => ({
    id: dto.id,
    amount: toAmount(dto.amount, "SavingDeposit.amount"),
    depositedAt: dto.depositedAt,
    savingGoalId: toId(dto.savingGoal),
});
