import { AsyncState, Button, DashboardHeader, PeriodSwitcher } from "@/components";
import { usePeriod } from "@/context";
import { getSafetyFundGoalId } from "@/services";
import {
    BudgetBreakdown,
    BudgetSuggestions,
    BudgetTable,
    ForecastCards,
    MonthMovements,
    QuickActions,
    SafetyFund,
} from "./sections";
import {
    isBudgetPageEmpty,
    selectBudgetShares,
    selectBudgetTable,
    selectForecast,
    selectMonthMovements,
    selectSafetyFund,
    selectSuggestions,
} from "./budgetSelectors";
import useBudgetData from "./useBudgetData";
import BudgetData from "./BudgetData";
import "./Budget.css";

function BudgetContent({ data, period }) {
    const table = selectBudgetTable(data);
    const safetyFund = selectSafetyFund(data, getSafetyFundGoalId());

    return (
        <>
            <ForecastCards forecast={selectForecast(data)} />

            <div className="budget__row">
                <BudgetTable table={table} period={period} />
                <BudgetBreakdown breakdown={selectBudgetShares(data)} />
            </div>

            <div className="budget__row budget__row--wide-side">
                <MonthMovements movements={selectMonthMovements(data)} period={period} />
                <div className="budget__column">
                    <SafetyFund fund={safetyFund} />
                    <QuickActions period={period} />
                </div>
            </div>

            <BudgetSuggestions suggestions={selectSuggestions(table, safetyFund)} />
        </>
    );
}

function Budget() {
    const page = BudgetData;
    const { period } = usePeriod();
    const { data, error, isLoading, reload } = useBudgetData(period);

    return (
        <>
            <DashboardHeader title={page.header.title} subtitle={page.header.subtitle}>
                <PeriodSwitcher />
                <div className="budget__header-actions">
                    {page.header.actions.map((action) => (
                        <Button
                            key={action.key}
                            variant={action.variant}
                            size="small"
                            label={action.label}
                            disabled
                            disabledReason={action.disabledReason}
                        />
                    ))}
                </div>
            </DashboardHeader>

            <div className="budget">
                <AsyncState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={data ? isBudgetPageEmpty(data) : false}
                    onRetry={reload}
                    messages={page.states}
                >
                    {() => <BudgetContent data={data} period={period} />}
                </AsyncState>
            </div>
        </>
    );
}

export default Budget;
