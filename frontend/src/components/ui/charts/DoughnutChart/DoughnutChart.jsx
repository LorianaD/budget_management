import { Doughnut } from "react-chartjs-2";
import { prefersReducedMotion } from "../chartSetup";
import "./DoughnutChart.css";

// Generic ring chart (distribution or progress), unaware of business data.
// segments = [{ key, label, value, color }]
// children: HTML shown in the centre (amount, percentage...).
//
// Accessibility: the canvas is decorative. The information must be given as
// text, in the centre (children) or next to the chart (legend, figures).
function DoughnutChart({ segments, size = 160, cutout = "85%", showTooltip = true, formatValue = String, children }) {
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
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: showTooltip,
                callbacks: { label: (context) => ` ${context.label} : ${formatValue(context.parsed)}` },
            },
        },
    };

    return (
        <div className="doughnut-chart" style={{ "--doughnut-size": `${size}px` }}>
            <Doughnut data={data} options={options} aria-hidden="true" />

            {children && <div className="doughnut-chart__center">{children}</div>}
        </div>
    );
}

export default DoughnutChart;
