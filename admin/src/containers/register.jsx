import React from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import { RegisterFormFirstStep, RegisterFormSecondStep, RegisterFormThirdStep } from "../components/register";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentStep: 1, errors: {} };
    }
    handleUsernameChange = (username) => {
        if(username.length > 5) this.setState({ username, errors: { ...this.state.errors, username: null }})
        else this.setState({ username, errors: { ...this.state.errors, username: "Votre nom d'utilisateur doit contenir au moins 5 caractères" }}) 
    }
    handleEmailChange = (email) => {
        if(/\w+@\w+\.\w+/i.test(email)) { this.setState({ email, errors: { ...this.state.errors, email: null } }) }
        else { this.setState({ email, errors: { ...this.state.errors, email: "Veuillez entrez une adresse email correcte" }}) }
    
    }
    handlePasswordChange = (password) => {
        if(password.length > 5) this.setState({ password, errors: { ...this.state.errors, password: null }  })
        else this.setState({ password, errors: { ...this.state.errors, password: "Le mot de passe doit contenir plus de 5 caractères" }})
    }
    handleRepeatPasswordChange = (repeatPassword) => {
        if(repeatPassword === this.state.password) this.setState({ repeatPassword, errors: { ...this.state.errors, repeatPassword: null }  })
        else this.setState({ repeatPassword, errors: { ...this.state.errors, repeatPassword: "Les deux mots mots de passe ne correspondent pas" }})
    
    }
    handleNextStep = () => {
        let { currentStep } = this.state;
        currentStep++;
        this.setState({ currentStep });
    }

    handleFormSubmit = async () => {
        try {
            const { data: { createUser } } = await client.mutate({ mutation: CREATE_USER, variables: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }});
            this.setState({ success: createUser });

        }catch({ message }){
            this.setState({ errors: { message } });
        }
    }

    renderSteps() {

        const { currentStep } = this.state;
        let Form = null;
        let title = "Choix des identifiants";

        switch(currentStep) {
            case 1:
                title = "Choix des identifiants";
                Form = RegisterFormFirstStep;
                break;
            case 2:
                title = "Choix du mot de passe";
                Form = RegisterFormSecondStep;
                break;
            case 3:
                title = "Choix de votre photo de profil";
                Form = RegisterFormThirdStep;
                break;
            default:
                title = "Choix des identifiants";
                Form = RegisterFormFirstStep;
        };

        return (
            <div className="uk-container-large">
                <div>
                    <Form
                        title={title}
                        onUsernameChange={this.handleUsernameChange}
                        onEmailChange={this.handleEmailChange}
                        onPasswordChange={this.handlePasswordChange}
                        onRepeatPasswordChange={this.handleRepeatPasswordChange}
                        onNextStep={this.handleNextStep}
                        errors={this.state.errors}
                        onSubmit={this.handleFormSubmit}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.renderSteps();
    }
}

const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            _id
        }
    }
`;

export default Register;
