import { chartColors } from "../chartSetup";
import { DoughnutChart } from "../DoughnutChart";

// Progress ring: `value` out of `max`, drawn as a filled arc and the remaining track.
// Values above max fill the ring; a max of 0 shows an empty track.
function GaugeChart({ value, max, color = chartColors.blue, size, cutout, children }) {
    const filled = max > 0 ? Math.min(Math.max(value, 0), max) : 0;

    const segments = [
        { key: "filled", label: "filled", value: filled, color },
        { key: "rest", label: "rest", value: max > 0 ? max - filled : 1, color: chartColors.track },
    ];

    return (
        <DoughnutChart segments={segments} size={size} cutout={cutout} showTooltip={false}>
            {children}
        </DoughnutChart>
    );
}

export default GaugeChart;
