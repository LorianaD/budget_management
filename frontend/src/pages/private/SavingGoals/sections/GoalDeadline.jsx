import { MaskIcon } from "@/components";
import { GOAL_STATUSES, formatMonthYear } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.goals;

// "Date cible : Décembre 2026", "Échéance dépassée : …" or "Sans date cible"
function GoalDeadline({ goal, status, className, withIcon = false }) {
    return (
        <span className={className}>
            {withIcon && <MaskIcon src={texts.calendarIcon} size={14} />}
            {texts.deadline(goal.deadline ? formatMonthYear(goal.deadline) : null, status === GOAL_STATUSES.OVERDUE)}
        </span>
    );
}

export default GoalDeadline;
