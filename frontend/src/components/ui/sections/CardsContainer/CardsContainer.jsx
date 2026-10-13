import { Card } from '../../Card'
import './CardsContainer.css'

// Grille de cartes. `component` permet d'afficher un autre type de carte
// (ArticleCard, TestimonialCard...) avec la même grille ; `columns` fixe
// le nombre de colonnes sur grand écran.
function CardsContainer({ items, variant, columns, component: CardComponent = Card }) {
    const columnsClass = columns ? `cards-container--cols-${columns}` : "";

    return (
        <div className={`cards-container cards-container--${variant} ${columnsClass}`}>
            {items.map((item) => (
                <CardComponent
                    key={item.key}
                    item={item}
                />
            ))}
        </div>
    )
}

export default CardsContainer