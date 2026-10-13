// Page title and subtitle.
// headingRef lets multi-step forms move focus to the title so screen readers announce each step.
// variant "step": tighter typography used by the register steps.
function AuthHeading({ title, subtitle, headingRef, variant = "default" }) {
    return (
        <div className={`auth-page__heading auth-page__heading--${variant}`}>
            <h1 ref={headingRef} tabIndex={headingRef ? -1 : undefined} className="auth-page__title">
                {title}
            </h1>
            <p className="auth-page__subtitle">{subtitle}</p>
        </div>
    );
}

export default AuthHeading;
