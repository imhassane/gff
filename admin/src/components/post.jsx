import React from "react";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import routes from "../routes";

export const PostResume = ({ data: { title, _id }, trash, onMoveToTrash, onRemoveToTrash, onDelete}) => (
    <div>
        <div className="uk-grid-small uk-child-width-1-2@m" uk-grid="true">
            <div>
                <strong>{ title }</strong>
            </div>
            <div>
                <div className="uk-flex uk-flex-between">
                    <div><span uk-icon="icon: forward"></span><Link to={`${routes.READ_POST}${_id}`}>Voir</Link></div>
                    { !trash && <div><span uk-tooltip="title:Les statistiques sont disponibles sur Google Analytics; pos: top-right" className="uk-link uk-margin"><span uk-icon="icon: gitter"></span> Statistiques</span></div> }
                    <div><span className="uk-link uk-margin"><Link to={`${routes.UPDATE_POST}${_id}`}><span uk-icon="icon: file-edit"></span> Modifier</Link></span></div>
                    { !trash && <div><span onClick={ _ => onMoveToTrash(_id) } className="uk-link uk-margin"><span uk-icon="icon: trash"></span> Mettre à la corbeille</span></div> }
                    { trash && (
                    <>
                    <div><span className="uk-link uk-margin" onClick={ _ => onRemoveToTrash(_id) }>Mettre en ligne</span></div>
                    <div><span className="uk-link uk-margin" onClick={ _ => onDelete(_id)}>Supprimer définitivement</span></div>
                    </>
                    )}
                </div>
            </div>
        </div>
        <hr/>
    </div>
);

export const DraftSwitcher = () => (
    <>
        <h4>Articles en attente</h4>
    </>
);

export const Post = ({ data: { title, content }}) => (
    <>
        <h3>{title}</h3>
        <hr/>
        { renderHTML(content) }
    </>
);