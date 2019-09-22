import React from "react";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import client from "../config/apollo";
import { Title } from "../components/utility";
import { Error, Success } from "../components/messages";
import gql from "graphql-tag";
import Loader from "../components/loader";
import { DocumentaryResume, DocumentaryNavigation, DocumentaryForm } from "../components/documentary";

const hashtagConfig = {
    separator: ' ',
    trigger: '#',
};

export class DocumentaryList extends React.Component {
    types = { investigation: "INVESTIGATION", reportage: "REPORTAGE", testimony: "TESTIMONY" };
    state = { TYPE: this.types.investigation, errors: {} }
    componentDidMount = async () => {
        await this.getDocumentaries(this.state.TYPE);
    }
    getDocumentaries = async (TYPE) => {
        try {
            let { data: { documentaries} } = await client.query({ query: LIST, variables: { type: TYPE }});
            if(documentaries) {
                this.setState({ TYPE, documentaries, errors: { ...this.state.errors, message: null }});
            }
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }})
        }
    }
    handleTypeChange = async (TYPE) => {
        await this.getDocumentaries(TYPE);
    }
    renderDocumentaries = () => {
        const { documentaries } = this.state;
        let _docs = documentaries.filter(d => d.title.toLowerCase().includes(this.props.search));
        
        _docs = documentaries.map((d, k) => (
            <DocumentaryResume data={d} key={k} />
        ))
        return (
            <>
                <nav className="uk-margin uk-nav">
                    <ul className="uk-flex uk-flex-left">
                        <li className="uk-margin-right"><span className="uk-link" onClick={ _ => this.handleTypeChange(this.types.investigation)}>Enquêtes</span></li>
                        <li className="uk-margin-right"><span className="uk-link" onClick={ _ => this.handleTypeChange(this.types.reportage)}>Reportages</span></li>
                        <li className="uk-margin-right"><span className="uk-link" onClick={ _ => this.handleTypeChange(this.types.testimony)}>Témoignages</span></li>
                    </ul>
                </nav>
                <div>{_docs}</div>
            </>
        );
    }
    render() {
        const { documentaries } = this.state;
        if(!documentaries) return <Loader />
        return (
            <>
                <Title message="Gestion des documentaires" />
                <DocumentaryNavigation />
                { this.renderDocumentaries() }
            </>
        );
    }
}

export class CreateDocumentary extends React.Component {
    state = { errors: {}, editorState: EditorState.createEmpty(), type: "REPORTAGE" };
    handleEditorStateChange = (editorState) => this.setState({ editorState });
    handleTitleChange = (title) => {
        if(title.length < 5)
            this.setState({ title, errors: { title: "Le titre doit contenir plus de 5 caractères", ...this.state.errors }});
        else
            this.setState({ title, errors: { title: null, ...this.state.errors }});
    }
    handleUrlChange = (url) => {
        if(url.length < 5)
            this.setState({ url, errors: { url: "Entrez une url correcte", ...this.state.errors }});
        else
            this.setState({ url, errors: { url: null, ...this.state.errors }});
    }
    handleDescriptionChange = (description) => {
        if(description.length < 10)
            this.setState({ description, errors: { description: "La description doit contenir au moins 10 caractères", ...this.state.errors }});
        else
            this.setState({ description, errors: { description: null, ...this.state.errors }});
    }
    handleTypeChange = (type) => this.setState({ type });
    handleFileUpload = (pictures) => {
        // PostFileUpload component return a table of pictures, we need the last one.
        const picture =  pictures[pictures.length - 1]._id;
        this.setState({ picture });
    }
    handleSubmit = async () => {
        try {
            const { title, url, description, picture, editorState, type } = this.state;
            let rawContent = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            let content = draftToHtml(rawContent);

            let variables = { title, content, url, description, content, picture, type };
            let { data: { createDocumentary } } = await client.mutate({ mutation: CREATE, variables });
            if(createDocumentary) {
                this.setState({ success: `Le documentaire ${title} a été publié`});
            }
        } catch({ message }) {
            this.setState({ errors: { message, ...this.state.errors }});
        }
    }
    renderForm = () => {
        const { editorState, errors } = this.state;
        return (
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-3-5@m">
                    <div>
                        <div className="uk-margin">
                            <label htmlFor="title" className="uk-form-label">Titre du documentaire</label>
                            { errors.title && <Error message={errors.title} /> }
                            <input type="text" className="uk-input" onChange={ ({ target:{value}}) => this.handleTitleChange(value) }/>
                        </div>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.handleEditorStateChange}
                            hashtag={hashtagConfig}
                        />
                    </div>
                </div>
                <div className="uk-width-2-5@m">
                    <DocumentaryForm
                        onUrlChange={this.handleUrlChange}
                        onTypeChange={this.handleTypeChange}
                        onSubmit={this.handleSubmit}
                        onFileChoosed={this.handleFileUpload}
                        onDescriptionChange={this.handleDescriptionChange}
                        errors={errors}
                    />
                </div>
            </div>
        );
    }
    render() {
        const { success } = this.state;
        return (
            <>
                { success && <Success message={success} />}
                { this.renderForm() }
            </>
        );
    }
}

const LIST = gql`
    query GetDocumentaries($type: String!) {
        documentaries(TYPE: $type) {
            _id,
            title,
            url
            picture { _id, path }
            createdAt
        }
    }
`;

const CREATE = gql`
    mutation CreateDocumentary(
        $title: String!,
        $content: String!,
        $picture: ID!,
        $url: String!,
        $description: String!,
        $type: String!
    ) {
        createDocumentary(
            title: $title,
            content: $content,
            picture: $picture,
            url: $url,
            description: $description,
            TYPE: $type
        ) {
            _id
        }
    }
`;