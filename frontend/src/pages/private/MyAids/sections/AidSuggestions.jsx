import { useId } from "react";
import { Badge, MaskIcon } from "@/components";
import MyAidsData from "../MyAidsData";

const texts = MyAidsData.suggested;

// Aids to check first (shared with the dashboard). Not an eligibility check:
// the badge shows the aid's domain. "Voir les détails" opens the aid below.
function AidSuggestions({ onShowAid, detailId }) {
    const titleId = useId();

    return (
        <section className="aid-suggestions" aria-labelledby={titleId}>
            <div className="aid-suggestions__header">
                <MaskIcon src={texts.icon} size={18} />
                <div>
                    <h2 id={titleId} className="aid-suggestions__title">{texts.title}</h2>
                    <p className="aid-suggestions__description">{texts.description}</p>
                </div>
            </div>

            <ul className="aid-suggestions__list">
                {texts.items.map((aid) => (
                    <li key={aid.key} className="aid-suggestions__item">
                        <h3 className="aid-suggestions__name">{aid.title}</h3>
                        <Badge label={aid.badge.label} variant={aid.badge.variant} />
                        <p className="aid-suggestions__text">{aid.description}</p>
                        <button
                            type="button"
                            className="aid-suggestions__link"
                            aria-controls={detailId}
                            aria-label={`${texts.detailsLabel} : ${aid.title}`}
                            onClick={() => onShowAid(aid.aidKey)}
                        >
                            {texts.detailsLabel}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default AidSuggestions;
