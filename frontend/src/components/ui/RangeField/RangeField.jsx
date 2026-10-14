import { useId } from "react";
import "./RangeField.css";

// Slider with its label, the current value (<output>) and an optional note.
// formatValue turns the number into the displayed / announced text.
// variant "plain": label in sentence case (private area).
function RangeField({ label, value, min, max, step, formatValue = String, onChange, note, variant = "default" }) {
    const inputId = useId();
    const formattedValue = formatValue(value);
    const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;

    return (
        <div className={`range-field range-field--${variant}`}>
            <label htmlFor={inputId} className="range-field__label">
                {label}
            </label>

            <output htmlFor={inputId} className="range-field__value">
                {formattedValue}
            </output>

            <input
                id={inputId}
                className="range-field__input"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                aria-valuetext={formattedValue}
                onChange={(event) => onChange(Number(event.target.value))}
                style={{ "--range-progress": `${progress}%` }}
            />

            {note && <p className="range-field__note">{note}</p>}
        </div>
    );
}

export default RangeField;
