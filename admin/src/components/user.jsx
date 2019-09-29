import React from "react";
import { DisplayRole, DisplayDateDiffFromNow } from "./utility";

export const ProfileResume = ({ data: { _id, username, email, is_active, is_staff, posts } }) => (
    <div className="uk-card uk-card-default uk-grid-collapse uk-margin" uk-grid="true">
        <div className="uk-card-media-left uk-cover-container">
            <img uk-cover="true" src="http://djolo.net/wp-content/uploads/2014/07/4454122_3_01ab_sia-tolno-a-travaille-avec-le-batteur-de-tony_72fa337d9c7f7f5f84b239433ae0cf3e-Copier-e1406131612115.jpg" alt=""/>
            <canvas width="150" height="100"></canvas>
        </div>
        <div style={{ padding: 0 }}>
            <div className="uk-card-body uk-padding">
                <h5>@{username}</h5>
                <p>{ is_staff ? "Team" : "Visiteur" } | { posts === null || posts.length === 0 ? "0 article publié" : `${posts.length} publié(s)` }</p>
            </div>
        </div>
    </div>
);

export const UserTable = props => (
    <table className=" uk-margin uk-table uk-table-divider uk-table-small">
        <thead>
            <tr>
                <th>Nom d'utilisateur</th>
                <th>Rôle</th>
                <th>Ancienneté</th>
                <th>Actif</th>
            </tr>
        </thead>
        <tbody>
            { props.children }
        </tbody>
    </table>
);

export const UserTableElement = ({ data: { _id, username, createdAt, permissions, is_active }}) => (
    <tr>
        <td>{ username }</td>
        <td><DisplayRole role={permissions[0]} /></td>
        <td><DisplayDateDiffFromNow date={createdAt} /></td>
        <td>{ is_active ? "Oui" : "Non" }</td>
    </tr>
)