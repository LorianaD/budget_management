import { Button, DashboardHeader } from "@/components";
import {
    MethodChooser,
    MethodComparison,
    MethodList,
    MethodSimulator,
    MethodTestimonials,
    MethodsClosing,
    RecommendedMethod,
} from "./sections";
import MethodsData from "./MethodsData";
import "./Methods.css";

// Educational page: static content and a client-side simulator, no data loading
function Methods() {
    const { header } = MethodsData;

    return (
        <>
            <DashboardHeader title={header.title} subtitle={header.subtitle}>
                <div className="methods__header-actions">
                    <Button variant={header.action.variant} size="small" label={header.action.label} link={header.action.link} />
                </div>
            </DashboardHeader>

            <div className="methods">
                <RecommendedMethod />
                <MethodList />
                <MethodComparison />
                <MethodSimulator />
                <MethodChooser />
                <MethodTestimonials />
                <MethodsClosing />
            </div>
        </>
    );
}

export default Methods;
