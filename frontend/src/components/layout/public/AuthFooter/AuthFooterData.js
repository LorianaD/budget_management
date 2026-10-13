import { LinksData } from "@/data";
import FooterData from "../Footer/FooterData";

// Legal pages do not exist yet: their links are shown but disabled
const UNAVAILABLE_REASON = "page bientôt disponible";

const AuthFooterData = {
    copyright: `${FooterData.copyright.name} ${FooterData.copyright.year}`,

    links: [
        { ...LinksData.legalNotice, disabled: true, disabledReason: UNAVAILABLE_REASON },
        { ...LinksData.privacyPolicy, disabled: true, disabledReason: UNAVAILABLE_REASON },
        LinksData.contact,
    ],
};

export default AuthFooterData;
