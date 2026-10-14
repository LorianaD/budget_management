// API payload <-> normalized model, one file per resource.
// The only place aware of the JSON contract: if the Symfony serialization
// differs (IRIs, nested objects, field names), only these files change.
// Internal to src/services: pages and hooks use @/services.
export * from "./mapperUtils";
export * from "./budgetMapper";
export * from "./categoryMapper";
export * from "./savingGoalMapper";
export * from "./transactionMapper";
export * from "./userMapper";
