import "./RatingDots.css";

// Score shown as filled dots ("3 out of 5"). The dots are decorative: the
// score is given as text to screen readers (label, e.g. "3 sur 5").
// tone: colour of the filled dots (blue, green, orange, teal).
function RatingDots({ value, max = 5, label, tone = "blue" }) {
    const dots = Array.from({ length: max }, (_, index) => index < value);

    return (
        <span className={`rating-dots rating-dots--${tone}`}>
            <span className="rating-dots__dots" aria-hidden="true">
                {dots.map((isFilled, index) => (
                    <span key={index} className={`rating-dots__dot ${isFilled ? "rating-dots__dot--filled" : ""}`} />
                ))}
            </span>
            <span className="visually-hidden">{label}</span>
        </span>
    );
}

export default RatingDots;
