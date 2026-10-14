import { Button, MaskIcon, ProgressBar, SectionContainer } from "@/components";
import { formatPercent, formatPreciseAmount } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.safetyFund;

// fund: from selectSafetyFund. The goal's own target and the recommended
// amount (fixed charges) are shown as two distinct figures.
function SafetyFund({ fund }) {
    const section = {
        header: {
            title: (
                <>
                    <MaskIcon src={texts.icon} size={20} />
                    {texts.title}
                </>
            ),
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    const recommendation = fund.recommendedAmount > 0 && (
        <p className="safety-fund__recommendation">
            {texts.recommendation(fund.months, formatPreciseAmount(fund.recommendedAmount))}
        </p>
    );

    if (!fund.goal) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="budget__empty">{texts.empty}</p>
                {recommendation}
            </SectionContainer>
        );
    }

    const { progress } = fund;

    return (
        <SectionContainer section={section} className="panel">
            <div className="safety-fund">
                <p className="safety-fund__amounts">
                    <span className="safety-fund__saved">{formatPreciseAmount(progress.saved)}</span>
                    {texts.targetPrefix} {formatPreciseAmount(progress.target)}
                </p>

                <ProgressBar
                    variant="fund"
                    color="var(--orange)"
                    percentage={progress.rate * 100}
                    label={`${formatPercent(progress.rate)} ${texts.reached}`}
                />

                <Button
                    variant="success"
                    label={texts.contributeButton.label}
                    disabled
                    disabledReason={texts.contributeButton.disabledReason}
                />

                {recommendation}
            </div>
        </SectionContainer>
    );
}

export default SafetyFund;
