import React from "react";

import { Error } from "./messages";

export const Category = ({ data: { _id, name, description }, onChoose }) => (
    <button
        onClick={ _ => onChoose({ _id, name, description })} 
        className="uk-button uk-margin"
        uk-tooltip={`title: ${description}; pos: right`}
    >
        { name }
    </button>
);

export const CategoryForm = ({ onNameChange, onDescriptionChange, onSubmit, errors, values }) => (
    <form className="uk-form-stacked">
        <div className="uk-margin">
            <label htmlFor="name" className="uk-form-label">Nom de la catégorie</label>
            <input className="uk-input" value={ values.name ? values.name : "" } type="text" onChange={ ({ target: { value } }) => onNameChange(value) } />
            { errors.name && <Error message={errors.name} />}
        </div>
        <div className="uk-margin">
            <label htmlFor="description" className="uk-form-label">Description de la catégorie</label>
            <p className="uk-text-meta">
                La description de la catégorie est fortement conseillée, elle permet à 
                toute personne de mieux comprendre la catégorie.
            </p>
            <textarea value={ values.description ? values.description : "" } className="uk-input" style={{ height: '150px' }} onChange={ ({ target: { value } }) => onDescriptionChange(value) } >
                
            </textarea>
            { errors.description && <Error message={errors.description } /> }
        </div>
        <input onClick={ _ => onSubmit() } type="button" value={ values !== null ? "Mettre à jour" : "Ajouter la catégorie" } className="uk-button" />
    </form>
);

export const DeleteCategoryForm = ({ onDelete }) => (
    <div className="uk-margin">
        
        <button className="uk-button uk-button-danger" type="button" uk-toggle="target: #modal">Supprimer la catégorie</button>

        <div id="modal" uk-modal="true">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Confirmation de la suppression</h2>
                <p>
                    La suppression de la catégorie entraînera sa suppression dans tous les articles qui
                    sont associés et elle est irréversible. <br/>
                    Assurez-vous de ne plus avoir besoin de cette catégorie avant d'éffectuer cette action.
                </p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-margin-right-small uk-modal-close" type="button">Annuler</button>
                    <button className="uk-button uk-button-primary" type="button" onClick={ _ => onDelete() }>Supprimer</button>
                </p>
            </div>
        </div>
    </div>
);