import React from "react";
import { Link } from "react-router-dom";
import DashboardNavigation from "../components/DashboardNavigation";
import routes from "../routes";

const WithDashboardNavigation = (Children) => {
    class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = { search: '', USER_PERMISSION: localStorage.getItem('x-auth-permission') };
            
            const token = localStorage.getItem('x-auth-token');
            if(!token) props.history.push(routes.LOGIN);
        }
        handleSearchChange = (search) => this.setState({ search })

        render() {
            const { search, USER_PERMISSION } = this.state;
            return (
                <div className="uk-grid-small" uk-grid="true">
                    <div className="uk-width-1-5@m">
                        <DashboardNavigation />
                    </div>
                    <div className="uk-width-4-5@m uk-container" uk-height-viewport="true">
                        <div className="uk-padding-small">
                            <div className="uk-grid-small" uk-grid="true">
                                <div className="uk-width-3-5@m">
                                    <input type="search" placeholder="Entrez votre recherche" onChange={ ({ target: { value }}) => this.handleSearchChange(value) } className="uk-input uk-form-blank" />
                                </div>
                                <div className="uk-width-2-5@m">
                                    <Link className="uk-button uk-button-secondary uk-margin-right" to={routes.CREATE_POST}>Ecrire un article</Link>
                                    <button onClick={_ => {
                                        localStorage.removeItem('x-auth-token');
                                        localStorage.removeItem('x-auth-permission');
                                        setTimeout(() => this.props.history.push(routes.LOGIN), 1000);
                                    }} className="uk-button uk-button-danger">Déconnexion</button>
                                </div>
                            </div>
                            <ul className="uk-breadcrumb">
                                <li><span className="uk-link" onClick={ _ => this.props.history.goBack() }>Retour</span></li>
                                <li><span className="uk-link" onClick={ _ => window.location.reload(true) }>Mettre à jour la page</span></li>
                            </ul>
                        </div>
                        <div className="uk-padding">
                            <Children {...this.props} USER_PERMISSION={USER_PERMISSION} search={search} />
                        </div>
                    </div>
                </div>
            );
        }
    }

    return HOC;
};

export default WithDashboardNavigation;
