import { callRoute, declaredRoute, ROUTE_STATUS } from "@/services/http";

// backend/src/Controller/Api/UserController.php — #[Route('/user')]
// The controller is not under /api and its namespace (App\Controller) does
// not match its folder (Api/): both are expected to change with authentication.
const routes = {
    current: declaredRoute("GET", "/user", ROUTE_STATUS.PLACEHOLDER),
};

export const getCurrentUser = (options) =>
    callRoute(routes.current, { ...options });
