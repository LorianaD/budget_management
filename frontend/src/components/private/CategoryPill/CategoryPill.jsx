import { MaskIcon } from "@/components/ui";
import { getCategoryAppearance } from "@/data";
import "./CategoryPill.css";

// Category name in a pill tinted with the category colour. The icon takes the
// colour; the text stays dark so it is readable whatever the colour.
function CategoryPill({ categoryName }) {
    const { icon, color } = getCategoryAppearance(categoryName);

    return (
        <span className="category-pill" style={{ "--category-color": color }}>
            <MaskIcon src={icon} size={14} className="category-pill__icon" />
            {categoryName}
        </span>
    );
}

export default CategoryPill;
