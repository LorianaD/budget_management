import { Link } from "react-router";

const EXTERNAL_URL = /^https?:\/\//;
const NATIVE_URL = /^(#|mailto:|tel:)/;

// Choisit le bon élément selon l'URL :
// - lien externe  -> <a> dans un nouvel onglet
// - ancre, mail, téléphone -> <a> natif
// - route interne -> <Link> de React Router (pas de rechargement de page)
function AppLink({ to, className = "", children, ...props }) {
    if (EXTERNAL_URL.test(to)) {
        return (
            <a
                href={to}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    if (NATIVE_URL.test(to)) {
        return (
            <a href={to} className={className} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Link to={to} className={className} {...props}>
            {children}
        </Link>
    );
}

export default AppLink;
