import { Button, SectionContainer } from "@/components";
import { usePeriod } from "@/context";
import { formatPeriod, shiftPeriod } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.quickActions;

// Actions with a link lead to an existing page (keeping the selected month);
// the others need a write or a feature that does not exist yet: they are
// disabled, with the reason available to screen readers (Button disabledReason).
function QuickActions({ period }) {
    const { linkWithPeriod } = usePeriod();
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };
    const previousMonth = formatPeriod(shiftPeriod(period, -1)).toLowerCase();

    return (
        <SectionContainer section={section} className="panel">
            <ul className="quick-actions">
                {texts.items.map((action) => (
                    <li key={action.key}>
                        <Button
                            variant={action.variant}
                            label={typeof action.label === "function" ? action.label(previousMonth) : action.label}
                            link={action.link && linkWithPeriod(action.link)}
                            disabled={!action.link}
                            disabledReason={action.disabledReason}
                        />
                    </li>
                ))}
            </ul>
        </SectionContainer>
    );
}

export default QuickActions;
