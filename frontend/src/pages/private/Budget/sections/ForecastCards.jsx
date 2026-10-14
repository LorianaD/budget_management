import { StatList } from "@/components";
import { formatAmount, formatPreciseAmount } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.forecast;

// forecast: from selectForecast
function ForecastCards({ forecast }) {
    const { cards } = texts;

    const items = [
        { key: "income", ...cards.income, value: formatAmount(forecast.income, "€") },
        { key: "plannedExpenses", ...cards.plannedExpenses, value: formatAmount(forecast.plannedExpenses, "€") },
        { key: "savings", ...cards.savings, value: formatAmount(forecast.savings, "€") },
        {
            key: "remaining",
            ...cards.remaining,
            value: formatAmount(forecast.remaining, "€"),
            valueTone: forecast.remaining >= 0 ? "positive" : "negative",
            ...(forecast.dailyAmount !== null && {
                detail: `≈ ${formatPreciseAmount(forecast.dailyAmount)} ${texts.perDay}`,
            }),
        },
    ];

    return (
        <section aria-label={texts.label}>
            <StatList items={items} variant="cards" note={texts.note} />
        </section>
    );
}

export default ForecastCards;
