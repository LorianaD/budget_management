import { useId } from 'react';
import './SelectField.css';

// Native <select> styled as a filter chip. The label stays available to
// screen readers even when it is visually hidden (hideLabel).
// options = [{ value, label }]
function SelectField({ label, value, options, onChange, hideLabel = false }) {
    const selectId = useId();

    return (
        <div className="select-field">
            <label htmlFor={selectId} className={hideLabel ? "visually-hidden" : "select-field__label"}>
                {label}
            </label>
            <select
                id={selectId}
                className="select-field__input"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;
