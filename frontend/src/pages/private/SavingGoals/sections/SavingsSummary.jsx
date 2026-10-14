import { StatList } from "@/components";
import { formatAmount, formatLongDate, formatPercent, formatPeriod } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.summary;

// summary: from selectSavingsSummary
function SavingsSummary({ summary, today }) {
    const { cards } = texts;
    const { mostAdvanced, monthDeposits } = summary;

    const items = [
        {
            key: "activeGoals",
            ...cards.activeGoals,
            value: summary.activeGoalCount,
            ...(summary.reachedGoalCount > 0 && { detail: texts.reachedGoals(summary.reachedGoalCount) }),
        },
        { key: "totalSaved", ...cards.totalSaved, value: formatAmount(summary.totalSaved, "€"), valueTone: "positive" },
        {
            key: "mostAdvanced",
            ...cards.mostAdvanced,
            value: mostAdvanced ? formatPercent(mostAdvanced.rate) : "—",
            detail: mostAdvanced ? mostAdvanced.title : texts.noActiveGoal,
        },
        monthDeposits
            ? { key: "monthDeposits", ...cards.monthDeposits, value: formatAmount(monthDeposits.amount, "€"), detail: texts.monthDetail(formatPeriod(monthDeposits.period)) }
            : { key: "monthDeposits", ...cards.monthDeposits, value: texts.unavailable, detail: texts.unavailableDetail },
    ];

    return (
        <section aria-label={texts.label}>
            <StatList items={items} variant="cards" note={texts.note(formatLongDate(today))} />
        </section>
    );
}

export default SavingsSummary;
