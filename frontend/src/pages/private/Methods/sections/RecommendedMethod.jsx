import { useId, useState } from "react";
import { Button, MaskIcon, ProgressBar } from "@/components";
import { formatPercent } from "@/utils";
import MethodsData from "../MethodsData";

const texts = MethodsData.recommended;

// "Méthode conseillée": a general advice (not computed from the profile),
// its split and an expandable explanation.
function RecommendedMethod() {
    const [isExpanded, setIsExpanded] = useState(false);
    const titleId = useId();
    const reasonsId = useId();
    const { allocations } = MethodsData.simulator.split;

    return (
        <section className="recommended-method" aria-labelledby={titleId}>
            <div className="recommended-method__text">
                <p className="recommended-method__badge">
                    <MaskIcon src={texts.badge.icon} size={12} />
                    {texts.badge.label}
                </p>
                <p className="recommended-method__eyebrow">{texts.eyebrow}</p>
                <h2 id={titleId} className="recommended-method__title">{texts.title}</h2>
                <p className="recommended-method__description">{texts.description}</p>

                <div className="recommended-method__toggle">
                    <Button
                        variant="outline"
                        size="small"
                        label={isExpanded ? texts.toggle.hide : texts.toggle.show}
                        onClick={() => setIsExpanded((value) => !value)}
                        ariaExpanded={isExpanded}
                        ariaControls={reasonsId}
                    />
                </div>

                <ul id={reasonsId} className="recommended-method__reasons" hidden={!isExpanded}>
                    {texts.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                </ul>
            </div>

            <div className="recommended-method__split" role="group" aria-label={texts.splitLabel}>
                {allocations.map((allocation) => (
                    <ProgressBar
                        key={allocation.key}
                        color={allocation.color}
                        percentage={allocation.percentage}
                        label={formatPercent(allocation.percentage / 100)}
                        valueLabel={allocation.label}
                    />
                ))}
            </div>
        </section>
    );
}

export default RecommendedMethod;
