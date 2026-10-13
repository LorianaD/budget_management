import { DonutChart, ProgressBar, SectionContainer, StatList } from "@/components";
import { formatAmount, formatNumber } from "@/utils";

function SimulationExample({ page }) {
    const section = page.simulationExample;
    const { preview } = section;

    // Les montants restent des nombres dans les données ; on les formate ici.
    const findValue = (key) => preview.stats.find((stat) => stat.key === key).value;
    const income = findValue("income");
    const expenses = findValue("expenses");
    const usagePercentage = Math.round((expenses / income) * 100);

    const stats = preview.stats.map((stat) => ({
        ...stat,
        value: formatAmount(stat.value),
    }));

    return (
        <SectionContainer section={section}>
            <article className="section-simulation__preview">
                <p className="section-simulation__label">
                    {preview.label} — {preview.period}
                </p>

                <div className="section-simulation__body">
                    <StatList items={stats} variant="tiles" />

                    <DonutChart
                        segments={preview.expensesDistribution}
                        centerLabel={formatAmount(expenses)}
                        legendTitle={preview.distributionTitle}
                        size="large"
                    />
                </div>

                <ProgressBar
                    variant="summary"
                    label={`${usagePercentage}% ${preview.budgetUsage.label}`}
                    valueLabel={`${formatNumber(expenses)} / ${formatAmount(income)}`}
                    percentage={usagePercentage}
                />
            </article>
        </SectionContainer>
    );
}

export default SimulationExample;
