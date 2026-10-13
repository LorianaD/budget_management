import { useId } from 'react';
import './Switch.css';

// Native checkbox with role="switch": announced as on / off
// and keyboard operable without extra code.
function Switch({ name, title, description, checked, onChange }) {
    const id = useId();
    const descriptionId = `${id}-description`;

    return (
        <div className="switch">
            <div className="switch__text">
                <label htmlFor={id} className="switch__title">
                    {title}
                </label>
                {description && (
                    <p id={descriptionId} className="switch__description">
                        {description}
                    </p>
                )}
            </div>

            <input
                id={id}
                type="checkbox"
                role="switch"
                name={name}
                checked={checked}
                onChange={onChange}
                aria-describedby={description ? descriptionId : undefined}
                className="switch__input"
            />
        </div>
    );
}

export default Switch;
