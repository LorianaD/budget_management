import { CardsContainer, SectionContainer } from "@/components"

function FeaturesSection({ page }) {
    const section = page.features;
    return (
        <SectionContainer section={section}>
            <CardsContainer
                items={section.items}
            />
        </SectionContainer>
    )
}

export default FeaturesSection