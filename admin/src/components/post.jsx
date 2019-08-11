import React from "react";

export const PostResume = ({ data: { title }}) => (
    <div>
        <div className="uk-grid-small uk-child-width-1-2@m" uk-grid="true">
            <div>
                <strong>{ title }</strong>
            </div>
            <div>
                <div className="uk-flex uk-flex-between">
                    <div><span uk-icon="icon: forward"></span><span className="uk-link uk-margin">Voir</span></div>
                    <div><span className="uk-link uk-margin"><span uk-icon="icon: gitter"></span> Statistiques</span></div>
                    <div><span className="uk-link uk-margin"><span uk-icon="icon: file-edit"></span> Modifier</span></div>
                    <div><span className="uk-link uk-margin"><span uk-icon="icon: trash"></span> Mettre à la corbeille</span></div>
                </div>
            </div>
        </div>
        <hr/>
    </div>
);