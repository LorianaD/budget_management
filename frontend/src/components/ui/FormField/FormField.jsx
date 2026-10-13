import { useId, useState } from 'react';
import { chevronDown, eye } from '@/assets';
import './FormField.css';

// Form field with label, leading icon, hint and error message.
// field = { name, label, type, placeholder, icon, autoComplete, required,
//           minLength, hint, options }
// - options       -> native <select>
// - type "password" -> show / hide toggle
// value / onChange are optional: without them the field stays uncontrolled.
function FormField({ field, value, onChange, error }) {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isSelect = Boolean(field.options);
    const isPassword = field.type === "password";
    const inputType = isPassword && isPasswordVisible ? "text" : field.type ?? "text";

    // Screen readers read the hint, then the error, after the label
    const describedBy = [field.hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

    const controlProps = {
        id,
        name: field.name,
        required: field.required,
        autoComplete: field.autoComplete,
        "aria-describedby": describedBy,
        "aria-invalid": error ? "true" : undefined,
        ...(onChange && { value, onChange }),
    };

    return (
        <div className={`form-field ${error ? "form-field--error" : ""}`}>
            <label htmlFor={id} className="form-field__label">
                {field.label}
            </label>

            <div className="form-field__control">
                {field.icon && (
                    <img src={field.icon} alt="" className="form-field__icon" />
                )}

                {isSelect ? (
                    <>
                        <select
                            {...controlProps}
                            {...(!onChange && { defaultValue: "" })}
                            className={`form-field__input form-field__select ${
                                !value ? "form-field__select--empty" : ""
                            }`}
                        >
                            <option value="" disabled>
                                {field.placeholder}
                            </option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <img src={chevronDown} alt="" className="form-field__icon form-field__chevron" />
                    </>
                ) : (
                    <input
                        {...controlProps}
                        type={inputType}
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        className="form-field__input"
                    />
                )}

                {isPassword && (
                    <button
                        type="button"
                        className={`form-field__toggle ${
                            isPasswordVisible ? "form-field__toggle--active" : ""
                        }`}
                        aria-label={isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        aria-pressed={isPasswordVisible}
                        onClick={() => setIsPasswordVisible((visible) => !visible)}
                    >
                        <img src={eye} alt="" className="form-field__icon" />
                    </button>
                )}
            </div>

            {field.hint && (
                <p id={hintId} className="form-field__hint">
                    {field.hint}
                </p>
            )}

            {error && (
                <p id={errorId} className="form-field__error">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;
