import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { Error } from "./messages";
import { PostFileUpload } from "../containers/upload";

export const DocumentaryResume = ({ data}) => (
    <div className="uk-margin">
        <h3>{ data.title }</h3>

        <hr/>
    </div>
);

export const DocumentaryNavigation = () => (
    <div className="uk-flex uk-margin">
        <li><Link className="uk-button uk-button-primary" to={routes.CREATE_DOCUMENTARY}>Ajouter un documentaire</Link></li>
    </div>
);

export const DocumentaryForm = ({ onTypeChange, onUrlChange, onFileChoosed, onDescriptionChange, onSubmit, errors }) => (
    <form className="uk-form-stacked">
        <fieldset className="uk-fieldset">
            <legend className="uk-legend"></legend>

            <div className="uk-margin">
                <label htmlFor="type" className="uk-form-label">Type du documentaire</label>
                { errors.type && <Error message={errors.type} /> }
                <select className="uk-input" onChange={ ({ target: { value }}) => onTypeChange(value) }>
                    <option value="REPORTAGE">Reportage</option>
                    <option value="INVESTIGATION">Enquête</option>
                    <option value="TESTIMONY">Témoignage</option>
                </select>
            </div>
            <div className="uk-margin">
                <label htmlFor="url" className="uk-form-label">Url du documentaire</label>
                { errors.url && <Error message={errors.url} /> }
                <input type="text" className="uk-input" onChange={ ({ target: { value }}) => onUrlChange(value) }/>
            </div>
            <div className="uk-margin">
                <label htmlFor="picture" className="uk-form-label">Image à la une</label>
                <PostFileUpload onPictureUpload={onFileChoosed} />
            </div>
            <div className="uk-margin">
                <label htmlFor="description" className="uk-form-label">Description du documentaire</label>
                { errors.description && <Error message={errors.description} /> }
                <textarea className="uk-textarea" onChange={({ target:{value}}) => onDescriptionChange(value)}></textarea>
            </div>

            <input type="button" value="Ajouter le documentaire" className="uk-button" onClick={_=>onSubmit()}/>
        </fieldset>
    </form>
);