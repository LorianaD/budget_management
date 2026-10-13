// FICTIONAL DEMO DATA — private area.
//
// Every record mirrors the JSON a Symfony controller would return for the
// existing entities (User, Category, Budget, Expense, Income, SavingGoal):
// - property names follow the entity getters (firstname, plannedAmount, spentAt...)
// - DECIMAL columns are strings ("82.00"), as serialized by Doctrine
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
export { expenses } from "./expenses";
export { incomes } from "./incomes";
export { savingGoals } from "./savingGoals";
export * from "./extensions";
