import { Badge } from "../Badge";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { TextLink } from "../TextLink";
import './Card.css';

// Generic data-driven card. Every block is optional:
// icon | initials, badge, description, list (bullets), tags, btn, link.
// tone: optional coloured left edge (green, blue, orange).
function Card({ item }) {
    const toneClass = item.tone ? `card--tone-${item.tone}` : "";

    return (
        <article id={item.id} className={`card card--${item.variant} ${toneClass}`}>
            <div className={`card-header card-header--${item.variant}`}>
                {item.icon && (
                    <Icon
                        src={item.icon.src}
                        alt={item.icon.alt}
                        className={item.icon.className}
                        variant={item.icon.variant}
                    />
                )}

                {item.initials && (
                    <span
                        className={`card-header__initials card-header__initials--${item.color ?? "blue"}`}
                        aria-hidden="true"
                    >
                        {item.initials}
                    </span>
                )}

                <div className="card-header__heading">
                    <h3 className="card-header__title">
                        {item.title}
                    </h3>

                    {item.badge && (
                        <Badge
                            label={item.badge.label}
                            variant={item.badge.variant}
                        />
                    )}
                </div>
            </div>

            {item.description && (
                <p className={`card-description`}>
                    {item.description}
                </p>
            )}

            {item.list && (
                <ul className="card__list">
                    {item.list.map((entry) => (
                        <li key={entry} className="card__list-item">{entry}</li>
                    ))}
                </ul>
            )}

            {item.tags && (
                <ul className="card__tags">
                    {item.tags.map((tag) => (
                        <li key={tag} className="card__tag">{tag}</li>
                    ))}
                </ul>
            )}

            {item.btn && (
                <Button
                    label={item.btn.label}
                    variant={item.btn.variant}
                    link={item.btn.link}
                    size={item.btn.size}
                    disabled={item.btn.disabled}
                    disabledReason={item.btn.disabledReason}
                    ariaLabel={`${item.btn.label} : ${item.title}`}
                />
            )}

            <TextLink link={item.link} context={item.title} />
        </article>
    )
}

export default Card;