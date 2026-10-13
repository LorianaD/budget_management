import { SectionContainer } from '../SectionContainer';

// Section en deux colonnes : en-tête + contenu d'un côté, illustration de l'autre.
// section = { header, image: { src, alt }, background? }
// layout : "split" (illustration à droite), "split-reverse" (à gauche)
// ou "highlight" (encadré bleu clair).
function MediaSection({ section, layout = "split", children }) {
    // SectionContainer préfixe la classe reçue : on y ajoute le fond gris si besoin
    const className = section.background === "muted"
        ? `${layout} section-container--muted`
        : layout;

    return (
        <SectionContainer section={section} className={className}>
            {children && (
                <div className="section-container__content">
                    {children}
                </div>
            )}

            {section.image && (
                <div className="section-container__media">
                    <img src={section.image.src} alt={section.image.alt} />
                </div>
            )}
        </SectionContainer>
    );
}

export default MediaSection;
