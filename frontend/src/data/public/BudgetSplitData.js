// Fixed income splits of the budget methods that have one, shared by the
// public 50/30/20 calculator (Tools) and the private methods simulator.
// Colours are hex values: they are also read by the charts.
const BudgetSplitData = {
    fiftyThirtyTwenty: {
        label: "50/30/20",
        allocations: [
            { key: "needs", label: "Besoins essentiels", shortLabel: "Besoins", percentage: 50, color: "#1565C0" },
            { key: "wants", label: "Envies", shortLabel: "Envies", percentage: 30, color: "#F57C00" },
            { key: "savings", label: "Épargne", shortLabel: "Épargne", percentage: 20, color: "#2E7D32" },
        ],
    },
};

export default BudgetSplitData;
