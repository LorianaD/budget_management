import './TrustIndicators.css';

function TrustIndicators({ items = [], variant = "default" }) {
    if (items.length === 0) return null;

    return (
        <ul className={`trust-indicators trust-indicators--${variant}`}>
            {items.map((item) => (
                <li className="trust-indicators__item" key={item.label}>
                    <img
                        className="trust-indicators__icon"
                        src={item.icon}
                        alt=""
                    />
                    <span className="trust-indicators__label">
                        {item.label}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default TrustIndicators;
