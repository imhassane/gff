import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../routes";

const DashboardNavigation = _ => (
    <div className="uk-container uk-card uk-card-secondary uk-card-body" style={{ margin: 0, padding: '10px' }}>
        <ul className="uk-nav-secondary" uk-nav="true">

            <li className="uk-nav-header">Contenu</li>

            <li>
                <Link to={ROUTES.POSTS}>Gestion des articles</Link>
            </li>

            <li>
                <Link to={ROUTES.DOCUMENTARIES}>Gestion des documentaires</Link>
            </li>

            <li className="uk-nav-header">Commentaires</li>

            <li>
                <Link to={ROUTES.COMMENTS}>Gestion des commentaires</Link>
            </li>

            <li className="uk-nav-header">Tags</li>

            <li>
                <Link to={ROUTES.CREATE_TAG}>Nouveau tag</Link>
            </li>
            <li>
                <Link to={ROUTES.TAGS}>Gestion des tags</Link>
            </li>

            <li className="uk-nav-header">Catégories</li>

            <li>
                <Link to={ROUTES.CREATE_CATEGORY}>Nouvelle catégorie</Link>
            </li>
            <li>
                <Link to={ROUTES.CATEGORIES}>Gestion des catégories</Link>
            </li>

            <li className="uk-nav-header">Utilisateurs</li>

            <li>
                <Link to={ROUTES.USERS}>Gestion des utilisateurs</Link>
            </li>

            <li className="uk-nav-header">Fichiers</li>

            <li>
                <Link to={ROUTES.POSTS}>Gestion des fichiers</Link>
            </li>

            <li className="uk-nav-header">Lecteurs</li>

            <li>
                <Link to={ROUTES.READERS}>Abonnés</Link>
            </li>
            <li>
                <Link to={ROUTES.CREATE_MAIL}>Envoyer un mail</Link>
            </li>
            <li>
                <Link to={ROUTES.MESSAGES}>Messages</Link>
            </li>
        </ul>
    </div>
);

export default DashboardNavigation;
