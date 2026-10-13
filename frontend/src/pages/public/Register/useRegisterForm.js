import { useEffect, useRef, useState } from "react";
import { clearFieldErrors, validateRegisterStep } from "./validateRegisterStep";

// State of the multi-step register form. UI only: values stay in memory, nothing is sent.
//
// Returns:
// - navigation: current step, progress, completion
// - form: { values, errors, handlers } passed to the step components
// - submitStep / goBack: actions of the step form
// - headingRef: attached to the step title, focused on every step change
export function useRegisterForm({ steps, initialValues }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const headingRef = useRef(null);
    const isFirstRender = useRef(true);

    // Move focus to the new title so screen readers announce the step
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        window.scrollTo({ top: 0 });
        headingRef.current?.focus();
    }, [stepIndex]);

    const handlers = {
        change: (event) => {
            const { name, value } = event.target;
            setValues((current) => ({ ...current, [name]: value }));
            setErrors((current) => clearFieldErrors(current, name));
        },

        toggleObjective: (objective) => {
            setValues((current) => ({
                ...current,
                objectives: current.objectives.includes(objective)
                    ? current.objectives.filter((item) => item !== objective)
                    : [...current.objectives, objective],
            }));
        },

        togglePreference: (name) => {
            setValues((current) => ({
                ...current,
                preferences: { ...current.preferences, [name]: !current.preferences[name] },
            }));
        },

        toggleTerms: () => {
            setValues((current) => ({ ...current, terms: !current.terms }));
        },
    };

    const step = steps[stepIndex];

    const submitStep = () => {
        const stepErrors = validateRegisterStep(step, values);
        setErrors(stepErrors);

        if (Object.keys(stepErrors).length === 0) {
            setStepIndex((current) => current + 1);
        }
    };

    const goBack = () => {
        setStepIndex((current) => current - 1);
    };

    return {
        step,
        stepNumber: stepIndex + 1,
        stepCount: steps.length,
        isLastStep: stepIndex === steps.length - 1,
        isComplete: stepIndex === steps.length,
        form: { values, errors, handlers },
        submitStep,
        goBack,
        headingRef,
    };
}
