import { TrustIndicators } from "../../TrustIndicators"
import { SectionContainer } from "../SectionContainer"

// Variante de section -> variante des indicateurs de confiance
const TRUST_VARIANTS = {
    "cta": "light",
    "cta-boxed": "center",
};

function CtaSection({ page, variant = "cta" }) {
    const section = page.callToAction;

    return (
        <SectionContainer
            section={section}
            className={variant}
        >
            <TrustIndicators
                items={section.trustIndicators}
                variant={TRUST_VARIANTS[variant]}
            />
        </SectionContainer>
    )
}

export default CtaSection