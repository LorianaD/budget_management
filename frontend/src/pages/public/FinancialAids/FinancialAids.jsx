import {
    ArticleCard,
    CardsSection,
    Hero,
    IconList,
    MediaSection,
    QuickLinks,
    SearchBar,
    SectionContainer,
    StepList,
} from "@/components";
import FinancialAidsData from "./FinancialAidsData";
import "./FinancialAids.css";

function FinancialAids() {
    const page = FinancialAidsData;
    const { search } = page.hero;
    const information = page.importantInformation;

    // Recherche non branchée pour l'instant : on amène l'utilisateur aux aides.
    const goToAids = () => {
        document
            .getElementById(search.targetId)
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Hero
                page={page}
                variant="green"
            >
                <SearchBar
                    label={search.label}
                    placeholder={search.placeholder}
                    buttonLabel={search.buttonLabel}
                    buttonVariant={search.buttonVariant}
                    onSubmit={goToAids}
                />
            </Hero>

            <CardsSection section={page.popularAids} />

            <CardsSection section={page.categories} />

            <CardsSection section={page.organizations} />

            <MediaSection section={page.applicationSteps}>
                <StepList steps={page.applicationSteps.steps} />
            </MediaSection>

            <SectionContainer section={page.requiredDocuments}>
                <IconList items={page.requiredDocuments.items} variant="documents" />
            </SectionContainer>

            <CardsSection section={page.guides} component={ArticleCard} />

            <MediaSection section={page.recommendations} layout="highlight" />

            <SectionContainer section={information} className="notice">
                <div className="section-notice__text">
                    {information.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>

                <QuickLinks
                    items={information.links}
                    label={information.linksLabel}
                    variant="notice"
                />
            </SectionContainer>
        </>
    );
}

export default FinancialAids;
