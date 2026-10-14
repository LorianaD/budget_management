import { Badge, Button, ChipGroup, SearchBar, SelectField } from "@/components";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.filters;
const statusLabels = ExpensesData.table.statuses;

const optionLabel = (options, value) => options.find((option) => option.value === value)?.label;

// Readable value of an active filter (status, period and sort hold option values)
const activeValueLabels = {
    status: (value) => statusLabels[value].label,
    range: (value) => optionLabel(texts.range.options, value),
    sort: (value) => optionLabel(texts.sort.options, value),
};

const statusOptions = [
    { value: "all", label: texts.status.all },
    ...Object.entries(statusLabels).map(([value, status]) => ({ value, label: status.label })),
];

// Search, selects and period chips of the transactions list.
// filtersState: from useTransactionFilters; categories: from selectCategoryOptions.
// isRangeAvailable: "Aujourd'hui" / "Cette semaine" only apply to the current month.
// activeFilters: from selectActiveFilters (what is really applied for this period).
function TransactionFilters({ filtersState, categories, isRangeAvailable, activeFilters, resultLabel }) {
    const { filters, setFilter, resetFilters } = filtersState;

    const categoryOptions = [
        { value: "all", label: texts.category.all },
        ...categories.map((category) => ({ value: String(category.id), label: category.name })),
    ];
    const rangeOptions = texts.range.options.map((option) => ({
        ...option,
        disabled: !isRangeAvailable && option.value !== "month",
    }));

    return (
        // SearchBar already provides the search landmark
        <div className="transaction-filters" role="group" aria-label={texts.label}>
            <SearchBar
                label={texts.search.label}
                placeholder={texts.search.placeholder}
                value={filters.search}
                onChange={(value) => setFilter("search", value)}
            />

            <div className="transaction-filters__row">
                <div className="transaction-filters__selects">
                    <SelectField
                        label={texts.category.label}
                        hideLabel
                        value={filters.categoryId}
                        options={categoryOptions}
                        onChange={(value) => setFilter("categoryId", value)}
                    />
                    <SelectField
                        label={texts.status.label}
                        hideLabel
                        value={filters.status}
                        options={statusOptions}
                        onChange={(value) => setFilter("status", value)}
                    />
                    <SelectField
                        label={texts.sort.label}
                        hideLabel
                        value={filters.sort}
                        options={texts.sort.options}
                        onChange={(value) => setFilter("sort", value)}
                    />
                </div>

                <ChipGroup
                    label={texts.range.label}
                    options={rangeOptions}
                    value={isRangeAvailable ? filters.range : "month"}
                    onChange={(value) => setFilter("range", value)}
                    disabledReason={texts.range.unavailableReason}
                />
            </div>

            <div className="transaction-filters__footer">
                <div className="transaction-filters__status" aria-live="polite">
                    <p className="transaction-filters__results">{resultLabel}</p>
                    {activeFilters.length > 0 && (
                        <div className="transaction-filters__active">
                            <span>{texts.active.label}</span>
                            <ul className="transaction-filters__active-list">
                                {activeFilters.map((filter) => (
                                    <li key={filter.key}>
                                        <Badge
                                            variant="soft-info"
                                            label={texts.active[filter.key](activeValueLabels[filter.key]?.(filter.value) ?? filter.value)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Button
                    variant="soft"
                    size="small"
                    label={texts.reset.label}
                    onClick={resetFilters}
                    disabled={activeFilters.length === 0}
                    disabledReason={texts.reset.disabledReason}
                />
            </div>
        </div>
    );
}

export default TransactionFilters;
