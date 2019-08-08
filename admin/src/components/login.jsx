import React from "react";
import { Error } from "./messages";

const LoginForm = (props) => {
    const { onEmailChange, onPasswordChange, onFormSubmit, errors } = props;

    return (
        <form className="uk-form-stacked">
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="email">Adresse email</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="email"onChange={ ({ target: { value }} ) => onEmailChange(value) }  />
                    { errors.email && <Error message={errors.email} /> }
                </div>
                
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="password">Mot de passe</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="password" onChange={ ({ target: { value }} ) => onPasswordChange(value) }  />
                    { errors.password && <Error message={errors.password} /> }
                </div>
                
            </div>
            <input type="button" disabled={ ((errors.password !== null) || errors.email !== null) }  className="uk-button uk-button-danger uk-width-1-1" value="Se connecter" onClick={ _ => onFormSubmit() } />
        </form>
    );
};

export default LoginForm;
