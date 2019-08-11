import React from "react";

export const PostPlanning = () => (
    <div className="uk-margin-small">
        <div className="uk-margin-small">
            <input type="checkbox" />
            <span>Brouillon</span>
        </div>
        <div className="uk-margin-small">
            <input type="checkbox" />
            <span>En attente de relecture</span>
        </div>
        <input className="uk-button uk-button-default" type="button" value="Ajouter l'article" />
    </div>
);
