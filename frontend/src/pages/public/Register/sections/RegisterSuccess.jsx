import { Button } from "@/components";

// Confirmation screen (last frame of Figma 69:275).
// UI only: a notice states that no account was created.
function RegisterSuccess({ success, headingRef }) {
    return (
        <div className="register-success">
            <div className="register-success__content">
                <div className="register-success__visual">
                    <img src={success.image} alt="" className="register-success__image" />
                    <span className="register-success__icon">
                        <img src={success.icon} alt="" />
                    </span>
                </div>

                <div className="register-success__text">
                    <h1 ref={headingRef} tabIndex={-1} className="register-success__title">
                        {success.title}
                    </h1>
                    <p className="register-success__description">{success.description}</p>
                </div>

                <p className="auth-page__notice register-success__notice">
                    {success.previewNotice}
                </p>

                <div className="register-success__buttons">
                    {success.buttons.map((button) => (
                        <Button
                            key={button.key}
                            label={button.label}
                            variant={button.variant}
                            link={button.link}
                        />
                    ))}
                </div>

                <ul className="register-success__checklist">
                    {success.checklist.items.map((item) => (
                        <li key={item.key} className="register-success__checklist-item">
                            <img src={success.checklist.icon} alt="" />
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RegisterSuccess;
