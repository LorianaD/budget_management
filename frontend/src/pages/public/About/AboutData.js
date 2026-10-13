import { AboutHeroImg } from "@/assets"

const AboutData = {
    hero: {
        eyebrow: {
            label: "Notre histoire",
            variant: "info",
        },

        title: "Notre mission",

        description: "Aider chacun à mieux comprendre, gérer et améliorer sa situation financière grâce à des outils simples, des conseils pratiques et des informations accessibles.",

        stats: [
            {
                key: "users",
                value: "12 000+",
                label: "Utilisateurs",
            },
            {
                key: "free",
                value: "50+",
                label: "Ressources gratuites",
            },
            {
                key: "Independant",
                value: "100%",
                label: "Indépendant",
            },
        ],

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
            src: AboutHeroImg,
            alt: "Illustration d'un groupe de personnes pour échanger et s'entraider",
        },

        variant: "about",
    },
}

export default AboutData