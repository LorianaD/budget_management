import './DonutChart.css';

// Écart de 1,5° entre les segments pour les distinguer sans compter sur la couleur seule.
const SEGMENT_GAP = 1.5;

function buildGradient(segments) {
    let start = 0;

    const stops = segments.map((segment) => {
        const end = start + (segment.percentage / 100) * 360;
        const stop = `${segment.color} ${start}deg ${end - SEGMENT_GAP}deg, transparent ${end - SEGMENT_GAP}deg ${end}deg`;
        start = end;
        return stop;
    });

    return `conic-gradient(${stops.join(", ")})`;
}

// Graphique en anneau en CSS pur (conic-gradient) : aucune bibliothèque nécessaire.
function DonutChart({ segments = [], centerLabel, legendTitle, size = "medium" }) {
    const description = segments
        .map((segment) => `${segment.label} ${segment.percentage} %`)
        .join(", ");

    return (
        <div className={`donut-chart donut-chart--${size}`}>
            <div
                className="donut-chart__ring"
                role="img"
                aria-label={`Répartition : ${description}`}
                style={{ "--donut-gradient": buildGradient(segments) }}
            >
                {centerLabel && (
                    <span className="donut-chart__center" aria-hidden="true">
                        {centerLabel}
                    </span>
                )}
            </div>

            {legendTitle && (
                <div className="donut-chart__legend">
                    <p className="donut-chart__legend-title">{legendTitle}</p>
                    <ul className="donut-chart__legend-list">
                        {segments.map((segment) => (
                            <li
                                key={segment.key}
                                className="donut-chart__legend-item"
                                style={{ "--legend-color": segment.color }}
                            >
                                {segment.label} — {segment.percentage}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DonutChart;
