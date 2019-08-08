import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/login";
import ROUTES from "../routes";

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
    handleSubmit = () => {
        console.log(this.state);
    }
    render() {
        return (
            <div className="uk-container uk-position-center">
                <div>
                    <h3>Accès à l'espace d'administration</h3>
                    <div>
                        <LoginForm
                            onEmailChange={this.handleEmailChange}
                            onPasswordChange={this.handlePasswordChange}
                            errors={this.state.errors}
                            onFormSubmit={this.handleSubmit}
                        />
                    </div>
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

export default Login;
