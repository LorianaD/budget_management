import './StepList.css';

// Étapes numérotées reliées par un trait vertical.
// <ol> annonce déjà la numérotation : la pastille visuelle est masquée
// aux lecteurs d'écran pour éviter « 1, 1. Comprendre... ».
// steps = [{ key, number, title, description, variant? }]
function StepList({ steps = [] }) {
    return (
        <ol className="step-list">
            {steps.map((step) => (
                <li
                    key={step.key}
                    className={`step-list__item step-list__item--${step.variant ?? "default"}`}
                >
                    <span className="step-list__number" aria-hidden="true">
                        {step.number}
                    </span>

                    <div className="step-list__content">
                        <h3 className="step-list__title">{step.title}</h3>
                        <p className="step-list__description">{step.description}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

export default StepList;
