import './ProgressBar.css';

// The text carries the information; the bar itself is decorative.
// Dynamic values go through CSS custom properties rather than hard-coded styles.
function ProgressBar({ label, valueLabel, percentage, color = "var(--blue)", variant = "default" }) {
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div
            className={`progress-bar progress-bar--${variant}`}
            style={{
                "--progress-value": `${clampedPercentage}%`,
                "--progress-color": color,
            }}
        >
            <div className="progress-bar__header">
                <span className="progress-bar__label">{label}</span>
                <span className="progress-bar__value">{valueLabel}</span>
            </div>

            <div className="progress-bar__track" aria-hidden="true">
                <div className="progress-bar__fill" />
            </div>
        </div>
    );
}

export default ProgressBar;
