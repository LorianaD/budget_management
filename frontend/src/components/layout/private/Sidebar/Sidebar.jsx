import { Link, NavLink } from "react-router";
import { usePeriod } from "@/context";
import { useMobileMenu } from "@/hooks";
import { Avatar, MaskIcon } from "@/components/ui";
import { getInitials } from "@/utils";
import SidebarData from "./SidebarData";
import "./Sidebar.css";

// Private area navigation. Becomes a top bar with a drawer menu on small screens.
// user: current user, or undefined while loading / on error (the card is hidden).
function Sidebar({ user }) {
    const { logo, nav, navLabel, disabledReason, account, menuToggle } = SidebarData;
    const { isMenuOpen, toggleMenu } = useMobileMenu();
    const { linkWithPeriod } = usePeriod();

    return (
        <aside className="sidebar">
            {/* The aside spans the page height; this inner block stays in view */}
            <div className="sidebar__inner">
                <div className="sidebar__top">
                    <Link to={linkWithPeriod(logo.path)} className="sidebar__brand">
                        <span className="sidebar__brand-logo">
                            <MaskIcon src={logo.icon} />
                        </span>
                        {logo.title}
                    </Link>

                    <button
                        type="button"
                        className={`sidebar__toggle ${isMenuOpen ? "sidebar__toggle--open" : ""}`}
                        aria-label={isMenuOpen ? menuToggle.close : menuToggle.open}
                        aria-expanded={isMenuOpen}
                        aria-controls="sidebar-menu"
                        onClick={toggleMenu}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <div id="sidebar-menu" className={`sidebar__menu ${isMenuOpen ? "sidebar__menu--open" : ""}`}>
                    <nav aria-label={navLabel}>
                        <ul className="sidebar__nav">
                            {nav.map((item) => (
                                <li key={item.key}>
                                    {item.disabled ? (
                                        <span className="sidebar__link sidebar__link--disabled" aria-disabled="true">
                                            <MaskIcon src={item.icon} />
                                            {item.label}
                                            <span className="visually-hidden"> ({disabledReason})</span>
                                        </span>
                                    ) : (
                                        <NavLink
                                            to={item.isPublic ? item.path : linkWithPeriod(item.path)}
                                            className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                                        >
                                            <MaskIcon src={item.icon} />
                                            {item.label}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {user && (
                        <div className="sidebar__account">
                            <Avatar initials={getInitials(user.firstname, user.lastname)} tone="blue" />
                            <p className="sidebar__account-text">
                                <span className="sidebar__account-name">{user.firstname} {user.lastname}</span>
                                <span>{account.label}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
