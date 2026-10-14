import { useEffect, useRef } from "react";
import { AppLink, MaskIcon } from "@/components";
import MyAidsData from "../MyAidsData";

const texts = MyAidsData.detail;

// Detail of the selected aid: description, simplified conditions and links to
// the official website and simulator. No amount is given (Figma shows
// unverified figures). When the user asks for an aid (focusRequest grows),
// the panel takes the focus so keyboard and screen reader users follow.
function AidDetail({ detail, id, focusRequest }) {
    const titleRef = useRef(null);

    useEffect(() => {
        if (focusRequest === 0) return;
        titleRef.current?.focus();
    }, [focusRequest]);

    if (!detail) return null;

    const { aid, organization } = detail;

    return (
        <section id={id} className="aid-detail" aria-labelledby={`${id}-title`}>
            <div className="aid-detail__main">
                <p className="aid-detail__breadcrumb">{texts.breadcrumb(organization.name, aid.name)}</p>
                <h2 id={`${id}-title`} ref={titleRef} tabIndex={-1} className="aid-detail__title">{aid.name}</h2>
                <p className="aid-detail__description">{aid.description}</p>

                <div className="aid-detail__conditions">
                    <h3 className="aid-detail__subtitle">{texts.conditionsTitle}</h3>
                    <ul className="aid-detail__list">
                        {aid.conditions.map((condition) => (
                            <li key={condition} className="aid-detail__condition">
                                <MaskIcon src={texts.checkIcon} size={16} />
                                {condition}
                            </li>
                        ))}
                    </ul>
                    <p className="aid-detail__note">{texts.conditionsNote}</p>
                </div>

                <AppLink
                    to={organization.url}
                    className="button button--primary button--small aid-detail__official"
                    aria-label={texts.officialLink.ariaLabel(organization.name)}
                >
                    {texts.officialLink.label}
                    <MaskIcon src={texts.officialLink.icon} size={14} />
                </AppLink>
            </div>

            <aside className="aid-detail__amount">
                <p className="aid-detail__amount-title">{texts.amount.title}</p>
                <p className="aid-detail__amount-text">{texts.amount.text}</p>
                <AppLink to={texts.amount.link.url} className="aid-detail__simulator">
                    {texts.amount.link.label}
                    <span className="visually-hidden"> {texts.amount.link.newTab}</span>
                </AppLink>
            </aside>
        </section>
    );
}

export default AidDetail;
