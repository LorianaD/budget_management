import { Button, MaskIcon, ProgressBar, SectionContainer } from "@/components";
import { GaugeChart, chartColors } from "@/components/ui/charts";
import { formatAmount, formatMonthYear, formatPercent } from "@/utils";
import DashboardData from "../DashboardData";

const texts = DashboardData.savingGoal;

// highlight: { goal, progress } from selectHighlightedGoal, or null
function SavingGoalHighlight({ highlight }) {
    const section = {
        header: {
            title: (
                <>
                    <MaskIcon src={texts.icon} size={18} />
                    {texts.title}
                </>
            ),
            variant: "panel",
            titleVariant: "panel",
        },
    };

    if (!highlight) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="dashboard__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    const { goal, progress } = highlight;

    return (
        <SectionContainer section={section} className="panel">
            <div className="goal-highlight">
                <p className="goal-highlight__title">{goal.title}</p>

                <GaugeChart value={progress.saved} max={progress.target} color={chartColors.green} size={120} cutout="88%">
                    <span className="goal-highlight__saved">{formatAmount(progress.saved, "€")}</span>
                    <span className="goal-highlight__target">/ {formatAmount(progress.target, "€")}</span>
                </GaugeChart>

                <ProgressBar
                    variant="goal"
                    color={chartColors.green}
                    percentage={progress.rate * 100}
                    label={`${formatPercent(progress.rate)} ${texts.reached}`}
                    valueLabel={goal.deadline ? formatMonthYear(goal.deadline) : texts.noDeadline}
                />

                <Button
                    variant="success"
                    label={texts.depositButton.label}
                    disabled
                    disabledReason={texts.depositButton.disabledReason}
                />
            </div>
        </SectionContainer>
    );
}

export default SavingGoalHighlight;
