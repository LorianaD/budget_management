import { contactHeroImg } from "@/assets"

const ContactData = {
    hero: {
        eyebrow: {
            label: "Support et contact",
            variant: "info",
        },

        title: "Contactez-nous",

        description: "Une question, une suggestion ou un besoin d'accompagnement ? Nous sommes à votre écoute.",

        // stats: [
        //     {
        //         key: "users",
        //         value: "12 000+",
        //         label: "Utilisateurs",
        //     },
        //     {
        //         key: "free",
        //         value: "50+",
        //         label: "Ressources gratuites",
        //     },
        //     {
        //         key: "Independant",
        //         value: "100%",
        //         label: "Indépendant",
        //     },
        // ],

        // actions: [
        //     {
        //         key: "join",
        //         label: "Rejoindre la communauté",
        //         link: "/register",
        //         variant: "primary-white",
        //     },
        //     {
        //         key: "discover",
        //         label: "Découvrir les discussions",
        //         link: "#popular-discussions",
        //         variant: "outline-white",
        //     },
        // ],

        image: {
            src: contactHeroImg,
            alt: "Illustration de personnes qui échange",
        },

        variant: "contact",
    },
}

export default ContactData