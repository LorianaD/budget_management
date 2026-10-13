import { Navigate, Outlet } from "react-router";
import { LinksData } from "@/data";

function ProtectedRoute() {
    const isAuthenticated = true; // temporaire

    if (!isAuthenticated) {
        return <Navigate to={LinksData.login.path} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;