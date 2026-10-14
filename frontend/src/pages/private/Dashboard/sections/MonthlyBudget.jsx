import { Button, CategoryUsageRow, SectionContainer } from "@/components";
import { GaugeChart } from "@/components/ui/charts";
import { formatAmount, formatPercent, formatPeriod } from "@/utils";
import DashboardData from "../DashboardData";

const texts = DashboardData.budget;

function MonthlyBudget({ overview, period }) {
    const section = {
        header: {
            title: texts.title,
            description: formatPeriod(period),
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    if (overview.items.length === 0) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="dashboard__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer section={section} className="panel">
            <div className="monthly-budget__summary">
                <GaugeChart value={overview.totalSpent} max={overview.totalPlanned} size={160}>
                    <span className="monthly-budget__rate">{formatPercent(overview.usageRate)}</span>
                    <span className="monthly-budget__rate-label">{texts.used}</span>
                </GaugeChart>

                <div className="monthly-budget__totals">
                    <p className="monthly-budget__spent">
                        {formatAmount(overview.totalSpent, "€")} {texts.spent}
                    </p>
                    <p>{texts.totalPrefix} {formatAmount(overview.totalPlanned, "€")}</p>
                    <Button
                        variant="soft"
                        size="small"
                        label={texts.detailsButton.label}
                        disabled
                        disabledReason={texts.detailsButton.disabledReason}
                    />
                </div>
            </div>

            <ul className="monthly-budget__categories">
                {overview.items.map((item) => (
                    <li key={item.categoryId}>
                        <CategoryUsageRow item={item} />
                    </li>
                ))}
            </ul>
        </SectionContainer>
    );
}

export default MonthlyBudget;
