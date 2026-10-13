import './StatList.css';

// Liste de chiffres clés. <dl> associe chaque libellé (dt) à sa valeur (dd)
// pour les lecteurs d'écran ; l'ordre visuel est réglé en CSS selon la variante.
// note : mention affichée sous les chiffres (ex. « Chiffres fictifs… »).
function StatList({ items = [], variant = "default", note }) {
    if (items.length === 0) return null;

    const list = (
        <dl className={`stat-list stat-list--${variant}`}>
            {items.map((item) => (
                <div
                    className={`stat-list__item ${item.color ? `stat-list__item--${item.color}` : ""}`}
                    key={item.key}
                >
                    <dt className="stat-list__label">{item.label}</dt>
                    <dd className="stat-list__value">{item.value}</dd>
                </div>
            ))}
        </dl>
    );

    if (!note) return list;

    return (
        <div className={`stat-list-block stat-list-block--${variant}`}>
            {list}
            <p className="stat-list__note">{note}</p>
        </div>
    );
}

export default StatList;
