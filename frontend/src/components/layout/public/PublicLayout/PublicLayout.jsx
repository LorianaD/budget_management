import { Outlet } from "react-router";
import { useScrollOnNavigate } from "@/hooks";
import { Header } from "../Header";
import { Footer } from "../Footer";

function PublicLayout() {
    useScrollOnNavigate();

    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default PublicLayout;