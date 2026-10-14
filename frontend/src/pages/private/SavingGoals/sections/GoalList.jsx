import { useId } from "react";
import { Badge, Button, MaskIcon, ProgressBar } from "@/components";
import { GOAL_STATUSES, formatPercent, formatPreciseAmount } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";
import GoalDeadline from "./GoalDeadline";

const texts = SavingGoalsData.goals;

// item: { goal, progress, status, isSafetyFund } from selectGoalList
function GoalCard({ item }) {
    const { goal, progress, status, isSafetyFund } = item;
    const style = texts.statuses[status];
    const saved = formatPreciseAmount(progress.saved);
    const target = formatPreciseAmount(progress.target);

    return (
        <article className={`goal-card goal-card--${status}`}>
            <div className="goal-card__header">
                <span className="goal-card__icon">
                    <MaskIcon src={isSafetyFund ? texts.safetyFund.icon : texts.icon} size={20} />
                </span>
                <div className="goal-card__heading">
                    <h3 className="goal-card__title">{goal.title}</h3>
                    {isSafetyFund && <Badge label={texts.safetyFund.label} variant="soft-neutral" />}
                </div>
                <Badge label={status === GOAL_STATUSES.REACHED ? style.label : formatPercent(progress.rate)} variant={style.badge} />
            </div>

            <ProgressBar
                variant="goal"
                color={style.color}
                percentage={progress.rate * 100}
                label={(
                    <>
                        <span className="visually-hidden">{texts.amountsLabel(saved, target)}</span>
                        <span aria-hidden="true">
                            <span className="goal-card__saved">{saved}</span> / {target}
                        </span>
                    </>
                )}
                valueLabel={<GoalDeadline goal={goal} status={status} className="goal-card__deadline" withIcon />}
            />

            <div className="goal-card__actions">
                {texts.actions.map((action) => (
                    <Button
                        key={action.key}
                        variant={action.variant}
                        size="small"
                        label={action.label}
                        ariaLabel={`${action.label} : ${goal.title}`}
                        disabled
                        disabledReason={action.disabledReason}
                    />
                ))}
            </div>
        </article>
    );
}

// goals: from selectGoalList
function GoalList({ goals }) {
    const titleId = useId();

    return (
        <section className="saving-goals__section" aria-labelledby={titleId}>
            <h2 id={titleId} className="saving-goals__section-title">{texts.title}</h2>
            <ul className="goal-list">
                {goals.map((item) => (
                    <li key={item.goal.id}>
                        <GoalCard item={item} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default GoalList;
