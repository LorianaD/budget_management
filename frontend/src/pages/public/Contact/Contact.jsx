import { Hero } from "@/components";
import ContactData from "./ContactData"

function Contact() {
    const page = ContactData;

    return (
        <>
            <Hero
                page={page}
                variant="contact"
            />
        </>
    )
}

export default Contact