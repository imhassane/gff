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

export const CategoryForm = ({ onNameChange, onDescriptionChange, onSubmit, errors, values, hasChanged }) => (
    <form className="uk-form-stacked">
        <div className="uk-margin">
            <label htmlFor="name" className="uk-form-label">Nom de la catégorie</label>
            <input className="uk-input" type="text" onChange={ ({ target: { value } }) => onNameChange(value) } />
            { errors.name && <Error message={errors.name} />}
        </div>
        <div className="uk-margin">
            <label htmlFor="description" className="uk-form-label">Description de la catégorie</label>
            <p>
                La description de la catégorie est fortement conseillée, elle permet à 
                toute personne de mieux comprendre la catégorie.
            </p>
            <textarea className="uk-input" style={{ height: '150px' }} onChange={ ({ target: { value } }) => onDescriptionChange(value) } ></textarea>
            { errors.description && <Error message={errors.description } /> }
        </div>
        <input onClick={ _ => onSubmit() } type="button" value={ values !== null ? "Mettre à jour" : "Ajouter la catégorie" } className="uk-button" />
    </form>
);