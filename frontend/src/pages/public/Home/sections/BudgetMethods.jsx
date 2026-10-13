import { CardsContainer, SectionContainer } from "@/components"

function BudgetMethodsSection({ page }) {
    const section = page.budgetMethods;

    return (
        <SectionContainer section={section} className="muted">
            <CardsContainer
                items={section.items}
            />
        </SectionContainer>
    )
}

export default BudgetMethodsSection