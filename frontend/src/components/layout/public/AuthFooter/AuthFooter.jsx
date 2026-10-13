import { Link } from "react-router";
import AuthFooterData from "./AuthFooterData";
import "./AuthFooter.css";

function AuthFooter() {
    const { copyright, links } = AuthFooterData;

    return (
        <footer className="auth-footer">
            <p className="auth-footer__copyright">{copyright}</p>

            <ul className="auth-footer__links">
                {links.map((link) => (
                    <li key={link.key}>
                        {link.disabled ? (
                            <span className="auth-footer__link auth-footer__link--disabled">
                                {link.label}
                                <span className="visually-hidden"> ({link.disabledReason})</span>
                            </span>
                        ) : (
                            <Link to={link.path} className="auth-footer__link">
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </footer>
    );
}

export default AuthFooter;
