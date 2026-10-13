import { facebookIcon, house, instagramIcon, linkedinIcon, youtubeIcon } from "@/assets";
import { LinksData } from "@/data";

const FooterData = {
    brand: {
        logo: house,
        name: "Budget Manager",
        description: "Votre compagnon budgétaire, gratuit et bienveillant.",
        socialLinks: [
            {
                id: "facebook",
                label: "Facebook",
                icon: facebookIcon,
                url: "",
            },
            {
                id: "instagram",
                label: "Instagram",
                icon: instagramIcon,
                url: "",
            },
            {
                id: "linkedin",
                label: "LinkedIn",
                icon: linkedinIcon,
                url: "",
            },
            {
                id: "youtube",
                label: "YouTube",
                icon: youtubeIcon,
                url: "",
            },
        ],
    },

    navigation: [
        {
            id: "platform",
            title: "Plateforme",
            links: [
                LinksData.home,
                LinksData.tools,
                LinksData.advices,
                LinksData.about,
                LinksData.contact,
            ],
        },
        {
            id: "resources",
            title: "Ressources & Aides",
            links: [
                LinksData.socialRights,
                LinksData.caf,
                LinksData.mdph,
                LinksData.franceTravail,
                LinksData.servicePublic,
            ],
        },
    ],

    newsletter: {
        title: "Newsletter",
        placeholder: "Votre email",
        buttonLabel: "S'abonner",
    },

    copyright: {
        year: 2026,
        name: "Budget Manager",
        disclaimer: "Plateforme indépendante, sans lien avec les organismes cités.",
    },

    legalLinks: {
        id: "legal",
        title: "Informations légales",
        links: [
            LinksData.legalNotice,
            LinksData.privacyPolicy,
            LinksData.termsOfUse,
        ],
    },
};

export default FooterData;