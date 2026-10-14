import { SectionContainer } from "@/components";
import { BarChart } from "@/components/ui/charts";
import { formatAmount, formatPeriod, formatShortMonth } from "@/utils";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.evolution;
const formatEuros = (value) => formatAmount(value, "€");

// evolution: from selectSavingsEvolution, null when the history is unavailable
function SavingsEvolution({ evolution }) {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    if (!evolution || !evolution.hasDeposits) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="saving-goals__empty">{evolution ? texts.empty : texts.unavailable}</p>
            </SectionContainer>
        );
    }

    const bars = evolution.points.map((point) => ({
        key: point.period,
        label: formatShortMonth(point.period),
        fullLabel: formatPeriod(point.period),
        value: point.total,
    }));

    return (
        <SectionContainer section={section} className="panel">
            <BarChart bars={bars} caption={texts.caption} columns={texts.columns} formatValue={formatEuros} />
        </SectionContainer>
    );
}

export default SavingsEvolution;
