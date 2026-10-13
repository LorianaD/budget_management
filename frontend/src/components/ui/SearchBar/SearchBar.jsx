import { useId, useState } from 'react';
import { search } from '@/assets';
import { Button } from '../Button';
import './SearchBar.css';

// Champ de recherche. Contrôlé si la page fournit value/onChange
// (ex. filtre des simulateurs), sinon il gère sa propre valeur.
function SearchBar({ label, placeholder, buttonLabel, buttonVariant = "primary", value, onChange, onSubmit }) {
    const inputId = useId();
    const [localValue, setLocalValue] = useState("");

    const currentValue = value ?? localValue;
    const handleChange = onChange ?? setLocalValue;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit?.(currentValue);
    };

    return (
        <form className="search-bar" role="search" onSubmit={handleSubmit}>
            <label htmlFor={inputId} className="visually-hidden">
                {label}
            </label>

            <img className="search-bar__icon" src={search} alt="" />

            <input
                id={inputId}
                className="search-bar__input"
                type="search"
                placeholder={placeholder}
                value={currentValue}
                onChange={(event) => handleChange(event.target.value)}
            />

            <Button
                label={buttonLabel}
                variant={buttonVariant}
                size="small"
                type="submit"
            />
        </form>
    );
}

export default SearchBar;
