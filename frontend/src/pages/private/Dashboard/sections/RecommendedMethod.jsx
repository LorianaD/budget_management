import { Card, MaskIcon, SectionContainer } from "@/components";
import DashboardData from "../DashboardData";

const texts = DashboardData.recommendedMethod;

function RecommendedMethod() {
    const section = {
        header: {
            title: (
                <>
                    <MaskIcon src={texts.icon} size={16} />
                    {texts.title}
                </>
            ),
            variant: "panel",
            titleVariant: "panel-label",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            <Card item={texts.card} />
        </SectionContainer>
    );
}

export default RecommendedMethod;
