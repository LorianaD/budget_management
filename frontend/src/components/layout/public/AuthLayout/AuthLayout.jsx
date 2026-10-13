import { Outlet } from "react-router";
import { useScrollOnNavigate } from "@/hooks";
import { AuthHeader } from "../AuthHeader";
import { AuthFooter } from "../AuthFooter";

// Layout of the login and register pages: lightweight header and footer
// keep the attention on the form.
function AuthLayout() {
    useScrollOnNavigate();

    return (
        <>
            <AuthHeader />

            <main>
                <Outlet />
            </main>

            <AuthFooter />
        </>
    );
}

export default AuthLayout;
