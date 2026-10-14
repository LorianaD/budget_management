import { star } from '@/assets';
import { Avatar } from '../Avatar';
import './TestimonialCard.css';

// Témoignage : note en étoiles, citation et auteur.
// item = { key, rating?, quote, author: { initials, name, profile }, tone?, variant? }
// Without rating, no stars are shown.
function TestimonialCard({ item }) {
    const stars = Array.from({ length: item.rating ?? 0 }, (_, index) => index);

    return (
        <figure className={`testimonial-card testimonial-card--${item.variant ?? "default"}`}>
            {item.rating > 0 && (
                <div className="testimonial-card__rating">
                    {stars.map((index) => (
                        <img key={index} src={star} alt="" className="testimonial-card__star" />
                    ))}
                    <span className="visually-hidden">Note : {item.rating} sur 5</span>
                </div>
            )}

            <blockquote className="testimonial-card__quote">
                <p>{item.quote}</p>
            </blockquote>

            <figcaption className="testimonial-card__author">
                <Avatar
                    initials={item.author.initials}
                    tone={item.tone ?? "light"}
                    size={item.variant === "community" ? "large" : "medium"}
                />

                <span className="testimonial-card__author-text">
                    <span className="testimonial-card__name">{item.author.name}</span>
                    <span className="testimonial-card__profile">{item.author.profile}</span>
                </span>
            </figcaption>
        </figure>
    );
}

export default TestimonialCard;
