import React from "react";
import { Error } from "./messages";

export const CommentTable = props => (
    <table className="uk-table uk-table-divider">
        <thead>
            <tr>
                <th>Selection</th>
                <th>Avatar</th>
                <th>Pseudonyme</th>
                <th>Adresse email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            { props.children }
        </tbody>
    </table>
);

export const CommentResume = ({ data: { username, email }, onSelection, index }) => (
    <tr uk-toggle="target: #offcanvas-comment" onClick={ _ => onSelection(index) }>
        <td><input type="checkbox" /></td>
        <td><img className="uk-border-rounded" width="35" src={`https://ui-avatars.com/api/?name=${username}`} alt={username}/></td>
        <td>{ username }</td>
        <td>{ email }</td>
        <td><button className="uk-button" uk-toggle="target: #offcanvas-comment" onClick={ _ => onSelection(index) }>Voir</button></td>
    </tr>
);

export const CommentDetail = ({ username, content, deleteComment }) => (
    <>
        <h3>{ username }</h3>
        { deleteComment && <Error message="Le commentaire a été définitevement supprimé" /> }
        <p>{ content }</p>
    </>
);

export const CommentFilter = ({ onFilterChange }) => (
    <ul className="uk-nav uk-flex uk-flex-left">
        <li className="uk-padding-small"><button className="uk-button uk-button-small uk-button-default" onClick={ _ => onFilterChange({ valid: true })}>Commentaires validés</button></li>
        <li className="uk-padding-small"><button className="uk-button uk-button-small uk-button-default" onClick={ _ => onFilterChange({ valid: false })}>Commentaires non validés</button></li>
        <li className="uk-padding-small"><button className="uk-button uk-button-small uk-button-danger">Supprimer</button></li>
    </ul>
);

export const CommentActions = ({ onValidate, onDelete, comment }) => (
    <>
        <div className="uk-flex uk-flex-around">
            { !comment.valid && <button className="uk-button uk-button-small uk-button-default" onClick={ _ => onValidate(comment._id) }>Approuver</button> }
            <button className="uk-button uk-button-small uk-button-danger" onClick={ _ => onDelete(comment._id) }>Supprimer</button>
        </div>
        <div className="uk-margin">
            <CommentReplyForm />
        </div>
    </>
);

const CommentReplyForm = ({ }) => (
    <form className="uk-form uk-margin">
        <div className="uk-margin">
            <textarea placeholder="Répondre au commentaire" className="uk-textarea"></textarea>
        </div>
        <input type="button" value="Envoyer la réponse" className="uk-button uk-button-default" />
    </form>
);
