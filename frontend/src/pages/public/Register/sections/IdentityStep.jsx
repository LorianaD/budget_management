import { FormField } from "@/components";

function IdentityStep({ step, form }) {
    const { values, errors, handlers } = form;

    const renderField = (field) => (
        <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handlers.change}
            error={errors[field.name]}
        />
    );

    return (
        <>
            <div className="register__name-row">
                {step.nameFields.map(renderField)}
            </div>

            {step.fields.map(renderField)}
        </>
    );
}

export default IdentityStep;
