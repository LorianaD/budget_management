// FICTIONAL — Category entity.
// Categories are global in the backend (no user relation).
// `type` is a free string in the entity and its meaning is not defined yet
// (it must support several budget methods, not only 50/30/20): every mock
// category uses the neutral value "expense" until the backend decides.
export const categories = [
    { id: 1, name: "Logement", type: "expense" },
    { id: 2, name: "Alimentation", type: "expense" },
    { id: 3, name: "Transport", type: "expense" },
    { id: 4, name: "Loisirs", type: "expense" },
    { id: 5, name: "Santé", type: "expense" },
    { id: 6, name: "Formation", type: "expense" },
];
