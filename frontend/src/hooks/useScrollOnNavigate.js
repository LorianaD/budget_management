import { useEffect } from "react";
import { useLocation } from "react-router";

// BrowserRouter ne gère pas le défilement lors d'une navigation :
// - nouvelle page sans ancre -> retour en haut ;
// - lien avec ancre (/advices#method-50-30-20) -> défilement vers l'élément.
function useScrollOnNavigate() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const target = document.getElementById(decodeURIComponent(hash.slice(1)));

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }

        window.scrollTo(0, 0);
    }, [pathname, hash]);
}

export default useScrollOnNavigate;
