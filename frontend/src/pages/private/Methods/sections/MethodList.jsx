import { useId } from "react";
import { Badge, Button, MaskIcon } from "@/components";
import { methodAnchorOf } from "../methodsSelectors";
import MethodsData from "../MethodsData";

const texts = MethodsData.methods;

// "Toutes les méthodes": one card per method. "Découvrir" leads to the
// method's presentation, or is disabled when none exists yet.
function MethodList() {
    const titleId = useId();

    return (
        <section className="methods__section" aria-labelledby={titleId}>
            <h2 id={titleId} className="methods__section-title">{texts.title}</h2>

            <ul className="method-list">
                {texts.items.map((method) => (
                    <li key={method.key}>
                        <article id={methodAnchorOf(method.key)} className="method-card" tabIndex={-1}>
                            <div className="method-card__top">
                                <span className="method-card__icon">
                                    <MaskIcon src={method.icon} size={22} />
                                </span>
                                <Badge label={method.badge.label} variant={method.badge.variant} />
                            </div>

                            <h3 className="method-card__title">{method.title}</h3>
                            <p className="method-card__description">{method.description}</p>
                            <p className="method-card__highlight">{method.highlight}</p>

                            <div className="method-card__action">
                                <Button
                                    variant="outline"
                                    size="small"
                                    label={texts.discover}
                                    ariaLabel={`${texts.discover} : ${method.title}`}
                                    link={method.link}
                                    disabled={Boolean(method.disabledReason)}
                                    disabledReason={method.disabledReason}
                                />
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MethodList;
