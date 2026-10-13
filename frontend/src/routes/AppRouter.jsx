import { Route, Routes } from "react-router";
import PublicRoutes from "./PublicRoutes";

function AppRouter() {
    return (
        <Routes>
            <Route path="/*" element={<PublicRoutes />} />
        </Routes>
    );
}

export default AppRouter;