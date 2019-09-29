import React from "react";

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

export const Title = ({ message }) => (
    <>
        <h3>{ message }</h3>
        <hr />
    </>
);

export const DataCounter = ({ total, type }) => <p className="uk-text-meta uk-margin">{ total } { type}{total > 1 ? "s": ""} au total</p>

export const Empty = ({ message }) => <p>{ message }</p>;

export const FormattedDate = ({ date }) => (
    <p>{getFormattedDate(date)}</p>
);

export const DeleteData = ({ title, onDelete, history }) => (
    <>
        <Title message={`Suppression de "${title}"`} />
        <p className="uk-alert uk-alert-warning">
            La suppression de cette donnée est irréversible et ne pourra plus être accessible.
            Cependant certaines données ne seront pas totalement supprimées mais seront conservées dans la
            base de données afin de conserver les relations entre les données.
        </p>
        <div className="uk-margin uk-grid-small uk-child-width-1-5@m" uk-grid="true">
            <div><button className="uk-button" onClick={ _ => history.goBack() }>Annuler</button></div>
            <div><button className="uk-button uk-button-danger" onClick={ _ => onDelete()}>Supprimer</button></div>
        </div>
    </>
);