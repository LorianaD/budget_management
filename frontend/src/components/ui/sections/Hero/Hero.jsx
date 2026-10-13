
import { Button } from "../../Button";
import { SectionEyebrow } from "../../SectionEyebrow";
import { TrustIndicators } from "../../TrustIndicators";
import "./Hero.css";

function Hero({ page, variant = "default", children }) {
    const {
        eyebrow,
        title,
        description,
        actions = [],
        trustIndicators = [],
        image,
    } = page.hero;

    return (
        <section className={`section-hero section-hero--${variant}`}>
            <div className="section-hero__left">
                <div className="section-hero__intro">
                    {eyebrow && (
                        <SectionEyebrow
                            label={eyebrow.label}
                            variant={eyebrow.variant}
                        />
                    )}

                    <h1 className="section-hero__title">{title}</h1>

                    {description && (
                        <p className="section-hero__description">
                            {description}
                        </p>
                    )}
                </div>

                {children && (
                    <div className="section-hero__extra">
                        {children}
                    </div>
                )}

                {actions.length > 0 && (
                <div className="section-hero__actions">
                    {actions.map((btn) => (
                        <Button
                            key={btn.label}
                            label={btn.label}
                            variant={btn.variant}
                            link={btn.link}
                        />
                    ))}
                </div>
                )}

                <TrustIndicators items={trustIndicators} />
            </div>

            {image && (
                <div className="section-hero__image">
                    <img src={image.src} alt={image.alt} />
                </div>
            )}
        </section>
    );
}

export default Hero;
