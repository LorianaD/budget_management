
import { CardsContainer, SectionContainer } from "@/components";
import { normalizeText } from "@/utils";

// La liste est filtrée par la recherche du hero (état géré dans la page Tools).
function Simulators({ page, query = "" }) {
    const section = page.simulators;
    const normalizedQuery = normalizeText(query);

    const items = section.items.filter((item) =>
        normalizeText(`${item.title} ${item.description}`).includes(normalizedQuery)
    );

    return (
        <SectionContainer section={section} id="simulators" className="muted">
            {items.length > 0 ? (
                <CardsContainer
                    items={items}
                    variant={section.variant}
                />
            ) : (
                <p className="section-simulators__empty" role="status">
                    {section.emptyMessage}
                </p>
            )}
        </SectionContainer>
    );
}

export default Simulators;
