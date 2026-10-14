import { useState } from "react";
import { ProgressBar, RangeField, SectionContainer } from "@/components";
import { formatPreciseAmount } from "@/utils";
import { selectSimulation } from "../methodsSelectors";
import MethodsData from "../MethodsData";

const texts = MethodsData.simulator;

// "Simuler une méthode": the 50/30/20 split of the income chosen with the
// slider. Display only: nothing is saved.
function MethodSimulator() {
    const [income, setIncome] = useState(texts.income.defaultValue);
    const simulation = selectSimulation(income, texts.split.allocations);

    const section = {
        id: texts.id,
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            <div className="method-simulator">
                <div className="method-simulator__input">
                    <RangeField
                        variant="plain"
                        label={texts.income.label}
                        value={income}
                        min={texts.income.min}
                        max={texts.income.max}
                        step={texts.income.step}
                        formatValue={formatPreciseAmount}
                        onChange={setIncome}
                        note={texts.method(texts.split.label)}
                    />
                </div>

                <div className="method-simulator__results" role="group" aria-label={texts.resultsLabel}>
                    {simulation.items.map((item) => (
                        <ProgressBar
                            key={item.key}
                            color={item.color}
                            percentage={item.percentage}
                            label={item.shortLabel}
                            valueLabel={formatPreciseAmount(item.amount)}
                        />
                    ))}
                    <p className="method-simulator__total" aria-live="polite">
                        {texts.total(formatPreciseAmount(simulation.total))}
                    </p>
                </div>
            </div>
        </SectionContainer>
    );
}

export default MethodSimulator;
