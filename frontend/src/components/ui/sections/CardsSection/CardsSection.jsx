import { CardsContainer } from '../CardsContainer';
import { SectionContainer } from '../SectionContainer';

// Section « titre + grille de cartes », le cas le plus courant des pages.
// section = { id?, header, items, variant?, columns?, background? }
// component : type de carte à afficher (Card par défaut).
function CardsSection({ section, component }) {
    return (
        <SectionContainer section={section} className={section.background}>
            <CardsContainer
                items={section.items}
                variant={section.variant}
                columns={section.columns}
                component={component}
            />
        </SectionContainer>
    );
}

export default CardsSection;
