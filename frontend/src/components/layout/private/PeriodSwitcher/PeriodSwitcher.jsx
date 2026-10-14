import { usePeriod } from "@/context";
import { MaskIcon } from "@/components/ui";
import { formatPeriod, shiftPeriod } from "@/utils";
import PeriodSwitcherData from "./PeriodSwitcherData";
import "./PeriodSwitcher.css";

// Month selector of the private pages: ‹ Juillet 2026 ›.
// The period lives in the URL (PeriodProvider); this component only moves it.
function PeriodSwitcher() {
    const { period, goToPreviousPeriod, goToNextPeriod } = usePeriod();
    const { label, previous, next } = PeriodSwitcherData;

    return (
        <div className="period-switcher" role="group" aria-label={label}>
            <button
                type="button"
                className="period-switcher__button"
                aria-label={`${previous.label} : ${formatPeriod(shiftPeriod(period, -1))}`}
                onClick={goToPreviousPeriod}
            >
                <MaskIcon src={previous.icon} size={16} />
            </button>

            {/* Announced when the month changes */}
            <p className="period-switcher__current" aria-live="polite">
                {formatPeriod(period)}
            </p>

            <button
                type="button"
                className="period-switcher__button"
                aria-label={`${next.label} : ${formatPeriod(shiftPeriod(period, 1))}`}
                onClick={goToNextPeriod}
            >
                <MaskIcon src={next.icon} size={16} />
            </button>
        </div>
    );
}

export default PeriodSwitcher;
