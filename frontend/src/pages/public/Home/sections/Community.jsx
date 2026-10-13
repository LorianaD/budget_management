import { SectionContainer, StatList } from "@/components"

function CommunitySection({ page }) {
    const section = page.community;
    return (
        <SectionContainer
            section={section}
            className="community"
            headerExtra={
                <StatList
                    items={section.stats}
                    variant="light"
                    note={section.statsNote}
                />
            }
        >
            <div className="section-community__contents">
                <div className="section-community__picture">
                    <img src={section.image} alt="" />
                </div>
            </div>

        </SectionContainer>
    )
}

export default CommunitySection