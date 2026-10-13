// useGrouping "always" : sans cela, le français ne sépare pas les nombres
// à 4 chiffres (« 2150 ») alors que les maquettes affichent « 2 150 ».
const numberFormatter = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
    useGrouping: "always",
});

// 2150 -> "2 150" (séparateur de milliers français)
// Intl utilise une espace fine insécable (U+202F), presque invisible avec la
// police Geist : on la remplace par une espace insécable classique (U+00A0).
export function formatNumber(value) {
    return numberFormatter.format(value).replace(/\u202F/g, "\u00A0");
}

// 2150 -> "2 150 EUR", comme dans les maquettes
function formatAmount(value, currency = "EUR") {
    return `${formatNumber(value)} ${currency}`;
}

export default formatAmount;
