import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColors, prefersReducedMotion } from "../chartSetup";
import "./DoughnutChart.css";

// Generic ring chart (distribution or progress), unaware of business data.
// segments = [{ key, label, value, color }]
// children: HTML shown in the centre (amount, percentage...).
//
// Accessibility: the canvas is decorative. The information must be given as
// text, in the centre (children) or next to the chart (legend, figures).
//
// Tooltip vs centre text: the tooltip is drawn on the canvas, which sits above
// the centre text (see CSS), and the centre text fades out while a segment is
// hovered, so the two never overlap.
function DoughnutChart({ segments, size = 160, cutout = "85%", showTooltip = true, formatValue = String, children }) {
    const [isSegmentHovered, setIsSegmentHovered] = useState(false);

    const data = {
        labels: segments.map((segment) => segment.label),
        datasets: [{
            data: segments.map((segment) => segment.value),
            backgroundColor: segments.map((segment) => segment.color),
            borderWidth: 0,
            hoverOffset: 0,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout,
        animation: prefersReducedMotion() ? false : { duration: 600 },
        // Only called inside the chart area: leaving the chart is handled by onMouseLeave below
        onHover: showTooltip ? (_event, elements) => setIsSegmentHovered(elements.length > 0) : undefined,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: showTooltip,
                // Opaque (Chart.js default is 80 % black) so nothing shows through
                backgroundColor: chartColors.tooltip,
                callbacks: { label: (context) => ` ${context.label} : ${formatValue(context.parsed)}` },
            },
        },
    };

    return (
        <div
            className="doughnut-chart"
            style={{ "--doughnut-size": `${size}px` }}
            onMouseLeave={() => setIsSegmentHovered(false)}
        >
            <Doughnut data={data} options={options} aria-hidden="true" />

            {children && (
                <div className={`doughnut-chart__center ${isSegmentHovered ? "doughnut-chart__center--hidden" : ""}`}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default DoughnutChart;
