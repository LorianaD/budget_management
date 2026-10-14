import "./ChartLegend.css";

// Text legend of a chart: the accessible counterpart of the decorative canvas.
// items = [{ key, label, value, color }] — value is already formatted.
function ChartLegend({ items }) {
    return (
        <ul className="chart-legend">
            {items.map((item) => (
                <li key={item.key} className="chart-legend__item" style={{ "--legend-color": item.color }}>
                    <span className="chart-legend__label">{item.label}</span>
                    <span className="chart-legend__value">{item.value}</span>
                </li>
            ))}
        </ul>
    );
}

export default ChartLegend;
