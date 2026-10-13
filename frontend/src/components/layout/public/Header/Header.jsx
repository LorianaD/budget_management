
import { Link, NavLink } from "react-router";
import HeaderData from "./HeaderData";
import { Button } from "@/components/ui";
import "./Header.css";
import { useMobileMenu } from "@/hooks";

function Header() {
    const data = HeaderData;
    const logo = data.logo;
    const nav = data.nav;
    const auth = data.auth;

    const {
        isMenuOpen,
        toggleMenu,
        closeMenu,
    } = useMobileMenu();

    return (
        <header className="public-header">
            <Link to="/" className="public-header__brand">
                <div className="public-header__brand-logo">
                    <img
                        src={logo.img}
                        alt=""
                        className="public-header__brand-logo-img"
                    />
                </div>

                <span className="public-header__brand-title">
                    {logo.title}
                </span>
            </Link>

            <button
                type="button"
                className={`public-header__menu-toggle ${
                    isMenuOpen ? "public-header__menu-toggle--open" : ""
                }`}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
                aria-controls="public-header-menu"
                onClick={toggleMenu}
            >
                <span />
                <span />
                <span />
            </button>

            <div
                id="public-header-menu"
                className={`public-header__right-side ${
                    isMenuOpen ? "public-header__right-side--open" : ""
                }`}
            >
                <nav
                    className="public-header__nav"
                    aria-label="Navigation principale"
                >
                    {nav.map((link) => (
                        <NavLink
                            key={link.key}
                            to={link.path}
                            end={link.path === "/"}
                            className={({ isActive }) =>
                                `public-header__nav-link ${
                                    isActive
                                        ? "public-header__nav-link--active"
                                        : ""
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="public-header__auth">
                    <Button
                        label={auth.loginButton.label}
                        variant={auth.loginButton.variant}
                        link={auth.loginButton.path}
                        onClick={closeMenu}
                    />

                    <Button
                        label={auth.registerButton.label}
                        variant={auth.registerButton.variant}
                        link={auth.registerButton.path}
                        onClick={closeMenu}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
