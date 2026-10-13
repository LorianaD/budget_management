import { Route, Routes } from "react-router";
import { PrivateLayout } from "@/components";
import { Dashboard } from "@/pages/private";
import ProtectedRoute from "./ProtectedRoute";

// Private area. Only the dashboard exists for now: the other pages (budget,
// incomes, expenses, saving-goals...) will be added here as they are built.
// Mounted by PublicRoutes as its catch-all route, so the layout stays mounted
// while navigating between private pages.
function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;
