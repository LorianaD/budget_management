import { useId } from 'react';
import './Checkbox.css';

// Restyled native checkbox: keeps keyboard support (Space) and the
// checked / unchecked announcement of screen readers.
// children: label content, may include links (e.g. terms of use).
// variant: "default" (20px, grey border) or "compact" (18px, blue border).
function Checkbox({ name, value, checked, onChange, required, variant = "default", children }) {
    const id = useId();

    return (
        <div className={`checkbox checkbox--${variant}`}>
            <input
                id={id}
                type="checkbox"
                name={name}
                value={value}
                required={required}
                className="checkbox__input"
                {...(onChange && { checked, onChange })}
            />

            <label htmlFor={id} className="checkbox__label">
                {children}
            </label>
        </div>
    );
}

export default Checkbox;
