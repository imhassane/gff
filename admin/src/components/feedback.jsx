import React from "react";
import { FormattedDate, getFormattedDate } from "./utility";

export const FeedbackResume = ({ data: {_id, username, object, createdAt, validated }, onFeedbackClick }) => (
    <tr>
        <td>{ username ? username : "_" }</td>
        <td>{ object }</td>
        <td><it className="uk-text-meta">{ validated ? "Validé" : "Non validé" }</it></td>
        <td><FormattedDate date={createdAt} /></td>
        <td><button onClick={ _ => onFeedbackClick(_id) } className="uk-button">Voir</button></td>
    </tr>
);

export const FeedBack = ({ data: { _id, username, email, object, message, validated, createdAt }, onValidate, onDelete, onReply, onReplyChange }) => (
    <div>
        <p><strong>De: </strong> {email} - { username ? username : " - " }</p>
        <p><strong>Objet: </strong> {object}</p>
        <p><strong>Validé: </strong> { validated ? "Oui" : "Non" }</p>
        <p><strong>Date: </strong> { getFormattedDate(createdAt) }</p>
        <p><strong>Message:</strong><br/>{message}</p>
        
        <div className="uk-margin uk-grid-small uk-child-width-1-4@m uk-grid-match" uk-grid="true">
            <div><button className="uk-button" onClick={ _ => onValidate()}>Valider le message</button></div>
            <div><button className="uk-button uk-button-danger" onClick={ _ => onDelete()}>Supprimer le message</button></div>
        </div>

        <div>
            <form className="uk-form-stacked">
                <div className="uk-margin">
                    <textarea className="uk-textarea" cols="30" rows="10" onChange={({target:{value}}) => onReplyChange(value)}></textarea>
                </div>
                <button className="uk-button" onClick={ _ => onReply()}>Repondre au message</button>
            </form>
        </div>
    </div>
);