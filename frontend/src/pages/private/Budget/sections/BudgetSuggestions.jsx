import { SectionContainer, SuggestionCards } from "@/components";
import BudgetData from "../BudgetData";

const texts = BudgetData.suggestions;

// suggestions: from selectSuggestions
function BudgetSuggestions({ suggestions }) {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            {suggestions.length === 0
                ? <p className="budget__empty">{texts.empty}</p>
                : <SuggestionCards suggestions={suggestions} types={texts.types} />}
        </SectionContainer>
    );
}

export default BudgetSuggestions;
