import React from "react";

export const Page = ({ data: { _id, title, rank }, onEditRank}) => (
    <div>
        <button className="uk-button">{ title } - <span className="uk-label">{ rank }</span></button>
        <div uk-dropdown="pos:bottom-left">
            <ul className="uk-nav uk-dropdown-nav">
                <li><span className="uk-link" onClick={ _ => onEditRank(_id) }>Changer le rang de la page "{title}"</span></li>
            </ul>
        </div>
    </div>
);