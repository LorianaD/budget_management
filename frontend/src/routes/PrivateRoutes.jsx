import { Route, Routes } from "react-router";
import { PrivateLayout } from "@/components";
import { Budget, Dashboard, Expenses, Methods, MyAids, SavingGoals } from "@/pages/private";
import { LinksData } from "@/data";
import ProtectedRoute from "./ProtectedRoute";

// Private area pages (dashboard, budget, transactions, saving goals, budget
// methods, financial aids).
// Mounted by PublicRoutes as its catch-all route, so the layout stays mounted
// while navigating between private pages.
function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                    <Route path={LinksData.dashboard.path} element={<Dashboard />} />
                    <Route path={LinksData.budget.path} element={<Budget />} />
                    <Route path={LinksData.expenses.path} element={<Expenses />} />
                    <Route path={LinksData.savingGoals.path} element={<SavingGoals />} />
                    <Route path={LinksData.budgetMethods.path} element={<Methods />} />
                    <Route path={LinksData.myAids.path} element={<MyAids />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;
