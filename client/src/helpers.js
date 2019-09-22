const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DOCUMENTARY = {
    'TESTIMONY': 'Témoignage',
    'REPORTAGE': 'Reportage',
    'INVESTIGATION': 'Enquête'
};

export function getFormattedDate(dateToParse) {
    const _date = new Date(Date.parse(dateToParse));
    return `${DAYS[_date.getDay()]}. ${_date.getDate()} ${MONTHS[_date.getMonth()]} ${_date.getFullYear()}`;
}

export function getDocumentaryType(index) {
    return DOCUMENTARY[index.toUpperCase()];
}