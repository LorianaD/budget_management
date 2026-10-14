import { SectionContainer } from "@/components";
import { formatDayOfPeriod, formatPreciseAmount, formatSignedAmount } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.movements;

// Signed amount of each flow: incomes come in, expenses and savings go out
const FLOWS = [
    { key: "income", sign: 1 },
    { key: "expenses", sign: -1 },
    { key: "savings", sign: -1 },
];

function TimelineStep({ date, title, children, balance, variant = "week" }) {
    return (
        <li className={`month-movements__step month-movements__step--${variant}`}>
            <p className="month-movements__date">{date}</p>
            <div className="month-movements__content">
                {title && <p className="month-movements__title">{title}</p>}
                {children}
            </div>
            <p className="month-movements__balance">
                {texts.balance} {formatPreciseAmount(balance)}
            </p>
        </li>
    );
}

// movements: from selectMonthMovements
function MonthMovements({ movements, period }) {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    if (!movements.hasMovements) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="budget__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer section={section} className="panel">
            <ol className="month-movements">
                <TimelineStep date={formatDayOfPeriod(period, 1)} title={texts.start} balance={0} variant="edge" />

                {movements.weeks.map((week) => {
                    const flows = FLOWS.filter((flow) => week[flow.key] > 0);

                    return (
                        <TimelineStep
                            key={week.key}
                            date={texts.week(week.firstDay, formatDayOfPeriod(period, week.lastDay))}
                            title={flows.length === 0 ? texts.noMovement : null}
                            balance={week.balance}
                        >
                            {flows.length > 0 && (
                                <ul className="month-movements__flows">
                                    {flows.map((flow) => (
                                        <li key={flow.key} className={`month-movements__flow month-movements__flow--${flow.key}`}>
                                            {texts.flows[flow.key]} {formatSignedAmount(flow.sign * week[flow.key])}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </TimelineStep>
                    );
                })}

                <TimelineStep
                    date={formatDayOfPeriod(period, movements.daysInPeriod)}
                    title={texts.end}
                    balance={movements.finalBalance}
                    variant="edge"
                />
            </ol>
        </SectionContainer>
    );
}

export default MonthMovements;
