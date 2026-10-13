// Public interface of the data layer: the ONLY module pages and hooks may
// import from src/services. It exposes business services returning normalized
// models; whether data comes from the mocks or Symfony is decided in ./config.
// api/, mocks/, mappers/, http/ and config/ are internal (enforced by ESLint).
export * from "./budgetService";
export * from "./categoryService";
export * from "./expenseService";
export * from "./incomeService";
export * from "./savingGoalService";
export * from "./userService";
export * from "./clock";
export { SERVICE_ERROR_CODES, ServiceError } from "./errors";
export { isMockMode } from "./config";
