import { MaskIcon } from '../MaskIcon';
import './StatList.css';

// List of key figures. <dl> ties each label (dt) to its value (dd) for screen
// readers; the visual order is set in CSS per variant.
// note: line displayed under the figures (e.g. "Chiffres fictifs…").
//
// "cards" variant (private area KPIs), optional per item:
// icon + iconTone (decorative badge), valueTone, detail + detailTone (trend line).
function StatList({ items = [], variant = "default", note }) {
    if (items.length === 0) return null;

    const list = (
        <dl className={`stat-list stat-list--${variant}`}>
            {items.map((item) => (
                <div
                    className={`stat-list__item ${item.color ? `stat-list__item--${item.color}` : ""}`}
                    key={item.key}
                >
                    <dt className="stat-list__label">
                        {item.label}
                        {item.icon && (
                            <span className={`stat-list__icon stat-list__icon--${item.iconTone ?? "blue"}`}>
                                <MaskIcon src={item.icon} />
                            </span>
                        )}
                    </dt>
                    <dd className={`stat-list__value ${item.valueTone ? `stat-list__value--${item.valueTone}` : ""}`}>
                        {item.value}
                    </dd>
                    {item.detail && (
                        <dd className={`stat-list__detail stat-list__detail--${item.detailTone ?? "neutral"}`}>
                            {item.detail}
                        </dd>
                    )}
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
