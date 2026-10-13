function AuthReassurance({ icon, text }) {
    return (
        <p className="auth-page__reassurance">
            <img src={icon} alt="" />
            {text}
        </p>
    );
}

export default AuthReassurance;
