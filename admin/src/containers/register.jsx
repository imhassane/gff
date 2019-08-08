import React from "react";

import { RegisterFormFirstStep, RegisterFormSecondStep, RegisterFormThirdStep } from "../components/register";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentStep: 1, errors: {} };
    }
    handleUsernameChange = (username) => {
        if(username.length > 5) this.setState({ username, errors: { ...this.state.errors, username: null }})
        else this.setState({ errors: { ...this.state.errors, username: "Votre nom d'utilisateur doit contenir au moins 5 caractères" }}) 
    }
    handleEmailChange = (email) => {
        if(/\w+@\w+\.\w+/i.test(email)) { this.setState({ email, errors: { ...this.state.errors, email: null } }) }
        else { this.setState({ errors: { ...this.state.errors, email: "Veuillez entrez une adresse email correcte" }}) }
    
    }
    handlePasswordChange = (password) => {
        if(password.length > 5) this.setState({ password, errors: { ...this.state.errors, password: null }  })
        else this.setState({ errors: { ...this.state.errors, password: "Le mot de passe doit contenir plus de 5 caractères" }})
    }
    handleRepeatPasswordChange = (repeatPassword) => {
        if(repeatPassword === this.state.password) this.setState({ repeatPassword, errors: { ...this.state.errors, repeatPassword: null }  })
        else this.setState({ errors: { ...this.state.errors, repeatPassword: "Les deux mots mots de passe ne correspondent pas" }})
    
    }
    handleNextStep = () => {
        let { currentStep } = this.state;
        currentStep++;
        this.setState({ currentStep });
    }

    renderSteps() {

        const { currentStep } = this.state;
        let Form = null;

        switch(currentStep) {
            case 1:
                Form = RegisterFormFirstStep;
                break;
            case 2:
                Form = RegisterFormSecondStep;
                break;
            case 3:
                Form = RegisterFormThirdStep;
                break;
            default:
                Form = RegisterFormFirstStep;
        };

        return <Form
                    onUsernameChange={this.handleUsernameChange}
                    onEmailChange={this.handleEmailChange}
                    onPasswordChange={this.handlePasswordChange}
                    onRepeatPasswordChange={this.handleRepeatPasswordChange}
                    onNextStep={this.handleNextStep}
                    errors={this.state.errors}
                />
    }
    render() {
        return this.renderSteps();
    }
}

export default Register;
