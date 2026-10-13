import { Button } from '../../Button';
import { SectionEyebrow } from '../../SectionEyebrow';
import './SectionContainer.css';

// headerExtra : contenu optionnel inséré entre la description et les boutons
// (ex. chiffres clés), sur le modèle de `children` dans Hero.
// section.header.eyebrow : étiquette au-dessus du titre.
// section.header.note : mention sous la description (ex. contenus fictifs).
function SectionContainer({ section, children, className = "default", id = section.id, headerExtra }) {
    const actions = section.actions ?? [];
    const { eyebrow, note } = section.header;

    return (
        <section id={id} className={`section-container section-container--${className}`}>
            <div className={`section-container__header section-container__header--${section.header.variant}`}>
                {eyebrow && (
                    <SectionEyebrow
                        label={eyebrow.label}
                        variant={eyebrow.variant}
                    />
                )}

                {section.header.title && (
                    <h2 className={`section-container__title section-container__title--${section.header.titleVariant}`}>
                        {section.header.title}
                    </h2>
                )}

                {section.header.description && (
                    <p className={`section-container__description section-container__description--${section.header.descriptionVariant}`}>
                        {section.header.description}
                    </p>
                )}

                {note && (
                    <p className="section-container__note">{note}</p>
                )}

                {headerExtra}

                {actions.length > 0 && (
                    <div className={`section-container__actions section-container__actions--${className}`}>
                        {actions.map((btn) => (
                            <Button
                                key={btn.key}
                                label={btn.label}
                                variant={btn.variant}
                                link={btn.link}
                            />
                        ))}
                    </div>
                )}
            </div>

            {children}
        </section>
    );
}

export default SectionContainer;