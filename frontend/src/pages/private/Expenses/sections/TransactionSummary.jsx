import { StatList } from "@/components";
import { formatAmount, formatNumber, formatPreciseAmount } from "@/utils";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.summary;

// summary: from selectTransactionSummary
function TransactionSummary({ summary }) {
    const { cards } = texts;

    const items = [
        { key: "expenses", ...cards.expenses, value: formatPreciseAmount(summary.expenses) },
        { key: "incomes", ...cards.incomes, value: formatPreciseAmount(summary.incomes) },
        {
            key: "balance",
            ...cards.balance,
            value: formatAmount(summary.balance, "€"),
            valueTone: summary.balance < 0 ? "negative" : undefined,
        },
        { key: "count", ...cards.count, value: formatNumber(summary.completedCount), detail: texts.countDetail(summary.otherCount) },
    ];

    return (
        <section aria-label={texts.label}>
            <StatList items={items} variant="cards" note={texts.note} />
        </section>
    );
}

export default TransactionSummary;
