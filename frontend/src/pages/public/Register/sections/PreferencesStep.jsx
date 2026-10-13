import { Checkbox, Switch, TextLink } from "@/components";

function PreferencesStep({ step, form }) {
    const { values, handlers } = form;
    const { terms } = step;

    return (
        <>
            <div className="register__preferences">
                {step.preferences.map((preference) => (
                    <Switch
                        key={preference.name}
                        name={preference.name}
                        title={preference.title}
                        description={preference.description}
                        checked={values.preferences[preference.name]}
                        onChange={() => handlers.togglePreference(preference.name)}
                    />
                ))}
            </div>

            <div className="register__terms">
                <Checkbox
                    name="terms"
                    variant="compact"
                    required
                    checked={values.terms}
                    onChange={handlers.toggleTerms}
                >
                    {terms.before}
                    <TextLink link={terms.termsLink} />
                    {terms.between}
                    <TextLink link={terms.privacyLink} />
                    {terms.after}
                </Checkbox>
            </div>
        </>
    );
}

export default PreferencesStep;
