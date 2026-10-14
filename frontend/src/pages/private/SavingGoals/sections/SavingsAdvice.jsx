import { useId } from "react";
import { SuggestionCards } from "@/components";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.advice;

// advice: from selectSavingsAdvice (hidden when no rule applies)
function SavingsAdvice({ advice }) {
    const titleId = useId();

    if (advice.length === 0) return null;

    return (
        <section className="saving-goals__section" aria-labelledby={titleId}>
            <div className="saving-goals__section-header">
                <h2 id={titleId} className="saving-goals__section-title">{texts.title}</h2>
                <p className="saving-goals__section-description">{texts.description}</p>
            </div>
            <SuggestionCards suggestions={advice} types={texts.types} />
        </section>
    );
}

export default SavingsAdvice;
