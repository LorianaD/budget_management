// FUTURE EXTENSIONS — FICTIONAL DATA.
// These structures have NO backend entity yet. They are proposals shaped like
// future Symfony entities so the demo can show the Figma features that need
// them. Do not mix them into the entity mocks.
//
// - savingDeposits: history of SavingGoal contributions. The backend only
//   increments SavingGoal.currentAmount (SavingGoalService::addMoney) and
//   keeps no history. Proposed entity: SavingDeposit (amount, depositedAt,
//   ManyToOne SavingGoal).
// - recurringTransactions: recurring expenses (rent, subscriptions...).
//   Proposed entity: RecurringTransaction (label, amount, frequency,
//   ManyToOne Category, ManyToOne User), generating planned Transactions.
export { savingDeposits } from "./savingDeposits";
export { recurringTransactions } from "./recurringTransactions";
