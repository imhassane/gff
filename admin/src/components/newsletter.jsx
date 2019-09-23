import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import { getFormattedDate, Title, FormattedDate } from "./utility";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import routes from "../routes";

export const NewsletterForm = ({ editorState, onObjectChange, onEditorStateChange, hashtagConfig, onSubmit }) => (
    <form className="uk-form-stacked">

        <fieldset className="uk-fieldset">

            <div className="uk-margin">
                <label htmlFor="object" className="uk-form-label">Objet du mail</label>
                <input type="text" className="uk-input" onChange={({target:{value}}) => onObjectChange(value)}/>
            </div>

            <div className="uk-margin">
                <label htmlFor="message" className="uk-form-label">Message</label>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    hashtag={hashtagConfig} 
                />
            </div>

            <input type="button" className="uk-button" value="Créer la newsletter" onClick={ _ => onSubmit() } />

        </fieldset>

    </form>
);

export const NewsletterTable = props => (
    <table className="uk-table uk-table-divider uk-table-small">
        <thead>
            <th>Titre</th>
            <th>Publié</th>
            <th>Ajoutée le</th>
            <th>Action</th>
        </thead>
        <tbody>
            { props.children }
        </tbody>
    </table>
);

export const NewsletterTableElement = ({ data: { _id, title, published, createdAt }}) => (
    <tr>
        <td>{ title }</td>
        <td>{ published ? "Publié" : "Non publié" }</td>
        <td>{ getFormattedDate(createdAt) }</td>
        <td><Link className="uk-button uk-button-text" to={`${routes.DETAIL_NEWSLETTER}${_id}`}>Voir</Link></td>
    </tr>
);

export const Newsletter = ({ data: { _id, title, content, published, createdAt }, onDelete, onPublish}) => (
    <div className="uk-container">
        <Title message={title} />
        <FormattedDate date={createdAt} />
        <div className="uk-grid-small uk-grid-match uk-child-width-1-3@m" uk-grid="true">
            <div><Link className="uk-button uk-button-default" to={routes.LIST_NEWSLETTER}>Liste des newsletter</Link></div>
            { !published && <div><button onClick={ _ => onPublish(_id) } className="uk-button">Publier la newsletter</button></div> }
            <div><button onClick={ _ => onDelete(_id) } className="uk-button uk-button-danger">Supprimer la newsletter</button></div>
        </div>
        { renderHTML(content) }
    </div>
);