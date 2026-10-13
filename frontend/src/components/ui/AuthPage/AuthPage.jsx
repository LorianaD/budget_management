import { AuthVisual } from '../AuthVisual';
import './AuthPage.css';

// Two-column shell shared by the login and register pages: form panel + illustrated panel.
// panelVariant "spaced": first and last children are pushed to the panel edges.
function AuthPage({ panel, panelVariant, children }) {
    const variantClass = panelVariant ? `auth-page__form-panel--${panelVariant}` : "";

    return (
        <div className="auth-page">
            <div className={`auth-page__form-panel ${variantClass}`}>
                {children}
            </div>

            <AuthVisual panel={panel} />
        </div>
    );
}

export default AuthPage;
