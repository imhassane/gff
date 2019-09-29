import React from "react";
import { Link } from "react-router-dom";
import { getFormattedDate } from "./utility";
import { Error } from "./messages";

import { Editor } from 'react-draft-wysiwyg';
import renderHTML from "react-render-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import routes from "../routes";

export const PageTable = (props) => (
    <table className="uk-margin uk-table uk-table-divider uk-table-small uk-table-striped">
        <thead>
            <th>Titre</th>
            <th>Type</th>
            <th>Visible</th>
            <th>Ajoutée le</th>
            <th>Action</th>
        </thead>
        <tbody>
            { props.children }
        </tbody>
    </table>
);

export const PageTableElement = ({ data: { _id, title, type, deleted, createdAt }}) => (
    <tr>
        <td>{title}</td>
        <td>{type}</td>
        <td>{deleted ? "Non" : "Oui"}</td>
        <td>{getFormattedDate(createdAt)}</td>
        <td><Link to={`${routes.PAGE_DETAIL}${_id}`} className="uk-button uk-button-default">Voir</Link></td>
    </tr>
);

export const PageNavigation = ({ _id }) => (
    <div className="uk-margin uk-grid-small uk-child-width-1-5@m" uk-grid="true">
        <div><Link to={routes.PAGES} className="uk-button uk-button-primary">Liste des pages</Link></div>
        <div><Link to={`${routes.PAGE_UPDATE}${_id}`} className="uk-button uk-button-primary">modifier la page</Link></div>
        <div><Link to={`${routes.PAGE_DELETE}${_id}`} className="uk-button uk-button-danger">Supprimer la page</Link></div>
    </div>
);

export const CreatePageForm = ({ editorState, hashtagConfig, onEditorStateChange, isContentPage, onTitleChange, onDescriptionChange, onSubmit, errors, not_empty }) => (
    <form className="uk-form" onSubmit={ e => e.preventDefault() }>
        <fieldset className="uk-fieldset">
            <ul uk-accordion="true">
                <li className="uk-open">
                    <a className="uk-accordion-title" href="#">Titre et description</a>
                    <div className="uk-accordion-content">
                        <div className="uk-margin">
                            <label htmlFor="title" className="uk-form-label">Titre de la page</label>
                            { errors.title && <Error message={errors.title} /> }
                            <input type="text" className="uk-input" onChange={({ target: { value } }) => onTitleChange(value) }/>
                        </div>
                        <div className="uk-margin">
                            <label htmlFor="description" className="uk-form-label">Description de la page</label>
                            { errors.description && <Error message={errors.description} /> }
                            <textarea cols="30" rows="10" className="uk-textarea" onChange={({ target: { value } }) => onDescriptionChange(value) }></textarea>
                        </div>
                    </div>
                </li>
                { isContentPage && (
                    <li>
                        <a href="#" className="uk-accordion-title">Contenu</a>
                        <div className="uk-accordion-content">
                            <div className="uk-margin">
                                <label htmlFor="content" className="uk-form-label">Contenu de la page</label>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    hashtagConfig={hashtagConfig}
                                />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <button className="uk-button" disabled={!not_empty && !(errors.title||errors.description)} onClick={ _ => onSubmit() }>Ajouter la page</button>
        </fieldset>
    </form>
);

export const Page = ({ data: { _id, content } }) => (
    <>
        <PageNavigation _id={_id} />
        {renderHTML(content)}
    </>
);

export const UpdatePageForm = ({ currentValues, editorState, hashtagConfig,
                                onEditorStateChange, isContentPage, onTitleChange,
                                onDescriptionChange, onSubmit, errors
                            }) => (
    <form className="uk-form" onSubmit={ e => e.preventDefault() }>
        <fieldset className="uk-fieldset">
            <ul uk-accordion="true">
                <li className="uk-open">
                    <a className="uk-accordion-title" href="#">Titre et description</a>
                    <div className="uk-accordion-content">
                        <div className="uk-margin">
                            <label htmlFor="title" className="uk-form-label">Titre de la page</label>
                            <p className="uk-margin">
                                <strong><i>Valeur actuelle </i></strong>: 
                                { currentValues.title }
                            </p>
                            { errors.title && <Error message={errors.title} /> }
                            <input type="text" className="uk-input" onChange={({ target: { value } }) => onTitleChange(value) }/>
                        </div>
                        <div className="uk-margin">
                            <label htmlFor="description" className="uk-form-label">Description de la page</label>
                            { errors.description && <Error message={errors.description} /> }
                            <textarea cols="30" rows="10" className="uk-textarea" onChange={({ target: { value } }) => onDescriptionChange(value) }></textarea>
                        </div>
                    </div>
                </li>
                { isContentPage && (
                    <li>
                        <a href="#" className="uk-accordion-title">Contenu</a>
                        <div className="uk-accordion-content">
                            <div className="uk-margin">
                                <label htmlFor="content" className="uk-form-label">Contenu de la page</label>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    hashtagConfig={hashtagConfig}
                                />
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <button className="uk-button" onClick={ _ => onSubmit() }>Mettre à jour la page</button>
        </fieldset>
    </form>
);