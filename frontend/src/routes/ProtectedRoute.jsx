import { Navigate, Outlet } from "react-router";
import { LinksData } from "@/data";

function ProtectedRoute() {
    // No authentication yet: the private area is open as a demonstration
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to={LinksData.login.path} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
