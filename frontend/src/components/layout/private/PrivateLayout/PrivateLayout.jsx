import { Outlet } from "react-router";
import { PeriodProvider } from "@/context";
import { useAsyncResource, useScrollOnNavigate } from "@/hooks";
import { getCurrentUser, isMockMode } from "@/services";
import { MaskIcon } from "@/components/ui";
import { Sidebar } from "../Sidebar";
import PrivateLayoutData from "./PrivateLayoutData";
import "./PrivateLayout.css";

// Shell of the private area. Loads the current user once and passes it to
// the pages through the outlet context (useOutletContext), so no page refetches it.
function PrivateLayout() {
    useScrollOnNavigate();

    const { data: user } = useAsyncResource("current-user", getCurrentUser);
    const { demoNotice } = PrivateLayoutData;

    return (
        <PeriodProvider>
            <div className="private-layout">
                <Sidebar user={user} />

                <div className="private-layout__main">
                    {isMockMode && (
                        <p className="private-layout__demo-notice">
                            <MaskIcon src={demoNotice.icon} size={16} />
                            {demoNotice.text}
                        </p>
                    )}

                    <main className="private-layout__content">
                        <Outlet context={{ user }} />
                    </main>
                </div>
            </div>
        </PeriodProvider>
    );
}

export default PrivateLayout;
