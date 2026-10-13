import { AuthHeading, AuthPage, ProgressBar } from "@/components";
import { RegisterStepForm, RegisterSuccess } from "./sections";
import { useRegisterForm } from "./useRegisterForm";
import RegisterData from "./RegisterData";
import "./Register.css";

// Three-step registration followed by a confirmation screen (Figma 69:275). UI only.
function Register() {
    const page = RegisterData;
    const {
        step,
        stepNumber,
        stepCount,
        isLastStep,
        isComplete,
        form,
        submitStep,
        goBack,
        headingRef,
    } = useRegisterForm(page);

    if (isComplete) {
        return <RegisterSuccess success={page.success} headingRef={headingRef} />;
    }

    return (
        <AuthPage panel={step.panel}>
            <ProgressBar
                label={step.progressLabel}
                percentage={(stepNumber / stepCount) * 100}
                variant="steps"
            />

            <AuthHeading
                title={step.title}
                subtitle={step.subtitle}
                headingRef={headingRef}
                variant="step"
            />

            <RegisterStepForm
                step={step}
                form={form}
                isLastStep={isLastStep}
                onSubmit={submitStep}
                onBack={goBack}
            />
        </AuthPage>
    );
}

export default Register;
