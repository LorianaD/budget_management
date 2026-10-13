// `type` is passed through untouched: its meaning is not defined by the backend yet
export const mapCategory = (dto) => ({
    id: dto.id,
    name: dto.name,
    type: dto.type,
});
