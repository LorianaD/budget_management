import { AppLink } from '../AppLink';
import './QuickLinks.css';

// Raccourcis sous forme de pastilles.
// Variante « default » : le premier lien est mis en avant.
// Variante « notice » : liens externes sur fond jaune (information importante).
function QuickLinks({ items = [], label, variant = "default" }) {
    if (items.length === 0) return null;

    return (
        <nav className={`quick-links quick-links--${variant}`} aria-label={label}>
            {items.map((item, index) => (
                <AppLink
                    key={item.key}
                    to={item.link}
                    className={`quick-links__link ${variant === "default" && index === 0 ? "quick-links__link--featured" : ""}`}
                >
                    {item.label}
                </AppLink>
            ))}
        </nav>
    );
}

export default QuickLinks;
