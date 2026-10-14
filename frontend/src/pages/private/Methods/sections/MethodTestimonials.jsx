import { useId } from "react";
import { TestimonialCard } from "@/components";
import MethodsData from "../MethodsData";

const texts = MethodsData.testimonials;

// Fictional testimonials, labelled as such
function MethodTestimonials() {
    const titleId = useId();

    return (
        <section className="methods__section" aria-labelledby={titleId}>
            <div className="methods__section-header">
                <h2 id={titleId} className="methods__section-title">{texts.title}</h2>
                <p className="methods__note">{texts.note}</p>
            </div>
            <div className="method-testimonials">
                {texts.items.map((item) => <TestimonialCard key={item.key} item={item} />)}
            </div>
        </section>
    );
}

export default MethodTestimonials;
