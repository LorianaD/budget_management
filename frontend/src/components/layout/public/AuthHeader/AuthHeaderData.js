import { LinksData } from "@/data";
import HeaderData from "../Header/HeaderData";

const AuthHeaderData = {
    logo: HeaderData.logo,

    // Login page: reduced navigation
    nav: [
        LinksData.home,
        LinksData.advices,
        LinksData.helps,
    ],

    // Register page: link back to login
    loginPrompt: {
        text: "Déjà un compte ?",
        label: "Se connecter",
        path: LinksData.login.path,
    },
};

export default AuthHeaderData;
