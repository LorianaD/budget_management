import './MaskIcon.css';

// Decorative icon tinted with the current text colour: the SVG is used as a
// CSS mask, so one file serves every state (e.g. grey link, white active link).
// The URL goes through a CSS custom property, like ProgressBar values.
function MaskIcon({ src, size = 20, className = "" }) {
    return (
        <span
            className={`mask-icon ${className}`}
            style={{ "--mask-icon-url": `url("${src}")`, "--mask-icon-size": `${size}px` }}
            aria-hidden="true"
        />
    );
}

export default MaskIcon;
