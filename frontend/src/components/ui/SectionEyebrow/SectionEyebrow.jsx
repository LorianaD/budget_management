import './SectionEyebrow.css';

function SectionEyebrow({ label, variant }) {
    return (
        <div className={`section-eyebrow section-eyebrow--${variant}`}>
            <span>
                { label }
            </span>
        </div>
    )
}

export default SectionEyebrow;