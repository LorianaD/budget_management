// « Épargne » -> « epargne » : permet une recherche insensible aux accents et à la casse.
function normalizeText(text = "") {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim();
}

export default normalizeText;
