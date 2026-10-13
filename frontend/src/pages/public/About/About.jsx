import { Hero } from "@/components";
import AboutData from "./AboutData";

function About() {
    const page = AboutData;

    return (
        <>
            <Hero
                page={page}
                variant={page.hero.variant}
            />
        </>
    )
}

export default About;