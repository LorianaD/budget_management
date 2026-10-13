import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { AuthLayout, PublicLayout } from "@/components";
import { About, Advices, Community, Contact, FinancialAids, Home, Login, Register, Tools } from "@/pages/public";

// The private area (and Chart.js) is a separate chunk, loaded on first visit
const PrivateRoutes = lazy(() => import("./PrivateRoutes"));

function PublicRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="tools" element={<Tools />} />
                <Route path="advices" element={<Advices />} />
                <Route path="helps" element={<FinancialAids />} />
                <Route path="community" element={<Community />}/>
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
            </Route>

            {/* Login and register: lightweight header and footer */}
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Any other URL is handed to the private area */}
            <Route path="*" element={<Suspense fallback={null}><PrivateRoutes /></Suspense>} />
        </Routes>

    )
}

export default PublicRoutes;
