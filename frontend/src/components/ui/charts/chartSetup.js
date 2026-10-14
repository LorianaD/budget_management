import { ArcElement, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from "chart.js";

// Registers only the Chart.js pieces the charts use (keeps the bundle small):
// arcs for the rings, bars and their two scales for BarChart.
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip);

Chart.defaults.font.family = "Geist, sans-serif";
Chart.defaults.color = "#4A5568";

// Canvas cannot read CSS custom properties: these mirror src/styles/variables.css
export const chartColors = {
    blue: "#1565C0",
    green: "#2E7D32",
    orange: "#F9A825",
    red: "#E53935",
    // Pale blue fill of the bars (Figma "Évolution de votre épargne")
    blueSoft: "rgba(21, 101, 192, 0.12)",
    track: "#F0F0F0",
    tooltip: "#1A202C",
};

export const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
