import { Button, SectionContainer } from "@/components";
import SavingGoalsData from "../SavingGoalsData";

const texts = SavingGoalsData.motivation;

// Encouragement banner (Figma "Chaque euro compte"), illustration deferred
function MotivationBanner() {
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };

    return (
        <SectionContainer section={section} className="tip">
            <p className="motivation-banner__text">{texts.text}</p>
            <div className="motivation-banner__action">
                <Button
                    variant="primary"
                    size="small"
                    label={texts.button.label}
                    disabled
                    disabledReason={texts.button.disabledReason}
                />
            </div>
        </SectionContainer>
    );
}

export default MotivationBanner;
