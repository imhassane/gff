import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../routes";

const DashboardNavigation = _ => (
    <div className="uk-container uk-card uk-card-secondary uk-card-body" style={{ margin: 0, padding: '10px' }}>
        <ul className="uk-nav-secondary" uk-nav="true">

            <li className="uk-nav-header">Gestion des articles</li>

            <li>
                <Link to={ROUTES.POSTS}>Nouvel article</Link>
            </li>
            <li>
                <Link to={ROUTES.POSTS}>Articles publiés</Link>
            </li>
            <li>
                <Link to={ROUTES.DRAFT}>Articles en édition</Link>
            </li>

            <li className="uk-nav-header">Gestion des commentaires</li>

            <li>
                <Link to={ROUTES.COMMENTS}>Tous les commentaires</Link>
            </li>
            <li>
                <Link to={ROUTES.POSTS}>Commentaires non validés</Link>
            </li>

            <li className="uk-nav-header">Gestion des tags</li>

            <li>
                <Link to={ROUTES.CREATE_TAG}>Nouveau tag</Link>
            </li>
            <li>
                <Link to={ROUTES.TAGS}>Tous les tags</Link>
            </li>

            <li className="uk-nav-header">Gestion des catégories</li>

            <li>
                <Link to={ROUTES.CREATE_CATEGORY}>Nouvelle catégorie</Link>
            </li>
            <li>
                <Link to={ROUTES.CATEGORIES}>Toutes les catégories</Link>
            </li>

            <li className="uk-nav-header">Gestion des utilisateurs</li>

            <li>
                <Link to={ROUTES.USERS}>Utilisateurs</Link>
            </li>
            <li>
                <Link to={ROUTES.USERS}>Ajouter un utilisateur</Link>
            </li>
            <li>
                <Link to={ROUTES.USERS}>Supprimer un utilisateur</Link>
            </li>

            <li className="uk-nav-header">Gestion des fichiers</li>

            <li>
                <Link to={ROUTES.POSTS}>Tous les fichiers</Link>
            </li>
            <li>
                <Link to={ROUTES.POSTS}>Supprimer des fichiers</Link>
            </li>

            <li className="uk-nav-header">Lecteurs</li>

            <li>
                <Link to={ROUTES.POSTS}>Abonnés</Link>
            </li>
            <li>
                <Link to={ROUTES.POSTS}>Envoyer un mail</Link>
            </li>
            <li>
                <Link to={ROUTES.POSTS}>Messages</Link>
            </li>
        </ul>
    </div>
);

export default DashboardNavigation;
