// Checks that native validation cannot express. Required fields, e-mail format
// and minimum length stay on the inputs themselves.
// Returns errors keyed by field name; an empty object means the step is valid.
export function validateRegisterStep(step, values) {
    const errors = {};

    if (step.id === "identity" && values.password !== values.passwordConfirm) {
        errors.passwordConfirm = step.passwordMismatch;
    }

    return errors;
}

// An error is cleared as soon as the user edits one of the fields it involves.
const RELATED_ERRORS = {
    password: ["passwordConfirm"],
};

export function clearFieldErrors(errors, fieldName) {
    const fieldsToClear = [fieldName, ...(RELATED_ERRORS[fieldName] ?? [])];

    if (!fieldsToClear.some((name) => errors[name])) {
        return errors;
    }

    const remaining = { ...errors };
    fieldsToClear.forEach((name) => delete remaining[name]);
    return remaining;
}
