import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { NewsletterForm, NewsletterTable, NewsletterTableElement, Newsletter } from "../components/newsletter";
import client from "../config/apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Messages } from "../components/messages";
import { matchToSearch } from "../config/helpers";
import { Title, DataCounter } from "../components/utility";
import Loader from "../components/loader";
import routes from "../routes";

const hashtagConfig = {
    separator: ' ',
    trigger: '#',
};

export class CreateNewsletter extends React.Component {
    state = { errors: {}, editorState: EditorState.createEmpty() };

    handleObjectChange = title => this.setState({ title });
    handleEditorStateChange = editorState => this.setState({ editorState });
    handleSubmit = async () => {
        try {
            const { editorState, title } = this.state;
            let rawContent = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            let content = draftToHtml(rawContent);
            let variables = { content, title };

            const { data: { createNewsLetter } } = await client.mutate({ mutation: CREATE_NEWSLETTER, variables });
            this.setState({ success: `La newsletter "${createNewsLetter.title}" a été crée avec succès` });

        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    renderForm = () => {
        const { editorState } = this.state;
        return <NewsletterForm
                    onObjectChange={this.handleObjectChange}
                    editorState={editorState}
                    onEditorStateChange={this.handleEditorStateChange}
                    hashtagConfig={hashtagConfig}
                    onSubmit={this.handleSubmit}
                />
    }
    render() {
        const { errors, success } = this.state;
        return (
            <>
                <Title message="Nouvelle newsletter" />
                <Link className="uk-button uk-button-primary uk-margin" to={routes.LIST_NEWSLETTER}>Liste des newsletter</Link>
                <Messages success={success} error={errors.message} />
                { this.renderForm() }
            </>
        );
    }
}

export class NewsletterList extends React.Component {
    state = { errors:{}, show_published: false };
    componentDidMount = async () => {
        try {
            const { data: { newsletters } } = await client.query({ query: NEWSLETTERS });
            this.setState({ newsletters });
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    switchFilter = () => {
        const { show_published } = this.state;
        this.setState({ show_published: !show_published });
    }
    renderNewsletters = () => {
        let { newsletters, show_published } = this.state;
        const { search } = this.props;
        newsletters = newsletters.filter(n => matchToSearch(n.title, search));
        newsletters = newsletters.filter(n => n.published === show_published);
        newsletters = newsletters.map((d, k) => <NewsletterTableElement data={d} key={k} />);
        return <NewsletterTable>{ newsletters }</NewsletterTable> 
    }
    render = () => {
        const { newsletters } = this.state;
        if(!newsletters) return <Loader />;
        return (
            <> 
                <Title message="Newsletters" />
                <DataCounter total={newsletters.length} type="newsletter" />
                <p className="uk-margin">
                    <Link className="uk-button uk-button-primary" to={routes.CREATE_NEWSLETTER}>Ajouter une newsletter</Link>
                </p>
                <p className="uk-margin">
                    <input type="checkbox" className="uk-checkbox uk-margin-right" onChange={ _ => this.switchFilter() } />
                    <span>Afficher les newsletters publiés</span>
                </p>
                {this.renderNewsletters()}
            </>
        );
    }
}

export class NewsletterDetail extends React.Component {
    state = { errors: { } };
    componentDidMount = async () => {
        const { _id } = this.props.match.params;
        try {
            const { data: { newsletter } } = await client.query({ query: NEWSLETTER, variables: {_id} });
            this.setState({ newsletter });
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    handlePublish = async (_id) => {
        try {
            const { data: { publishNewsLetter } } = await client.mutate({ mutation: PUBLISH_NEWSLETTER, variables: { _id }});
            this.setState({ success: `La newsletter "${publishNewsLetter.title}" a été publiée avec succès`});
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    handleDelete = async (_id) => {
        try {
            const { data: { deleteNewsLetter } } = await client.mutate({ mutation: DELETE_NEWSLETTER, variables: { _id } });
            this.setState({ sucess: `La newsletter "${deleteNewsLetter.title}" a été supprimée avec succès`});
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message } }); }
    }
    renderNewsletter = () => {
        return <Newsletter data={this.state.newsletter} onDelete={this.handleDelete} onPublish={this.handlePublish} />
    }
    render = () => {
        const { newsletter, success, errors } = this.state;
        if(!newsletter) return <Loader />;
        return (
            <>
                <Messages success={success} error={errors.message} />
                { this.renderNewsletter() }
            </>
        );
    }
}

const CREATE_NEWSLETTER = gql`
    mutation CreateNewsletter($title: String!, $content: String!) {
        createNewsLetter(title: $title, content: $content) {
            title
        }
    }
`;

const NEWSLETTERS = gql`
    {
        newsletters { _id, title, published, createdAt }
    }
`;

const NEWSLETTER = gql`
    query Newsletter($_id: ID!) {
        newsletter(_id: $_id) {
            _id, title, content, published, createdAt
        }
    }
`;

const DELETE_NEWSLETTER = gql`
    mutation DeleteNewsletter($_id: ID!) {
        deleteNewsLetter(_id: $_id) {
            _id
        }
    }
`;

const PUBLISH_NEWSLETTER = gql`
    mutation PublishNewsletter($_id: ID!) {
        publishNewsLetter(_id: $_id) {
            title
        }
    }
`;