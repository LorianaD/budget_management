import { useId } from "react";
import { Button, MaskIcon } from "@/components";
import MethodsData from "../MethodsData";

const { advice, cta } = MethodsData;

// End of the page: general advice and call to action
function MethodsClosing() {
    const ctaTitleId = useId();

    return (
        <>
            <aside className="methods-advice">
                <span className="methods-advice__icon">
                    <MaskIcon src={advice.icon} size={24} />
                </span>
                <div className="methods-advice__text">
                    <p className="methods-advice__eyebrow">{advice.eyebrow}</p>
                    <p className="methods-advice__title">{advice.title}</p>
                    <p>{advice.text}</p>
                </div>
            </aside>

            <section className="methods-cta" aria-labelledby={ctaTitleId}>
                <h2 id={ctaTitleId} className="methods-cta__title">{cta.title}</h2>
                <p className="methods-cta__text">{cta.text}</p>
                <div className="methods-cta__actions">
                    {cta.actions.map((action) => (
                        <Button
                            key={action.key}
                            variant={action.variant}
                            label={action.label}
                            link={action.link}
                            disabled={Boolean(action.disabledReason)}
                            disabledReason={action.disabledReason}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default MethodsClosing;
