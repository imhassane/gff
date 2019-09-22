import React from "react";

export const ContactForm = () => (
    <form className="uk-form-stacked">

        <fieldset className="uk-fieldset">

            <legend className="uk-legend">Envoyer un email à vos abonnés</legend>

            <div className="uk-margin">
                <label htmlFor="object" className="uk-form-label">Objet du mail</label>
                <input type="text" className="uk-input"/>
            </div>

            <div className="uk-margin">
                <label htmlFor="message" className="uk-form-label">Message</label>
                <textarea className="uk-textarea"></textarea>
            </div>

            <input type="button" className="uk-button" value="Envoyer le mail"/>

        </fieldset>

    </form>
);