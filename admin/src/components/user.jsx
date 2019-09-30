import React from "react";
import { Link } from "react-router-dom";
import { DisplayRole, DisplayDateDiffFromNow, getFormattedDate } from "./utility";
import routes from "../routes";
import { Messages } from "./messages";

export const ProfileResume = ({ data: { _id, username, email, is_active, posts, post_view_counter, comment_counter, views, picture, createdAt, permissions } }) => (
    <>
        <div className="uk-margin" style={{ textAlign: 'center' }}>
            <img src={ picture && picture.path ? picture.path : ""} alt={`Photo de profil de @${username}`} width="200" height="200" className="uk-border-rounded" />
            <p className="uk-text-meta">@{username}</p>
            <p className="uk-text-meta">Inscrit.e depuis le { getFormattedDate(createdAt) }</p>
            <p><strong>Rôle:</strong> <DisplayRole role={permissions[0]} /></p>
        </div>
        <div className="uk-width-1-1@s uk-width-2-5@m">
            <ul className="uk-nav uk-nav-default">
                <li className="uk-nav-header">Gestion de mon compte</li>
                <li><Link to={routes.CHANGE_PASSWORD}>Modifier mon mot de passe</Link></li>
                <li><Link to={routes.CHANGE_PICTURE}>Changer mon image de profil</Link></li>
                <li><Link to={"/"}>Désactiver mon compte</Link></li>
            </ul>
            <ul className="uk-nav uk-nav-default">
                <li className="uk-nav-header">Statistiques</li>
                <li className="uk-margin-small"><span className="uk-text-meta">Nombre d'articles visionnés: { post_view_counter } vues</span></li>
                <li className="uk-margin-small"><span className="uk-text-meta">Nombre de commentaires publiés: { comment_counter } commentaires</span></li>
                <li className="uk-margin-small"><span className="uk-text-meta">Nombre de visionnage du profil: { views } vues</span></li>
            </ul>
        </div>
    </>
);

export const UserTable = props => (
    <table className=" uk-margin uk-table uk-table-divider uk-table-small">
        <thead>
            <tr>
                <th>Nom d'utilisateur</th>
                <th>Rôle</th>
                <th>Ancienneté</th>
                <th>Actif</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            { props.children }
        </tbody>
    </table>
);

export const UserTableElement = ({ data: { _id, username, permissions, createdAt, is_active }, permission}) => (
    <tr>
        <td>{ username }</td>
        <td><DisplayRole role={permissions[0]} /></td>
        <td><DisplayDateDiffFromNow date={createdAt} /></td>
        <td>{ is_active ? "Oui" : "Non" }</td>
        <td>{ permission === "SUPER_USER" || permission === "MANAGER" ? <Link to={`${routes.USER}${_id}`}>Gérer</Link> : "-" }</td>
    </tr>
);

export const ChangePasswordPage = ({ onOldChange, onNewChange, onRptChange, errors, onSubmit }) => (
    <>
        <form onSubmit={ e => e.preventDefault() } className="uk-form-stacked uk-margin">
            <fieldset className="uk-fieldset">
                <div className="uk-margin">
                    <label htmlFor="old" className="uk-form-label">Entrez votre mot de passe actuel</label>
                    <input type="password" onChange={({ target: { value } }) => onOldChange(value)} className="uk-input"/>
                </div>
                <div className="uk-margin uk-grid-small uk-grid-match uk-child-width-1-2@m uk-child-width-1-1@s" uk-grid="true">
                    <div>
                        <div className="uk-margin">
                            <label htmlFor="new" className="uk-form-label">Nouveau mot de passe</label>
                            <input type="password" onChange={({ target: { value } }) => onNewChange(value)} className="uk-input"/>
                            { errors.new && <Messages error={errors.new} /> }
                        </div>
                    </div>
                    <div>
                        <div className="uk-margin">
                            <label htmlFor="rpt" className="uk-form-label">Repetez le mot de passe</label>
                            <input type="password" onChange={({ target: { value } }) => onRptChange(value)} className="uk-input"/>
                            { errors.rpt && <Messages error={errors.rpt} />}
                        </div>
                    </div>
                </div>
                <button className="uk-button" onClick={ _ => onSubmit() }>Changer le mot de passe</button>
            </fieldset>
        </form>
    </>
);

export const ManageUserPage = ({ data: { picture, username, permissions } }) => (
    <div className="uk-margin uk-grid-match uk-grid-small" uk-grid="true">
        <div className="uk-width-1-5@m uk-width-1-1@s">
            <img width="150" height="150" src={ picture ? picture.path : "#" } alt={username} />
        </div>
        <div className="uk-width-3-5@m uk-width-1-1@s">
            <div>
                <p><span className="uk-text-emphasis">Nom d'utilisateur: </span><span className="uk-text-muted">{ username }</span></p>
                <p><span className="uk-text-emphasis">Rôle: </span><span className="uk-text-muted"><DisplayRole role={permissions} /></span></p>
            </div>
        </div>
        <div className="uk-width-1-5@m uk-width-1-1@s">

        </div>
    </div>
);