import { StatList } from "@/components";
import { formatAmount, formatPercent, formatPreciseAmount } from "@/utils";
import DashboardData from "../DashboardData";

const texts = DashboardData.summary;

// Turns a selector trend into the detail line of a card
function toTrendDetail(trend) {
    if (!trend) return {};
    if (trend.direction === "stable") return { detail: texts.trend.stable, detailTone: "neutral" };

    const sign = trend.rate > 0 ? "+" : "−";
    return {
        detail: `${sign}${formatPercent(Math.abs(trend.rate))} ${texts.trend.previousMonth}`,
        detailTone: trend.direction,
    };
}

function toBudgetDetail(isWithinBudget) {
    if (isWithinBudget === null) return {};
    return isWithinBudget
        ? { detail: texts.budget.within, detailTone: "ok" }
        : { detail: texts.budget.over, detailTone: "alert" };
}

function SummaryCards({ summary }) {
    const { cards } = texts;
    const { income, expenses, savings, remainingToLive } = summary;

    const items = [
        { key: "income", ...cards.income, value: formatAmount(income.amount, "€"), ...toTrendDetail(income.trend) },
        { key: "expenses", ...cards.expenses, value: formatAmount(expenses.amount, "€"), ...toBudgetDetail(expenses.isWithinBudget) },
        { key: "savings", ...cards.savings, value: formatAmount(savings.amount, "€"), ...toTrendDetail(savings.trend) },
        {
            key: "remainingToLive",
            ...cards.remainingToLive,
            value: formatAmount(remainingToLive.amount, "€"),
            valueTone: remainingToLive.amount >= 0 ? "positive" : "negative",
            ...(remainingToLive.dailyAmount !== null && {
                detail: `≈ ${formatPreciseAmount(remainingToLive.dailyAmount)} ${texts.perDay}`,
            }),
        },
    ];

    return (
        <section aria-label={texts.label}>
            <StatList items={items} variant="cards" />
        </section>
    );
}

export default SummaryCards;
