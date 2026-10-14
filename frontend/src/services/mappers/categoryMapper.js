// type: "income" | "expense" (TransactionType). isSystem: provided by the app.
export const mapCategory = (dto) => ({
    id: dto.id,
    name: dto.name,
    code: dto.code,
    type: dto.type,
    isSystem: dto.isSystem,
    parentId: dto.parent?.id ?? null,
});
