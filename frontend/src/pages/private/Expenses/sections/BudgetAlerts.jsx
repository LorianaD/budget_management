import { CategoryUsageRow, SectionContainer } from "@/components";
import { formatPercent, formatPreciseAmount } from "@/utils";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.alerts;

// alerts: from selectBudgetAlerts (shared 80 % rule)
function BudgetAlerts({ alerts }) {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    const emptyMessage = alerts.hasBudget ? texts.empty : texts.noBudget;

    return (
        <SectionContainer section={section} className="panel">
            {alerts.items.length === 0 ? (
                <p className="transactions__empty">{emptyMessage}</p>
            ) : (
                <ul className="budget-alerts">
                    {alerts.items.map((item) => (
                        <li key={item.categoryId}>
                            <CategoryUsageRow
                                item={item}
                                note={item.overrun > 0
                                    ? texts.overrun(formatPreciseAmount(item.overrun))
                                    : texts.usage(formatPercent(item.usageRate))}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </SectionContainer>
    );
}

export default BudgetAlerts;
