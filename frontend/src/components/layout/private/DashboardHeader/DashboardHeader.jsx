import "./DashboardHeader.css";

// Top bar of a private page: page title (h1), subtitle and optional actions
// on the right (avatar, period selector, buttons... depending on the page).
function DashboardHeader({ title, subtitle, children }) {
    return (
        <header className="dashboard-header">
            <div className="dashboard-header__text">
                <h1 className="dashboard-header__title">{title}</h1>
                {subtitle && <p className="dashboard-header__subtitle">{subtitle}</p>}
            </div>

            {children && <div className="dashboard-header__actions">{children}</div>}
        </header>
    );
}

export default DashboardHeader;
