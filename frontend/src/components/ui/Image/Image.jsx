function Image({ src, alt, variant = "default", className= "", ...props }) {
    return (
        <div className={`ui-image ui-image--${variant} ${className}`}>
            <img 
                src={src} 
                alt={alt} 
                {...props} 
            />
        </div>
    )
}

export default Image