
import { Icon, Image, SectionContainer } from "@/components";

function Interpretation({ page }) {
    const section = page.interpretation;

    return (
        <SectionContainer section={section}>
            <div className="section-interpretation__contents">
                <div className="section-interpretation__list">
                    {section.items.map((item) => (
                        <div
                            key={item.key}
                            className="section-interpretation__item"
                        >
                            <Icon
                                src={item.icon.src}
                                className={item.icon.className}
                            />

                            <div className="section-interpretation__item-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {section.image?.src && (
                    <Image
                        src={section.image.src}
                        alt={section.image.alt}
                    />
                )}
            </div>
        </SectionContainer>
    );
}

export default Interpretation;