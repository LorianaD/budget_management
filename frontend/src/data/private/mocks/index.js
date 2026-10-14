// FICTIONAL DEMO DATA — private area.
//
// Every record mirrors the JSON a Symfony controller would return for the
// entities committed in the backend (User, Category, Budget, BudgetAllocation,
// Transaction, SavingGoal):
// - property names follow the entity getters (firstname, plannedAmount, completedAt...)
// - DECIMAL columns are strings ("82.00"), as serialized by Doctrine
// - enums are their string values ("expense", "completed", "custom")
// - dates are RFC 3339 strings, as serialized by the Symfony Serializer
// - relations are exposed as { id } objects; collections are already scoped
//   to the authenticated user, so the `user` relation is omitted
//
// Features that do not exist in the backend yet live in ./extensions.
//
// Only src/services may import this module: components and hooks go through
// the services so the API can replace the mocks without touching them.
export { demoContext } from "./demoContext";
export { currentUser } from "./user";
export { categories } from "./categories";
export { budgets } from "./budgets";
export { budgetAllocations } from "./budgetAllocations";
export { transactions } from "./transactions";
export { savingGoals } from "./savingGoals";
export * from "./extensions";
