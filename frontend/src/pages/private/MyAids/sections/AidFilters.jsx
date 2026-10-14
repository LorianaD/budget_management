import { Button, ChipGroup, SearchBar, SelectField } from "@/components";
import MyAidsData from "../MyAidsData";

const texts = MyAidsData.filters;

// Search, category chips and situation select of the aids catalog.
// filtersState: from useAidFilters. resultLabel: announced to screen readers.
function AidFilters({ filtersState, isFiltered, resultLabel }) {
    const { filters, setFilter, resetFilters } = filtersState;

    return (
        <div className="aid-filters">
            <SearchBar
                label={texts.searchLabel}
                placeholder={texts.searchPlaceholder}
                value={filters.search}
                onChange={(value) => setFilter("search", value)}
            />

            <div className="aid-filters__row">
                <ChipGroup
                    label={texts.categoriesLabel}
                    options={texts.categories}
                    value={filters.category}
                    onChange={(value) => setFilter("category", value)}
                />
                <SelectField
                    label={texts.situationLabel}
                    hideLabel
                    value={filters.situation}
                    options={texts.situations}
                    onChange={(value) => setFilter("situation", value)}
                />
            </div>

            <div className="aid-filters__footer">
                <p className="aid-filters__results" role="status">{resultLabel}</p>
                <Button
                    variant="neutral"
                    size="small"
                    label={texts.reset}
                    onClick={resetFilters}
                    disabled={!isFiltered}
                />
            </div>

            {filters.situation !== "all" && <p className="aid-filters__note">{texts.situationNote}</p>}
        </div>
    );
}

export default AidFilters;
