import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/login";
import ROUTES from "../routes";
import client from "../config/apollo";
import gql from "graphql-tag";
import { Title } from "../components/utility";
import { Messages } from "../components/messages";
import routes from "../routes";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
    }
    handleEmailChange = (email) => {
        if(/\w+@\w+\.\w+/i.test(email)) { this.setState({ email, errors: { ...this.state.errors, email: null } }) }
        else { this.setState({ errors: { ...this.state.errors, email: "Veuillez entrez une adresse email correcte" }}) }
    }
    handlePasswordChange = (password) => {
        if(password.length > 5) this.setState({ password, errors: { ...this.state.errors, password: null }  })
        else this.setState({ errors: { ...this.state.errors, password: "Le mot de passe doit contenir plus de 5 caractères" }})
    }
    handleSubmit = async () => {
        try {
            const { email, password } = this.state;
            const variables = { email, password };

            const { data: { authenticate } } = await client.mutate({ mutation: AUTHENTICATE, variables});
            const { token } = authenticate;
            // On enregistre le token dans les cookies.
            localStorage.setItem('x-auth-token', token);
            this.setState({ success: "Vous allez être redirigé vers la page d'administration", errors: {} });
            setTimeout(() => this.props.history.push(routes.DEFAULT_ROUTE), 1000);
            
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }, success: null }); }
    }
    render() {
        const { errors, success } = this.state;
        return (
            <div className="uk-container uk-position-center">
                <div>
                    <Title message="Accès à la page d'administration" />
                    <Messages error={errors.message} success={success} />
                    <>
                        <LoginForm
                            onEmailChange={this.handleEmailChange}
                            onPasswordChange={this.handlePasswordChange}
                            errors={this.state.errors}
                            onFormSubmit={this.handleSubmit}
                        />
                    </>
                    <p>
                        <Link to="/">J'ai oublié mon mot de passe!</Link>
                    </p>
                    <p>
                        <Link to={ROUTES.REGISTER}>Je veux créer un compte</Link>
                    </p>
                </div>
            </div>
        )
    }
}

const AUTHENTICATE = gql`
    mutation Authenticate($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
            token
        }
    }
`;

export default Login;
