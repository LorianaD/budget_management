import { Checkbox, FormField } from "@/components";

function SituationStep({ step, form }) {
    const { values, handlers } = form;
    const { objectives } = step;

    return (
        <>
            {step.fields.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    onChange={handlers.change}
                />
            ))}

            {/* fieldset + legend: the checkboxes are announced as one group */}
            <fieldset className="register__fieldset">
                <legend className="register__legend">{objectives.legend}</legend>

                <div className="register__options">
                    {objectives.options.map((option) => (
                        <Checkbox
                            key={option.value}
                            name="objectives"
                            value={option.value}
                            checked={values.objectives.includes(option.value)}
                            onChange={() => handlers.toggleObjective(option.value)}
                        >
                            {option.label}
                        </Checkbox>
                    ))}
                </div>

                <p className="register__hint">{objectives.hint}</p>
            </fieldset>
        </>
    );
}

export default SituationStep;
