import {
    ArticleCard,
    CardsSection,
    CtaSection,
    Hero,
    IconList,
    MediaSection,
    SearchBar,
    StepList,
    TestimonialCard,
} from "@/components";
import AdvicesData from "./AdvicesData";

function Advices() {
    const page = AdvicesData;
    const { search } = page.hero;

    // Recherche non branchée pour l'instant : on amène l'utilisateur aux thèmes.
    const goToThemes = () => {
        document
            .getElementById(search.targetId)
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Hero
                page={page}
                variant="advices"
            >
                <SearchBar
                    label={search.label}
                    placeholder={search.placeholder}
                    buttonLabel={search.buttonLabel}
                    onSubmit={goToThemes}
                />
            </Hero>

            <CardsSection section={page.themes} />

            <CardsSection section={page.popularGuides} component={ArticleCard} />

            <CardsSection section={page.situations} />

            <MediaSection section={page.quickTips}>
                <IconList items={page.quickTips.items} variant="chips" />
            </MediaSection>

            <MediaSection section={page.gettingStarted}>
                <StepList steps={page.gettingStarted.steps} />
            </MediaSection>

            <CardsSection section={page.testimonials} component={TestimonialCard} />

            <CardsSection section={page.tools} />

            <CardsSection section={page.budgetMethods} />

            <CtaSection page={page} />
        </>
    );
}

export default Advices;
