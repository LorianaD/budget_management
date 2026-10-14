import { useState } from "react";
import { Button, DonutChart, ProgressBar, RangeField, SectionEyebrow } from "@/components";
import { formatAmount, getBudgetSplit } from "@/utils";

// Calculateur 50/30/20 : la répartition est recalculée à chaque mouvement du curseur.
// Simple calcul d'affichage côté client, sans enregistrement ni appel d'API.
function Calculator({ page }) {
    const section = page.calculator;
    const { income, allocations, results } = section;

    const [monthlyIncome, setMonthlyIncome] = useState(income.defaultValue);

    const breakdown = getBudgetSplit(monthlyIncome, allocations);
    const formatIncome = (value) => formatAmount(value, income.currency);

    return (
        <section id="calculator" className="section-calculator">
            <SectionEyebrow
                label={section.eyebrow.label}
                variant={section.eyebrow.variant}
            />

            <article className="section-calculator__card">
                <h2 className="section-calculator__title">
                    {section.header.title}
                </h2>

                <div className="section-calculator__body">
                    <div className="section-calculator__inputs">
                        <RangeField
                            label={income.label}
                            value={monthlyIncome}
                            min={income.min}
                            max={income.max}
                            step={income.step}
                            formatValue={formatIncome}
                            onChange={setMonthlyIncome}
                            note={section.methodLabel}
                        />

                        {section.actions.map((btn) => (
                            <Button
                                key={btn.label}
                                label={btn.label}
                                variant={btn.variant}
                                link={btn.link}
                            />
                        ))}
                    </div>

                    <div className="section-calculator__results">
                        <div className="section-calculator__breakdown">
                            <h3 className="section-calculator__results-title">
                                {results.title}
                            </h3>

                            {breakdown.map((item) => (
                                <ProgressBar
                                    key={item.key}
                                    label={item.label}
                                    valueLabel={formatAmount(item.amount, income.currency)}
                                    percentage={item.percentage}
                                    color={item.color}
                                />
                            ))}

                            <p className="section-calculator__total">
                                {results.totalLabel} : {formatIncome(monthlyIncome)}
                            </p>
                        </div>

                        <DonutChart
                            segments={allocations}
                            centerLabel={section.chartLabel}
                        />
                    </div>
                </div>
            </article>
        </section>
    );
}

export default Calculator;
