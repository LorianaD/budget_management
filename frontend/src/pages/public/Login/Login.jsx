import { Link } from "react-router";
import { AuthHeading, AuthPage, AuthReassurance, Button } from "@/components";
import { LoginForm, SignupPrompt } from "./sections";
import LoginData from "./LoginData";
import "./Login.css";

function Login() {
    const page = LoginData;

    return (
        <AuthPage panel={page.panel} panelVariant="spaced">
            <Link to={page.backLink.path} className="login__back-link">
                <span aria-hidden="true">←</span> {page.backLink.label}
            </Link>

            <div className="login__body">
                <AuthHeading title={page.heading.title} subtitle={page.heading.subtitle} />
                <LoginForm form={page.form} />
                <SignupPrompt signup={page.signup} />
                <Button variant="neutral" label={page.demo.label} link={page.demo.path} />
            </div>

            <AuthReassurance icon={page.reassurance.icon} text={page.reassurance.text} />
        </AuthPage>
    );
}

export default Login;
