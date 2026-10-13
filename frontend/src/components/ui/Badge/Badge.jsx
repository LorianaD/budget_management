import './Badge.css';

function Badge({ label, variant = "info" }) {
    return (
        <span className={`badge badge--${variant}`}>
            {label}
        </span>
    );
}

export default Badge;
