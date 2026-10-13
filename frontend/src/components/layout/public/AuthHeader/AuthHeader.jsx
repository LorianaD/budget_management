import { Link, NavLink, useLocation } from "react-router";
import { LinksData } from "@/data";
import { Button } from "@/components/ui";
import AuthHeaderData from "./AuthHeaderData";
import "./AuthHeader.css";

// Lightweight header of the auth pages (Figma 68:275 and 69:275):
// reduced navigation on login, "Se connecter" prompt on register.
function AuthHeader() {
    const { pathname } = useLocation();
    const { logo, nav, loginPrompt } = AuthHeaderData;
    const isRegisterPage = pathname === LinksData.register.path;

    return (
        <header className="auth-header">
            <Link to={LinksData.home.path} className="auth-header__brand">
                <span className="auth-header__brand-logo">
                    <img src={logo.img} alt="" />
                </span>
                {logo.title}
            </Link>

            {isRegisterPage ? (
                <div className="auth-header__prompt">
                    <span>{loginPrompt.text}</span>
                    <Button
                        label={loginPrompt.label}
                        link={loginPrompt.path}
                        variant="outline"
                        size="small"
                    />
                </div>
            ) : (
                <nav className="auth-header__nav" aria-label="Navigation principale">
                    {nav.map((link) => (
                        <NavLink
                            key={link.key}
                            to={link.path}
                            end={link.path === "/"}
                            className="auth-header__nav-link"
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
}

export default AuthHeader;
