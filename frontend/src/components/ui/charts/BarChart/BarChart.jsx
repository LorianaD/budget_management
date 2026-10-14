import { Bar } from "react-chartjs-2";
import { chartColors, prefersReducedMotion } from "../chartSetup";
import "./BarChart.css";

// Generic vertical bar chart, unaware of business data.
// bars = [{ key, label, fullLabel?, value }]: label is the axis label ("Juil"),
// fullLabel the one read in the text alternative ("Juillet 2026").
// Each bar is a pale fill topped by a coloured edge (color / fillColor).
//
// Accessibility: the canvas is decorative; the same figures are given in a
// visually hidden table (caption + columns = [label header, value header]).
function BarChart({
    bars,
    caption,
    columns,
    color = chartColors.blue,
    fillColor = chartColors.blueSoft,
    height = 220,
    formatValue = String,
}) {
    const data = {
        labels: bars.map((bar) => bar.label),
        datasets: [{
            data: bars.map((bar) => bar.value),
            backgroundColor: fillColor,
            hoverBackgroundColor: fillColor,
            borderColor: color,
            borderWidth: { top: 3 },
            borderSkipped: "bottom",
            maxBarThickness: 40,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: prefersReducedMotion() ? false : { duration: 600 },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: chartColors.tooltip,
                displayColors: false,
                callbacks: {
                    title: (items) => bars[items[0].dataIndex].fullLabel ?? bars[items[0].dataIndex].label,
                    label: (context) => formatValue(context.parsed.y),
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
            },
            y: {
                beginAtZero: true,
                border: { display: false },
                grid: { color: chartColors.track },
                ticks: { maxTicksLimit: 6, callback: (value) => formatValue(value) },
            },
        },
    };

    return (
        <figure className="bar-chart">
            <div className="bar-chart__canvas" style={{ "--bar-chart-height": `${height}px` }}>
                <Bar data={data} options={options} aria-hidden="true" />
            </div>

            {/* Hidden through a wrapper: a table ignores the 1px width of .visually-hidden */}
            <div className="visually-hidden">
                <table>
                    <caption>{caption}</caption>
                    <thead>
                        <tr>
                            <th scope="col">{columns[0]}</th>
                            <th scope="col">{columns[1]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bars.map((bar) => (
                            <tr key={bar.key}>
                                <th scope="row">{bar.fullLabel ?? bar.label}</th>
                                <td>{formatValue(bar.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </figure>
    );
}

export default BarChart;
