import './Icon.css';

function Icon({ src, alt = "", size = 24, variant = "default", className = "" }) {
    return (
        <div className={`ui-icon ui-icon--${variant} ${className}`} width={size} height={size}>
            <img
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Icon