import { MaskIcon } from "@/components/ui";
import "./ActivityList.css";

// List of money movements: icon, label, meta line and amount.
// items: [{ key, icon, tone, label, meta, amount, amountTone? }], already
// formatted by the page (amount is a string, e.g. "+50 €").
// tone: icon colour (blue, green, orange); amountTone "positive" shows the
// amount in green.
function ActivityList({ items }) {
    return (
        <ul className="activity-list">
            {items.map((item) => (
                <li key={item.key} className="activity-list__item">
                    <span className={`activity-list__icon activity-list__icon--${item.tone}`}>
                        <MaskIcon src={item.icon} />
                    </span>
                    <p className="activity-list__text">
                        <span className="activity-list__label">{item.label}</span>
                        <span className="activity-list__meta">{item.meta}</span>
                    </p>
                    <p className={`activity-list__amount ${item.amountTone ? `activity-list__amount--${item.amountTone}` : ""}`}>
                        {item.amount}
                    </p>
                </li>
            ))}
        </ul>
    );
}

export default ActivityList;
