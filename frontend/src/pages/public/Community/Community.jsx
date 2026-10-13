import {
    CardsSection,
    CtaSection,
    DiscussionCard,
    Hero,
    IconList,
    MediaSection,
    SectionContainer,
    StatList,
    TestimonialCard,
    TextLink,
} from "@/components";
import CommunityData from "./CommunityData";
import "./Community.css";

function Community() {
    const page = CommunityData;
    const { moderation } = page;

    return (
        <>
            <Hero
                page={page}
                variant="community"
            >
                <StatList
                    items={page.hero.stats}
                    variant="light"
                    note={page.hero.statsNote}
                />
            </Hero>

            <CardsSection section={page.popularDiscussions} component={DiscussionCard} />

            <CardsSection section={page.themes} />

            <CardsSection section={page.testimonials} component={TestimonialCard} />

            <CardsSection section={page.values} />

            <MediaSection section={page.features} layout="split-reverse">
                <IconList items={page.features.items} variant="stacked" />
            </MediaSection>

            <SectionContainer section={moderation} className="muted">
                <IconList items={moderation.items} variant="inline" />
                <TextLink link={moderation.link} />
            </SectionContainer>

            <CardsSection section={page.recentDiscussions} component={DiscussionCard} />

            <CtaSection page={page} />
        </>
    );
}

export default Community;
