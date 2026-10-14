import { SectionContainer } from "@/components";
import { ChartLegend, DoughnutChart } from "@/components/ui/charts";
import { getCategoryAppearance } from "@/data";
import { formatAmount, formatPercent, formatPreciseAmount } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.breakdown;

// breakdown: from selectBudgetShares. The legend gives the shares as text,
// the ring itself is decorative.
function BudgetBreakdown({ breakdown }) {
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };

    if (breakdown.shares.length === 0) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="budget__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    const segments = breakdown.shares.map((share) => ({
        key: share.categoryId,
        label: share.categoryName,
        value: share.amount,
        color: getCategoryAppearance(share.categoryName).color,
    }));

    const legend = breakdown.shares.map((share) => ({
        key: share.categoryId,
        label: share.categoryName,
        value: formatPercent(share.percentage / 100),
        color: getCategoryAppearance(share.categoryName).color,
    }));

    return (
        <SectionContainer section={section} className="panel">
            <div className="budget-breakdown">
                <DoughnutChart segments={segments} size={200} cutout="78%" formatValue={formatPreciseAmount}>
                    <span className="budget-breakdown__total">{formatAmount(breakdown.total, "€")}</span>
                    <span className="budget-breakdown__label">{texts.totalLabel}</span>
                </DoughnutChart>

                <ChartLegend items={legend} />
            </div>
        </SectionContainer>
    );
}

export default BudgetBreakdown;
