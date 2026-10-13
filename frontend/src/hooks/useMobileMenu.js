
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function useMobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const [previousPathname, setPreviousPathname] = useState(pathname);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Fermer le menu lors d'un changement de page
    // (ajustement pendant le rendu plutôt que dans un useEffect)
    if (pathname !== previousPathname) {
        setPreviousPathname(pathname);
        setIsMenuOpen(false);
    }

    // Fermer avec Échap ou au retour sur desktop
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        const mediaQuery = window.matchMedia("(min-width: 901px)");

        const handleResize = (event) => {
            if (event.matches) {
                closeMenu();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        mediaQuery.addEventListener("change", handleResize);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, [isMenuOpen]);

    return {
        isMenuOpen,
        toggleMenu,
        closeMenu,
    };
}

export default useMobileMenu;
