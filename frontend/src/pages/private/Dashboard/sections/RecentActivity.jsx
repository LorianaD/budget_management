import { MaskIcon, SectionContainer } from "@/components";
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

    return (
        <SectionContainer section={section} className="panel">
            {items.length === 0 ? (
                <p className="dashboard__empty">{texts.empty}</p>
            ) : (
                <ul className="activity-list">
                    {items.map((item) => {
                        const type = texts.types[item.type];
                        const icon = item.categoryName ? getCategoryAppearance(item.categoryName).icon : type.icon;
                        const meta = [type.label, item.categoryName, formatRelativeTime(item.date, today)]
                            .filter(Boolean)
                            .join(" · ");

                        return (
                            <li key={item.key} className="activity-list__item">
                                <span className={`activity-list__icon activity-list__icon--${type.tone}`}>
                                    <MaskIcon src={icon} />
                                </span>
                                <p className="activity-list__text">
                                    <span className="activity-list__label">{item.label}</span>
                                    <span className="activity-list__meta">{meta}</span>
                                </p>
                                <p className={`activity-list__amount activity-list__amount--${item.type}`}>
                                    {AMOUNT_SIGNS[item.type]}{formatPreciseAmount(item.amount)}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </SectionContainer>
    );
}

export default RecentActivity;
