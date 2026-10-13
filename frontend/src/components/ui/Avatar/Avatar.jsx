import './Avatar.css';

// Pastille d'initiales. Décorative : le nom complet est toujours écrit à côté.
function Avatar({ initials, tone = "blue", size = "medium" }) {
    return (
        <span className={`avatar avatar--${tone} avatar--${size}`} aria-hidden="true">
            {initials}
        </span>
    );
}

export default Avatar;
