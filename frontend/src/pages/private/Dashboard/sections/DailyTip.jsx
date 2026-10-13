import { MaskIcon, SectionContainer, TextLink } from "@/components";
import DashboardData from "../DashboardData";

const texts = DashboardData.dailyTip;

function DailyTip() {
    const section = {
        header: {
            title: (
                <>
                    <MaskIcon src={texts.icon} size={18} />
                    {texts.title}
                </>
            ),
            variant: "panel",
            titleVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="tip">
            <p className="daily-tip__text">{texts.text}</p>
            <TextLink link={texts.link} />
        </SectionContainer>
    );
}

export default DailyTip;
