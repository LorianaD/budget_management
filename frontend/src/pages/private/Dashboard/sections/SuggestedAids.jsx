import { Card, SectionContainer } from "@/components";
import DashboardData from "../DashboardData";

const texts = DashboardData.suggestedAids;

function SuggestedAids() {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            <ul className="suggested-aids">
                {texts.items.map((aid) => (
                    <li key={aid.id}>
                        <Card item={aid} />
                    </li>
                ))}
            </ul>
        </SectionContainer>
    );
}

export default SuggestedAids;
