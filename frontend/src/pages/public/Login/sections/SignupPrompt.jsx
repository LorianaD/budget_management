import { Button } from "@/components";

function SignupPrompt({ signup }) {
    return (
        <>
            <div className="login__divider">
                <span>{signup.divider}</span>
            </div>

            <div className="login__signup">
                <p>{signup.text}</p>
                <Button variant="outline" label={signup.label} link={signup.path} />
            </div>
        </>
    );
}

export default SignupPrompt;
