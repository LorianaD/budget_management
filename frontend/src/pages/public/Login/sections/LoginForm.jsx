import { useState } from "react";
import { Button, Checkbox, FormField, TextLink } from "@/components";

// UI-only form: native validation (required, e-mail format) runs first,
// then submission is blocked and the user is told nothing was sent.
function LoginForm({ form }) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <form className="auth-page__form" onSubmit={handleSubmit}>
            {form.fields.map((field) => (
                <FormField key={field.name} field={field} />
            ))}

            <div className="login__options">
                <Checkbox name={form.rememberMe.name} variant="compact">
                    {form.rememberMe.label}
                </Checkbox>

                <TextLink link={form.forgotPassword} />
            </div>

            <Button
                type="submit"
                variant="primary"
                label={form.submit.label}
                icon={form.submit.icon}
            />

            {/* Live region rendered up front so the notice is announced when it appears */}
            <div role="status">
                {isSubmitted && (
                    <p className="auth-page__notice">{form.unavailableNotice}</p>
                )}
            </div>
        </form>
    );
}

export default LoginForm;
