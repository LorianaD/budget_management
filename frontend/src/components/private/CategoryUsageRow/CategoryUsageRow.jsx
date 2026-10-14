import { Badge, MaskIcon, ProgressBar } from "@/components/ui";
import { getBudgetStatusAppearance, getCategoryAppearance } from "@/data";
import { formatAmount, formatPercent } from "@/utils";
import "./CategoryUsageRow.css";

// Budget usage of one category: icon, name, "spent / planned", usage badge
// and a bar coloured by the shared status rule (getBudgetStatus).
// item: { categoryName, spent, planned, usageRate, status } (getBudgetUsage + status)
// note: optional line under the bar (e.g. "Dépassement de 50 €").
function CategoryUsageRow({ item, note }) {
    const style = getBudgetStatusAppearance(item.status);

    return (
        <div className="category-usage-row">
            <ProgressBar
                variant="category"
                color={style.color}
                percentage={item.usageRate * 100}
                label={(
                    <>
                        <span className="category-usage-row__icon">
                            <MaskIcon src={getCategoryAppearance(item.categoryName).icon} size={16} />
                        </span>
                        {item.categoryName}
                    </>
                )}
                valueLabel={(
                    <>
                        {formatAmount(item.spent, "€")} / {formatAmount(item.planned, "€")}
                        <Badge label={formatPercent(item.usageRate)} variant={style.badge} />
                    </>
                )}
            />

            {note && <p className={`category-usage-row__note category-usage-row__note--${item.status}`}>{note}</p>}
        </div>
    );
}

export default CategoryUsageRow;
