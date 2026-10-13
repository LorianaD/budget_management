import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

// Les composants de l'espace privé n'existent pas encore (étape 5 de l'audit).
// Les routes seront réactivées une fois PrivateLayout et les pages créés,
// puis ce composant sera monté dans AppRouter.
function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                {/*
                <Route element={<PrivateLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/incomes" element={<Incomes />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/saving-goals" element={<SavingGoals />} />
                </Route>
                */}
            </Route>
        </Routes>
    );
}

export default PrivateRoutes;