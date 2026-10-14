import { useId } from "react";
import { Card, IconList, SectionContainer, StepList } from "@/components";
import MyAidsData from "../MyAidsData";

const { steps, documents, tips, officialSites, notice } = MyAidsData;

// Practical guidance: application steps, documents, tips, official websites
// and the "not a public body" notice. Static content.
function AidGuidance() {
    const tipsTitleId = useId();
    const sitesTitleId = useId();

    const panel = (title, description) => ({
        header: { title, description, variant: "panel", titleVariant: "panel", descriptionVariant: "panel" },
    });

    return (
        <>
            <SectionContainer section={panel(steps.title, steps.description)} className="panel">
                <StepList steps={steps.items} layout="horizontal" />
            </SectionContainer>

            <SectionContainer section={panel(documents.title)} className="panel">
                <IconList items={documents.items} variant="documents" />
            </SectionContainer>

            <section className="my-aids__section" aria-labelledby={tipsTitleId}>
                <div className="my-aids__section-header">
                    <h2 id={tipsTitleId} className="my-aids__section-title">{tips.title}</h2>
                    <p>{tips.description}</p>
                </div>
                <ul className="aid-tips">
                    {tips.items.map((tip) => <li key={tip.id}><Card item={tip} /></li>)}
                </ul>
            </section>

            <section className="my-aids__section" aria-labelledby={sitesTitleId}>
                <div className="my-aids__section-header">
                    <h2 id={sitesTitleId} className="my-aids__section-title">{officialSites.title}</h2>
                    <p>{officialSites.description}</p>
                </div>
                <ul className="official-sites">
                    {officialSites.items.map((site) => <li key={site.id}><Card item={site} /></li>)}
                </ul>
            </section>

            <SectionContainer section={panel(notice.title)} className="tip">
                <p className="my-aids__notice">{notice.text}</p>
            </SectionContainer>
        </>
    );
}

export default AidGuidance;
