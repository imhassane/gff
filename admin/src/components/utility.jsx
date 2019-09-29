import React from "react";

const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DOCUMENTARY = {
    'TESTIMONY': 'Témoignage',
    'REPORTAGE': 'Reportage',
    'INVESTIGATION': 'Enquête'
};
const ROLES = {
    SUPER_USER: "Superviseur",
    MANAGER: "Manager",
    AUTHOR: "Auteur",
    MEMBER: "Membre"
};

export const DisplayRole = ({role}) => <span>{ROLES[role]}</span>;

export function getFormattedDate(dateToParse) {
    const _date = new Date(Date.parse(dateToParse));
    return `${DAYS[_date.getDay()]}. ${_date.getDate()} ${MONTHS[_date.getMonth()]} ${_date.getFullYear()}`;
}

export const DisplayDateDiffFromNow = ({date}) => {
    const _date = new Date(Date.parse(date));
    const diff = new Date() - _date;

    let _d = {};
    _d.sec = Math.floor(diff / 1000);
    _d.min = Math.floor(_d.sec / 60);
    _d.hour = Math.floor(_d.min / 60);
    _d.days = Math.floor(_d.hour / 24);

    return <span>{ _d.days } { _d.days > 1 ? "jours" : "jour" }</span>
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