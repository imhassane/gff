import React from "react";
import { Link } from "react-router-dom";

import routes from "../routes";

export const Notifications = ({ data: { _id, seen, title}, onMarkAsRead }) => (
    <div className="uk-margin uk-flex uk-flex-between">
        <p className="uk-text-medium"><strong>{title}</strong></p>
        <span className="uk-link" onClick={ _ => onMarkAsRead(_id) }>{ seen ? "Marquer comme non lu" : "Marquer comme lu" }</span>
        <Link to={routes.COMMENTS}>Voir</Link>
    </div>
);