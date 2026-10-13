import { AuthReassurance, Button } from "@/components";
import IdentityStep from "./IdentityStep";
import SituationStep from "./SituationStep";
import PreferencesStep from "./PreferencesStep";

// Maps RegisterData step ids to their fields
const STEP_FIELDS = {
    identity: IdentityStep,
    situation: SituationStep,
    preferences: PreferencesStep,
};

// Form wrapper shared by the three steps: fields, back / submit actions, footer note.
// Native validation runs before onSubmit is called.
function RegisterStepForm({ step, form, isLastStep, onSubmit, onBack }) {
    const StepFields = STEP_FIELDS[step.id];

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form className="auth-page__form" onSubmit={handleSubmit}>
            <div className="register__fields">
                <StepFields step={step} form={form} />
            </div>

            <div className="register__actions">
                {step.back && (
                    <Button variant="outline-neutral" label={step.back.label} onClick={onBack} />
                )}

                <Button
                    type="submit"
                    variant={isLastStep ? "success" : "primary"}
                    label={step.submit.label}
                    icon={step.submit.icon}
                    iconPosition={isLastStep ? "start" : "end"}
                />
            </div>

            {step.reassurance && (
                <AuthReassurance icon={step.reassurance.icon} text={step.reassurance.text} />
            )}

            {step.note && <p className="register__note">{step.note}</p>}
        </form>
    );
}

export default RegisterStepForm;
