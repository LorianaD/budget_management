import { TextLink } from '../TextLink';
import './ArticleCard.css';

// Carte de guide ou d'article : bandeau coloré avec la catégorie,
// titre, durée de lecture facultative et lien.
// item = { key, tone, category, title, duration?, link }
function ArticleCard({ item }) {
    return (
        <article className="article-card">
            <div className={`article-card__visual article-card__visual--${item.tone ?? "blue"}`}>
                <span className="article-card__category">{item.category}</span>
            </div>

            <div className="article-card__body">
                <h3 className="article-card__title">{item.title}</h3>

                <div className="article-card__footer">
                    {item.duration && (
                        <span className="article-card__duration">
                            <span className="visually-hidden">Temps de lecture : </span>
                            {item.duration}
                        </span>
                    )}

                    <TextLink link={item.link} context={item.title} />
                </div>
            </div>
        </article>
    );
}

export default ArticleCard;
