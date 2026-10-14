import { SectionContainer, SuggestionCards } from "@/components";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.suggestions;

// suggestions: from selectExpenseSuggestions
function ExpenseSuggestions({ suggestions }) {
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
                ? <p className="transactions__empty">{texts.empty}</p>
                : <SuggestionCards suggestions={suggestions} types={texts.types} />}
        </SectionContainer>
    );
}

export default ExpenseSuggestions;
