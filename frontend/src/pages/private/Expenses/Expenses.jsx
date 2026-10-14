import { AsyncState, Button, DashboardHeader, PeriodSwitcher, Tabs } from "@/components";
import { usePeriod } from "@/context";
import { getToday } from "@/services";
import {
    BudgetAlerts,
    ExpenseBreakdown,
    ExpenseSuggestions,
    RecurringTransactions,
    TransactionFilters,
    TransactionSummary,
    TransactionTable,
} from "./sections";
import {
    isRangeFilterAvailable,
    isTransactionsPageEmpty,
    selectActiveFilters,
    selectBudgetAlerts,
    selectCategoryOptions,
    selectExpenseBreakdown,
    selectExpenseSuggestions,
    selectRecurringTransactions,
    selectTransactionList,
    selectTransactionSummary,
} from "./expensesSelectors";
import useExpensesData from "./useExpensesData";
import useTransactionFilters, { DEFAULT_FILTERS } from "./useTransactionFilters";
import ExpensesData from "./ExpensesData";
import "./Expenses.css";

function ExpensesContent({ data, filtersState, today }) {
    const page = ExpensesData;
    const { type, filters, visibleCount, setType, showMore } = filtersState;
    const list = selectTransactionList(data, { type, filters, visibleCount }, today);

    return (
        <>
            <TransactionSummary summary={selectTransactionSummary(data)} />

            <Tabs label={page.tabs.label} tabs={page.tabs.items} activeKey={type} onChange={setType}>
                <TransactionFilters
                    filtersState={filtersState}
                    categories={selectCategoryOptions(data, type)}
                    isRangeAvailable={isRangeFilterAvailable(data.period, today)}
                    activeFilters={selectActiveFilters(data, filters, DEFAULT_FILTERS, today)}
                    resultLabel={page.filters.results(list.matchCount, list.typeCount)}
                />
                <TransactionTable
                    list={list}
                    emptyMessage={list.typeCount === 0 ? page.table.emptyType[type] : page.table.noResult}
                    onShowMore={showMore}
                />
            </Tabs>

            <div className="transactions__row">
                <ExpenseBreakdown breakdown={selectExpenseBreakdown(data)} />
                <BudgetAlerts alerts={selectBudgetAlerts(data)} />
            </div>

            <RecurringTransactions recurring={selectRecurringTransactions(data)} />
            <ExpenseSuggestions suggestions={selectExpenseSuggestions(data)} />
        </>
    );
}

function Expenses() {
    const page = ExpensesData;
    const { period } = usePeriod();
    const { data, error, isLoading, reload } = useExpensesData(period);
    // Owned here so the tab and filters survive a period change
    const filtersState = useTransactionFilters();
    const today = getToday();

    return (
        <>
            <DashboardHeader title={page.header.title} subtitle={page.header.subtitle}>
                <PeriodSwitcher />
                <div className="transactions__header-actions">
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

            <div className="transactions">
                <AsyncState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={data ? isTransactionsPageEmpty(data) : false}
                    onRetry={reload}
                    messages={page.states}
                >
                    {() => <ExpensesContent data={data} filtersState={filtersState} today={today} />}
                </AsyncState>
            </div>
        </>
    );
}

export default Expenses;
