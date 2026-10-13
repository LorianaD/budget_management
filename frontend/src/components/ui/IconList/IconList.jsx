import './IconList.css';

// Liste d'éléments précédés d'une icône en pastille.
// Variantes : chips (conseils rapides), documents, stacked (liste verticale),
// inline (bandeau horizontal avec séparateurs).
// items = [{ key, icon, tone?, title, description? }]
function IconList({ items = [], variant = "stacked" }) {
    return (
        <ul className={`icon-list icon-list--${variant}`}>
            {items.map((item) => (
                <li key={item.key} className="icon-list__item">
                    <span className={`icon-list__icon icon-list__icon--${item.tone ?? "blue"}`}>
                        <img src={item.icon} alt="" />
                    </span>

                    <div className="icon-list__content">
                        <p className="icon-list__title">{item.title}</p>
                        {item.description && (
                            <p className="icon-list__description">{item.description}</p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default IconList;
