import React from "react";
import routes from "../routes";

import { Link } from "react-router-dom";

export const Home = props => (
    <div className="uk-position-center">
        <h3>Espace d'administration de Girls For Future</h3>
        <p className="uk-margin" style={{ textAlign: 'center' }}>
            <img width="200" src="https://sylla-msc.s3.eu-west-3.amazonaws.com/test/logo.png" alt="logo"/>
        </p>
        <div className="uk-margin uk-grid-small uk-grid-match uk-child-width-1-2@m uk-child-width-1-1@m" uk-grid="true">
            <div><Link className="uk-button uk-button-default" to={routes.LOGIN}>Connexion</Link></div>
            <div><Link className="uk-button uk-button-danger" to={routes.REGISTER}>Inscription</Link></div>
        </div>
    </div>
);