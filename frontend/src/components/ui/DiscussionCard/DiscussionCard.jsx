import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { TextLink } from '../TextLink';
import './DiscussionCard.css';

// Aperçu d'une discussion de la communauté.
// item = { key, category, aside, title, description?, author?, meta, link, variant? }
// aside : statut (« Populaire ») ou date (« Il y a 2 h »)
function DiscussionCard({ item }) {
    return (
        <article className={`discussion-card discussion-card--${item.variant ?? "default"}`}>
            <div className="discussion-card__header">
                <Badge label={item.category.label} variant={item.category.variant} />
                <span className="discussion-card__aside">{item.aside}</span>
            </div>

            <div className="discussion-card__body">
                <h3 className="discussion-card__title">{item.title}</h3>
                {item.description && (
                    <p className="discussion-card__description">{item.description}</p>
                )}
            </div>

            <div className="discussion-card__footer">
                <p className="discussion-card__meta">
                    {item.author && (
                        <>
                            <Avatar initials={item.author.initials} tone="light" size="small" />
                            <span className="discussion-card__author">{item.author.name}</span>
                            <span aria-hidden="true">•</span>
                        </>
                    )}
                    <span>{item.meta}</span>
                </p>

                <TextLink link={item.link} context={item.title} />
            </div>
        </article>
    );
}

export default DiscussionCard;
