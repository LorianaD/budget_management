import { Badge } from '../Badge';
import './AuthVisual.css';

// Illustrated right-hand panel of the login and register pages.
// panel = {
//   variant: "blue" | "light" | "green",
//   layout?: "login" (larger illustration, bordered chips),
//   image, title, description?,
//   chips?: { icon, items: [{ key, label }] }    -> benefit chips
//   badges?: [{ key, label, variant }]           -> profile badges
//   checklist?: { icon, items: [{ key, label }] } -> vertical checklist
// }
// The illustration is decorative: the text carries the message.
function AuthVisual({ panel }) {
    const { variant = "blue", layout, image, title, description, chips, badges, checklist } = panel;
    const layoutClass = layout ? `auth-visual--${layout}` : "";

    return (
        <aside className={`auth-visual auth-visual--${variant} ${layoutClass}`}>
            <img src={image} alt="" className="auth-visual__image" />

            <div className="auth-visual__content">
                <div className="auth-visual__text">
                    <h2 className="auth-visual__title">{title}</h2>
                    {description && (
                        <p className="auth-visual__description">{description}</p>
                    )}
                </div>

                {chips && (
                    <ul className="auth-visual__chips">
                        {chips.items.map((chip) => (
                            <li key={chip.key} className="auth-visual__chip">
                                <span className="auth-visual__chip-icon">
                                    <img src={chips.icon} alt="" />
                                </span>
                                {chip.label}
                            </li>
                        ))}
                    </ul>
                )}

                {badges && (
                    <ul className="auth-visual__badges">
                        {badges.map((badge) => (
                            <li key={badge.key}>
                                <Badge label={badge.label} variant={badge.variant} />
                            </li>
                        ))}
                    </ul>
                )}

                {checklist && (
                    <ul className="auth-visual__checklist">
                        {checklist.items.map((item) => (
                            <li key={item.key} className="auth-visual__checklist-item">
                                <span className="auth-visual__checklist-icon">
                                    <img src={checklist.icon} alt="" />
                                </span>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
}

export default AuthVisual;
