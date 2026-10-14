import { SectionContainer } from "@/components";
import { ChartLegend, DoughnutChart } from "@/components/ui/charts";
import { getCategoryAppearance } from "@/data";
import { formatAmount, formatPercent, formatPreciseAmount } from "@/utils";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.breakdown;

// breakdown: from selectExpenseBreakdown. The legend gives the shares as text,
// the ring itself is decorative.
function ExpenseBreakdown({ breakdown }) {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    if (breakdown.shares.length === 0) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="transactions__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    const toItem = (share, value) => ({
        key: share.categoryId,
        label: share.categoryName,
        value,
        color: getCategoryAppearance(share.categoryName).color,
    });

    return (
        <SectionContainer section={section} className="panel">
            <div className="expense-breakdown">
                <DoughnutChart
                    segments={breakdown.shares.map((share) => toItem(share, share.amount))}
                    size={180}
                    cutout="78%"
                    formatValue={formatPreciseAmount}
                >
                    <span className="expense-breakdown__total">{formatAmount(breakdown.total, "€")}</span>
                    <span className="expense-breakdown__label">{texts.totalLabel}</span>
                </DoughnutChart>

                <ChartLegend items={breakdown.shares.map((share) => toItem(share, formatPercent(share.percentage / 100)))} />
            </div>
        </SectionContainer>
    );
}

export default ExpenseBreakdown;
