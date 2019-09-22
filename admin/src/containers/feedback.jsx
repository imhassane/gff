import React from "react";

import client from "../config/apollo";
import gql from "graphql-tag";
import Loader from "../components/loader";
import { Success } from "../components/messages";
import { matchToSearch } from "../config/helpers";
import { Title } from "../components/utility";
import { FeedbackResume, FeedBack } from "../components/feedback";

export class FeedbackList extends React.Component {
    state = { errors: { } };
    componentDidMount = async () => {
        try {
            const { data: { contacts } } = await client.query({ query: FEEDBACK_LIST });
            this.setState({ contacts });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    handleFeebackClick = (_id) => this.setState({ current: _id });
    renderFeedbacks = () => {
        let { contacts } = this.state;
        const { search } = this.props;
        contacts = contacts.filter(c => matchToSearch(c.email, search) || matchToSearch(c.username, search));
        contacts = contacts.map((d, k) => <FeedbackResume onFeedbackClick={this.handleFeebackClick} data={d} key={k} />);
        return (
            <table className="uk-table uk-table-divided uk-table-small">
                <thead>
                    <th>Nom</th>
                    <th>Objet</th>
                    <th>Validé</th>
                    <th>Ajouté le</th>
                    <th>Actions</th>
                </thead>
                <tbody>{ contacts }</tbody>
            </table>
        );
    }
    render = () => {
        const { contacts, current } = this.state;
        if(!contacts) return <Loader />;

        return (
            <>
                <Title message="Messages reçus" />
                <p className="uk-margin">{ contacts.length } message(s) reçu(s) au total</p>
                { current && <FeedbackDetail _id={current} /> }
                { this.renderFeedbacks() }
            </>
        );
    }
}

class FeedbackDetail extends React.Component {
    state = { errors: { } };
    componentDidMount = async () => {
        try {
            const { data: { contact } } = await client.query({ query: FEEDBACK_DETAIL, variables: { _id: this.props._id }});
            this.setState({ contact });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    handleReplyChange = (reply) => this.setState(reply);
    handleDelete = async () => {
        try {
            const { data: { deleteContact } } = await client.mutate({ mutation: DELETE_FEEDBACK, variables: { _id: this.props._id }});
            if(deleteContact) this.setState({ deleted: deleteContact });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    handleValidate = async () => {
        try {
            const { data: { updateContact } } = await client.mutate({ mutation: VALIDATE_FEEDBACK, variables: { _id: this.props._id }});
            if(updateContact) this.setState({ updated: updateContact });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    handleReply = () => {

    }
    renderFeedback = () => {
        return <FeedBack
                    data={this.state.contact}
                    onReply={this.handleReply}
                    onReplyChange={this.handleReplyChange}
                    onValidate={this.handleValidate}
                    onDelete={this.handleDelete}
                />
    }
    render = () => {
        const { contact, deleted, updated } = this.state;
        if(!contact) return <Loader />
        return (
            <>
                { deleted && <Success message="Le message a été supprimé avec succès" /> }
                { updated && <Success message="Le message a été validé avec succès" /> }
                { !deleted && !updated && this.renderFeedback() }
            </>
        );
    }
}

const FEEDBACK_DETAIL = gql`
    query FeedbackDetail($_id: ID!) {
        contact(_id: $_id) {
            object, username, email, website, createdAt, message
        }
    }
`;

const FEEDBACK_LIST = gql`
    {
        contacts {
            _id, email, object, message validated, createdAt
        }
    }
`;

const DELETE_FEEDBACK = gql`
    mutation DeleteFeedback($_id: ID!) {
        deleteContact(_id: $_id) {
            _id
        }
    }
`;

const VALIDATE_FEEDBACK = gql`
    mutation UpdateFeedback($_id: ID!) {
        updateContact(_id: $_id, validated: true) { _id }
    }
`;