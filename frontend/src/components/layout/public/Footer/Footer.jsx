import { Link } from "react-router";
import FooterData from "./FooterData";
import { AppLink, Button } from "@/components/ui";
import './Footer.css'

function Footer() {
    const data = FooterData;

    return (
        <footer className="public-footer">
            <div className="public-footer__top">
                <div className="public-footer__branding">
                    <div className="public-footer__brand">
                        <div className="public-footer__brand-logo">
                            <img src={data.brand.logo} alt="" className="public-footer__brand-logo-img" />
                        </div>
                        <span className="public-footer__brand-name">
                            {data.brand.name}
                        </span>
                    </div>

                    <p className="public-footer__description">
                        {data.brand.description}
                    </p>

                    <div className="public-footer__social-links">
                        {/* Les réseaux sans URL sont masqués jusqu'à ce qu'elle soit renseignée */}
                        {data.brand.socialLinks
                            .filter((social) => social.url)
                            .map((social) => (
                                <AppLink
                                    key={social.id}
                                    to={social.url}
                                    aria-label={social.label}
                                    className="public-footer__social-link"
                                >
                                    <img src={social.icon} alt="" className="public-footer__social-icon"/>
                                </AppLink>
                            ))}
                    </div>
                </div>

                <div className="public-footer__navigation">
                    {data.navigation.map((group) => (
                        <div className="public-footer__nav-group" key={group.id}>

                            <h3 className="public-footer__nav-title">
                                {group.title}
                            </h3>

                            <ul className="public-footer__nav-list">
                                {group.links.map((link) => (
                                    <li key={link.key}>
                                        <AppLink
                                            to={link.path || link.href}
                                            className="public-footer__nav-link"
                                        >
                                            {link.label}
                                        </AppLink>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>

                <div className="public-footer__newsletter">
                    <h3 className="public-footer__newsletter-title">
                        {data.newsletter.title}
                    </h3>

                    <form
                        className="public-footer__newsletter-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="public-footer__newsletter-input"
                            type="email"
                            name="email"
                            placeholder={data.newsletter.placeholder}
                            aria-label="Adresse email"
                            required
                        />

                        <Button
                            label={data.newsletter.buttonLabel}
                            variant="primary"
                            type="submit"
                        />
                    </form>
                </div>
            </div>

            <div className="public-footer__bottom">
                <p className="public-footer__copyright">
                    © {data.copyright.year} {data.copyright.name} — {data.copyright.disclaimer}
                </p>
                <div className="public-footer__legal-link">
                    {data.legalLinks.links.map((link) => (
                        <Link key={link.key} to={link.path} className="public-footer__nav-link">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer