import { AppLink } from '../AppLink';
import './TextLink.css';

// Text link ("En savoir plus", "Lire le guide", "Voir", "Mot de passe oublié ?").
// link = { url, label, variant, disabled, disabledReason }
// context: card title appended to the accessible name to tell apart
// links sharing the same label.
function TextLink({ link, context }) {
    if (!link) return null;

    const className = `link link--${link.variant || "default"}`;

    if (link.disabled) {
        return (
            <span className={`${className} link--disabled`}>
                {link.label}
                {link.disabledReason && (
                    <span className="visually-hidden"> ({link.disabledReason})</span>
                )}
            </span>
        );
    }

    if (!link.url) return null;

    return (
        <AppLink
            to={link.url}
            className={className}
            aria-label={context ? `${link.label} : ${context}` : undefined}
        >
            {link.label}
        </AppLink>
    );
}

export default TextLink;
