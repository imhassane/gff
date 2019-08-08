import React from "react";

export const ProfileResume = ({ data: { _id, username, email, is_active, is_staff } }) => (
    <div className="uk-card uk-card-default uk-grid-collapse uk-margin" uk-grid="true">
        <div className="uk-card-media-left uk-cover-container">
            <img uk-cover="true" src="http://djolo.net/wp-content/uploads/2014/07/4454122_3_01ab_sia-tolno-a-travaille-avec-le-batteur-de-tony_72fa337d9c7f7f5f84b239433ae0cf3e-Copier-e1406131612115.jpg" alt=""/>
            <canvas width="150" height="100"></canvas>
        </div>
        <div style={{ padding: 0 }}>
            <div className="uk-card-body uk-padding">
                <h5>@{username}</h5>
                <p>{ is_staff ? "Team" : "Visiteur" }</p>
            </div>
        </div>
    </div>
);