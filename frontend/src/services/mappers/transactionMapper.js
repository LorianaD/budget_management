import { getTransactionDate } from "@/utils/financial";
import { toAmount, toDecimalString, toId, toRelation } from "./mapperUtils";

// One normalized model for incomes and expenses (type) whatever their status.
// date: the date the transaction belongs to (see getTransactionDate).
export const mapTransaction = (dto) => ({
    id: dto.id,
    label: dto.label,
    description: dto.description ?? null,
    amount: toAmount(dto.amount, "Transaction.amount"),
    type: dto.type,
    status: dto.status,
    plannedDate: dto.plannedDate ?? null,
    completedAt: dto.completedAt ?? null,
    cancelledAt: dto.cancelledAt ?? null,
    date: getTransactionDate(dto),
    categoryId: toId(dto.category),
});

// transaction = { label, description, amount, type, status, plannedDate, completedAt, cancelledAt, categoryId }
export const toTransactionPayload = (transaction) => ({
    label: transaction.label,
    description: transaction.description ?? null,
    amount: toDecimalString(transaction.amount),
    type: transaction.type,
    status: transaction.status,
    plannedDate: transaction.plannedDate ?? null,
    completedAt: transaction.completedAt ?? null,
    cancelledAt: transaction.cancelledAt ?? null,
    category: toRelation(transaction.categoryId),
});

// FUTURE EXTENSION — RecurringTransaction has no backend entity yet
export const mapRecurringTransaction = (dto) => ({
    id: dto.id,
    label: dto.label,
    amount: toAmount(dto.amount, "RecurringTransaction.amount"),
    frequency: dto.frequency,
    categoryId: toId(dto.category),
});
