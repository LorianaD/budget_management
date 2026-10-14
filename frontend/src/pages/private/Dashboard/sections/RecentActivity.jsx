import { ActivityList, SectionContainer } from "@/components";
import { getCategoryAppearance } from "@/data";
import { formatPreciseAmount, formatRelativeTime } from "@/utils";
import DashboardData from "../DashboardData";

const texts = DashboardData.recentActivity;

// Expenses are money out, incomes money in; deposits are a transfer to savings
const AMOUNT_SIGNS = { expense: "−", income: "+", deposit: "" };

// items: from selectRecentActivity
function RecentActivity({ items, today }) {
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };

    const listItems = items.map((item) => {
        const type = texts.types[item.type];

        return {
            key: item.key,
            icon: item.categoryName ? getCategoryAppearance(item.categoryName).icon : type.icon,
            tone: type.tone,
            label: item.label,
            meta: [type.label, item.categoryName, formatRelativeTime(item.date, today)].filter(Boolean).join(" · "),
            amount: `${AMOUNT_SIGNS[item.type]}${formatPreciseAmount(item.amount)}`,
            amountTone: item.type === "income" ? "positive" : undefined,
        };
    });

    return (
        <SectionContainer section={section} className="panel">
            {items.length === 0
                ? <p className="dashboard__empty">{texts.empty}</p>
                : <ActivityList items={listItems} />}
        </SectionContainer>
    );
}

export default RecentActivity;
