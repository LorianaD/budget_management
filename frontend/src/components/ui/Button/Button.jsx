import { useId } from 'react';
import { AppLink } from '../AppLink';
import './Button.css';

// ariaLabel: more specific accessible name when the visible label is generic
// (e.g. "En savoir plus" repeated on several cards).
//
// disabled: uses aria-disabled rather than the native `disabled` attribute,
// so the button stays focusable, is announced as unavailable
// and can explain why through disabledReason.
//
// ariaExpanded / ariaControls: disclosure buttons (button showing / hiding a block).
//
// icon: optional decorative icon, placed after the label
// (iconPosition="start" places it before).
function Button({ variant, label, type = "button", link, onClick, size = "default", disabled = false, disabledReason, ariaLabel, ariaExpanded, ariaControls, icon, iconPosition = "end" }) {
    const reasonId = useId();
    const className = `button button--${variant} button--${size}`;

    const iconElement = icon && <img src={icon} alt="" className="button__icon" />;
    const content = (
        <>
            {iconPosition === "start" && iconElement}
            {label}
            {iconPosition === "end" && iconElement}
        </>
    );

    if (disabled) {
        return (
            <>
                <button
                    className={`${className} button--disabled`}
                    type="button"
                    aria-disabled="true"
                    aria-label={ariaLabel}
                    aria-describedby={disabledReason ? reasonId : undefined}
                    title={disabledReason}
                    onClick={(event) => event.preventDefault()}
                >
                    {content}
                </button>

                {disabledReason && (
                    <span id={reasonId} className="visually-hidden">
                        {disabledReason}
                    </span>
                )}
            </>
        );
    }

    if (link) {
        return (
            <AppLink to={link} className={className} onClick={onClick} aria-label={ariaLabel}>
                {content}
            </AppLink>
        );
    }

    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
        >
            {content}
        </button>
    );
}

export default Button;