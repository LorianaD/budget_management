import { ActivityList, Button, SectionContainer } from "@/components";
import { formatLongDate, formatSignedAmount } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.latestDeposits;

// deposits: from selectLatestDeposits, null when the history is unavailable.
// onShowMore reveals the next deposits (read only, already loaded).
function LatestDeposits({ deposits, onShowMore }) {
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };

    if (!deposits || deposits.total === 0) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="saving-goals__empty">{deposits ? texts.empty : texts.unavailable}</p>
            </SectionContainer>
        );
    }

    const items = deposits.rows.map((deposit) => ({
        key: deposit.id,
        icon: texts.icon,
        tone: "green",
        label: deposit.goalTitle ?? texts.unknownGoal,
        meta: formatLongDate(deposit.date),
        amount: formatSignedAmount(deposit.amount),
        amountTone: "positive",
    }));

    return (
        <SectionContainer section={section} className="panel">
            <ActivityList items={items} />

            <div className="latest-deposits__footer">
                <p className="latest-deposits__count" role="status">
                    {texts.count(deposits.rows.length, deposits.total)}
                </p>
                {deposits.hasMore && (
                    <Button variant="neutral" size="small" label={texts.showMore} onClick={onShowMore} />
                )}
            </div>
        </SectionContainer>
    );
}

export default LatestDeposits;
