import { toAmount, toDecimalString, toId, toRelation } from "./mapperUtils";

export const mapExpense = (dto) => ({
    id: dto.id,
    label: dto.label,
    amount: toAmount(dto.amount, "Expense.amount"),
    spentAt: dto.spentAt,
    categoryId: toId(dto.category),
});

// expense = { label, amount, spentAt, categoryId }
export const toExpensePayload = (expense) => ({
    label: expense.label,
    amount: toDecimalString(expense.amount),
    spentAt: expense.spentAt,
    category: toRelation(expense.categoryId),
});

// FUTURE EXTENSION — RecurringTransaction has no backend entity yet
export const mapRecurringTransaction = (dto) => ({
    id: dto.id,
    label: dto.label,
    amount: toAmount(dto.amount, "RecurringTransaction.amount"),
    frequency: dto.frequency,
    categoryId: toId(dto.category),
});
