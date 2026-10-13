import { house } from "@/assets";
import { LinksData } from "@/data";

const HeaderData = {
    logo: {
        img: house,
        title: "Budget Manager",
    },

    nav: [
        LinksData.home,
        LinksData.tools,
        LinksData.advices,
        LinksData.helps,
        LinksData.community,
    ],

    auth: {
        loginButton: {
            ...LinksData.login,
            variant: "outline",
        },

        registerButton: {
            ...LinksData.register,
            variant: "primary",
        }
    }
}

export default HeaderData;