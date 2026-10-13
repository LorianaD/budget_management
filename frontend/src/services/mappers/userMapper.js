// Roles are left out: authorization is the backend's job
export const mapUser = (dto) => ({
    id: dto.id,
    email: dto.email,
    firstname: dto.firstname,
    lastname: dto.lastname,
    birthDate: dto.birthDate,
    job: dto.job,
});
