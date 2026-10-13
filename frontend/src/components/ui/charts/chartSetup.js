import { ArcElement, Chart, Tooltip } from "chart.js";

// Registers only the Chart.js pieces the charts use (keeps the bundle small).
// Add BarElement, scales... here when a chart type needs them.
Chart.register(ArcElement, Tooltip);

Chart.defaults.font.family = "Geist, sans-serif";
Chart.defaults.color = "#4A5568";

// Canvas cannot read CSS custom properties: these mirror src/styles/variables.css
export const chartColors = {
    blue: "#1565C0",
    green: "#2E7D32",
    orange: "#F9A825",
    red: "#E53935",
    track: "#F0F0F0",
};

export const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
