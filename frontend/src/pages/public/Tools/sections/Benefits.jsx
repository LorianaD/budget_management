
import { CardsContainer, SectionContainer } from "@/components";

function Benefits({ page }) {
    const section = page.benefits;

    return (
        <SectionContainer section={section} className="muted">
            <CardsContainer
                items={section.items}
                variant={section.variant}
            />
        </SectionContainer>
    );
}

export default Benefits;
