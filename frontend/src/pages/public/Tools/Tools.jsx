
import { useState } from "react";
import { CtaSection, Hero, QuickLinks, SearchBar } from "@/components";
import "./Tools.css";
import ToolsData from "./ToolsData";
import {
    Calculator,
    Simulators,
    SimulationExample,
    Benefits,
    Interpretation,
} from "./sections";

function Tools() {
    const page = ToolsData;
    const classVariant = "tools";
    const { search, suggestions, suggestionsLabel } = page.hero;

    // La recherche du hero filtre la liste des simulateurs plus bas dans la page
    const [query, setQuery] = useState("");

    const scrollToSimulators = () => {
        document
            .getElementById("simulators")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Hero
                page={page}
                variant={classVariant}
            >
                <SearchBar
                    label={search.label}
                    placeholder={search.placeholder}
                    buttonLabel={search.buttonLabel}
                    value={query}
                    onChange={setQuery}
                    onSubmit={scrollToSimulators}
                />

                <QuickLinks
                    items={suggestions}
                    label={suggestionsLabel}
                />
            </Hero>

            <Calculator page={page} />

            <Simulators page={page} query={query} />

            <SimulationExample page={page} />

            <Benefits page={page} />

            <Interpretation page={page} />

            <CtaSection page={page} />
        </>
    );
}

export default Tools;
