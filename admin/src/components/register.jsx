import React from "react";
import { Error } from "./messages";
import routes from "../routes";

export const RegisterFormFirstStep = (props) => {
    const { onUsernameChange, onEmailChange, errors, onNextStep, title } = props;

    return (
        <form className="uk-form-stacked uk-position-center">
            <fieldset className="uk-fieldset">
                <legend className="uk-legend">{ title }</legend>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="email">Choisissez un nom d'utilisateur</label>
                    <div className="uk-form-controls">
                        <input className="uk-input" type="text" onChange={ ({ target: { value }} ) => onUsernameChange(value) }  />
                        { errors.username && <Error message={errors.username} /> }
                    </div>
                    
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="email">Adresse email</label>
                    <div className="uk-form-controls">
                        <input className="uk-input" type="email" onChange={ ({ target: { value }} ) => onEmailChange(value) }  />
                        { errors.email && <Error message={errors.email} /> }
                    </div>
                </div>
                <input className="uk-button uk-button-danger uk-width-1-1" disabled={ ((errors.username !== null) || errors.email !== null) } type="button" value="Etape suivante - choix du mot de passe" onClick={ _ => onNextStep() } />
            </fieldset>
        </form>
    );
};

export const RegisterFormSecondStep = (props) => {
    const { onPasswordChange, onRepeatPasswordChange, errors, onSubmit, onNextStep, title } = props;

    return (
        <form className="uk-form-stacked uk-position-center">
            <fieldset className="uk-fieldset">
                <legend className="uk-legend">{ title }</legend>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="password">Choisissez un mot de passe</label>
                    <input className="uk-input" type="password" onChange={ ({ target: { value }} ) => onPasswordChange(value) }  />
                    { errors.password && <Error message={errors.password} /> }
                </div>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="password">Répétez le mot de passe</label>
                    <input className="uk-input" type="password" onChange={ ({ target: { value }} ) => onRepeatPasswordChange(value) }  />
                    { errors.repeatPassword && <Error message={errors.repeatPassword} /> }
                </div>
                <input
                    className="uk-button uk-button-danger"
                    disabled={ (errors.password !== null || errors.repeatPassword !== null )}
                    type="button" value="Etape suivante - choix d'une photo de profil"
                    onClick={ _ => {
                        onSubmit().then(() => {
                            onNextStep();
                        })
                    } }
                />
            </fieldset>
        </form>
    );
};

export const RegisterFormThirdStep = (props) => {
    const { onPictureChange, errors, onUploadAndSubmit, title } = props;

    return (
        <form className="uk-form-stacked uk-position-center">
            <fieldset className="uk-fieldset">
                <legend className="uk-legend">{ title }</legend>
                <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="picture">Choisissez une image pour votre profil</label>
                    <input type="file" onChange={ ({ target: { value }} ) => onPictureChange(value) }  />
                    { errors.picture && <Error message={errors.picture} /> }
                </div>
                <div className="uk-margin">
                    <input className="uk-button uk-button-secondary" type="button" value="Sauter cette étape" onClick={ _ => props.history.push(routes.DEFAULT_ROUTE) }/>
                    <input className="uk-button uk-button-danger" type="button" value="Charger l'image et terminer mon inscription" onClick={ _ => onUploadAndSubmit() }/>
                </div>
            </fieldset>
        </form>
    );
};
