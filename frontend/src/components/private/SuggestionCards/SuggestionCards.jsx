import { Card } from "@/components/ui";
import { formatPercent, formatPreciseAmount } from "@/utils";
import "./SuggestionCards.css";

// Fields of a suggestion that hold amounts or rates (numbers from the selectors)
const AMOUNT_FIELDS = ["amount", "saved", "recommendedAmount", "previousAmount", "planned", "spent"];
const RATE_FIELDS = ["rate"];

// Figures formatted for the text functions of the page Data.js.
// A missing figure stays null (e.g. no safety fund yet).
function formatValues(suggestion) {
    const values = { ...suggestion };

    AMOUNT_FIELDS
        .filter((field) => typeof suggestion[field] === "number")
        .forEach((field) => { values[field] = formatPreciseAmount(suggestion[field]); });
    RATE_FIELDS
        .forEach((field) => { values[field] = typeof suggestion[field] === "number" ? formatPercent(suggestion[field]) : null; });

    return values;
}

// Grid of suggestion cards (Card "suggestion" variant).
// suggestions: [{ key, type, ...figures }] from the page selectors.
// types: { [type]: { tone, icon, badge?, title(values), description(values) } }
// from the page Data.js — the texts stay in Data.js, the figures in the selectors.
function SuggestionCards({ suggestions, types }) {
    return (
        <div className="suggestion-cards">
            {suggestions.map((suggestion) => {
                const type = types[suggestion.type];
                const values = formatValues(suggestion);

                return (
                    <Card
                        key={suggestion.key}
                        item={{
                            id: `suggestion-${suggestion.key}`,
                            variant: "suggestion",
                            tone: type.tone,
                            icon: { src: type.icon, alt: "" },
                            badge: type.badge,
                            title: type.title(values),
                            description: type.description(values),
                        }}
                    />
                );
            })}
        </div>
    );
}

export default SuggestionCards;
