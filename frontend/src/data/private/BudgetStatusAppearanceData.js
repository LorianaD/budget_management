// Presentation of the budget statuses computed by getBudgetStatus (utils/financial):
// bar colour (hex, readable by Chart.js) and Badge variant. Shared by every
// page showing budget statuses so the same rule always gets the same colours.
const BudgetStatusAppearanceData = {
    ok: { color: "#2E7D32", badge: "soft-success" },
    warning: { color: "#F9A825", badge: "soft-warning" },
    over: { color: "#E53935", badge: "soft-danger" },
};

export function getBudgetStatusAppearance(status) {
    return BudgetStatusAppearanceData[status];
}

export default BudgetStatusAppearanceData;
