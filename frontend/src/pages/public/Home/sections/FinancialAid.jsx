import { CardsContainer, SectionContainer } from "@/components"

function FinancialAidSection({ page }) {
    const section = page.financialAid;
    return (
        <SectionContainer section={section}>
            <div className="section-financial-aid__contents">
                <div className="section-financial-aid__picture">
                    <img src={section.image} alt="" />
                </div>
                <CardsContainer
                    items={section.items}
                    variant={section.variant}
                />
            </div>
        </SectionContainer>
    )
}

export default FinancialAidSection