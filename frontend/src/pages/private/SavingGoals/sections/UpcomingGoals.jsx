import { useId } from "react";
import { GaugeChart } from "@/components/ui/charts";
import { formatPercent, formatPreciseAmount } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";
import GoalDeadline from "./GoalDeadline";

const texts = SavingGoalsData.upcoming;
const { statuses } = SavingGoalsData.goals;

// goals: from selectUpcomingGoals (nearest deadline first)
function UpcomingGoals({ goals }) {
    const titleId = useId();

    return (
        <section className="saving-goals__section" aria-labelledby={titleId}>
            <div className="saving-goals__section-header">
                <h2 id={titleId} className="saving-goals__section-title">{texts.title}</h2>
                <p className="saving-goals__section-description">{texts.description}</p>
            </div>

            {goals.length === 0 ? (
                <p className="saving-goals__empty">{texts.empty}</p>
            ) : (
                <ol className="upcoming-goals">
                    {goals.map(({ goal, progress, status }) => (
                        <li key={goal.id} className={`upcoming-goals__item upcoming-goals__item--${status}`}>
                            <p className="upcoming-goals__text">
                                <span className="upcoming-goals__title">{goal.title}</span>
                                <span>{texts.remaining(formatPreciseAmount(progress.remaining))}</span>
                                <GoalDeadline goal={goal} status={status} className="upcoming-goals__deadline" />
                            </p>
                            <GaugeChart value={progress.saved} max={progress.target} color={statuses[status].color} size={44} cutout="78%">
                                <span className="upcoming-goals__rate">{formatPercent(progress.rate)}</span>
                            </GaugeChart>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}

export default UpcomingGoals;
