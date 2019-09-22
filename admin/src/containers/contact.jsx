import React from "react";
import { ContactForm } from "../components/contact";

export class CreateMail extends React.Component {
    state = { errors: {} };
    renderForm = () => {
        return <ContactForm />
    }
    render() {
        return (
            <>
                { this.renderForm() }
            </>
        );
    }
}