// Rules of the Transaction model (backend enums TransactionType / TransactionStatus).
// Only COMPLETED transactions are real money movements: planned and cancelled
// ones are never added to incomes, expenses or balances.

export const TRANSACTION_TYPES = {
    INCOME: "income",
    EXPENSE: "expense",
};

export const TRANSACTION_STATUSES = {
    PLANNED: "planned",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
};

// Date a transaction belongs to (period filters, sorting):
// completed -> completedAt, planned -> plannedDate,
// cancelled -> the date it was planned for, or its cancellation date.
// Works on the API payload and on the normalized model (same field names).
export function getTransactionDate({ status, plannedDate, completedAt, cancelledAt }) {
    if (status === TRANSACTION_STATUSES.COMPLETED) return completedAt;
    if (status === TRANSACTION_STATUSES.CANCELLED) return plannedDate ?? cancelledAt;
    return plannedDate;
}

export const isCompleted = (transaction) => transaction.status === TRANSACTION_STATUSES.COMPLETED;

// Completed transactions, optionally of one type ("income" | "expense")
export function getCompletedTransactions(transactions, type) {
    return transactions.filter((transaction) => isCompleted(transaction) && (!type || transaction.type === type));
}

export const getCompletedExpenses = (transactions) => getCompletedTransactions(transactions, TRANSACTION_TYPES.EXPENSE);
export const getCompletedIncomes = (transactions) => getCompletedTransactions(transactions, TRANSACTION_TYPES.INCOME);

// Categories usable for one transaction type
export function getCategoriesOfType(categories, type) {
    return categories.filter((category) => category.type === type);
}
