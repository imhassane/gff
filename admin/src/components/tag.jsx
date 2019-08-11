import React from "react";
import { Error } from "./messages";

export const TagFinderForm = ({ onTagNameChange }) => (
    <div>
        <input type="text" className="uk-input uk-width-1-1" onChange={ ({ target: { value } }) => onTagNameChange(value )} />
    </div>
);

export const TagResume = ({ data: { name, _id }, onTagSelect }) => (
    <span onClick={ _ => onTagSelect({ name, _id }) } className="uk-label" style={{ marginRight: '10px' }}>{ name }</span>
);

export const TagForm = ({ onSubmit, onNameChange, errors, values }) => (
    <form className="uk-form-stacked">
        <fieldset className="uk-fieldset">
            <div className="uk-margin">
                <label htmlFor="name" className="uk-form-label">Nom du tag</label>
                <input type="text" value={ values && values.name ? values.name : "" } className="uk-input uk-width-1-1" onChange={({ target: { value }}) => onNameChange(value) } />
                { errors.name && <Error message={errors.name} /> }
            </div>
            <input type="button" disabled={ (errors.name !== null)} className="uk-button" onClick={ _ => onSubmit() } value={ values ? "Mettre à jour" : "Créer" }/>
        </fieldset>
    </form>
)