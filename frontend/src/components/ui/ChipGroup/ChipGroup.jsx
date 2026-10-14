import { useId } from 'react';
import './ChipGroup.css';

// Group of mutually exclusive toggle chips (e.g. "Aujourd'hui", "Cette semaine").
// Each chip is a button with aria-pressed; a disabled chip stays focusable
// and explains why through disabledReason (same pattern as Button).
// options = [{ value, label, disabled? }]
function ChipGroup({ label, options, value, onChange, disabledReason }) {
    const reasonId = useId();

    return (
        <div className="chip-group" role="group" aria-label={label}>
            {options.map((option) => {
                const isActive = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        className={`chip-group__chip ${isActive ? "chip-group__chip--active" : ""}`}
                        aria-pressed={isActive}
                        aria-disabled={option.disabled || undefined}
                        aria-describedby={option.disabled && disabledReason ? reasonId : undefined}
                        onClick={() => !option.disabled && onChange(option.value)}
                    >
                        {option.label}
                    </button>
                );
            })}

            {disabledReason && <span id={reasonId} className="visually-hidden">{disabledReason}</span>}
        </div>
    );
}

export default ChipGroup;
