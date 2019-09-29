import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from "html-to-draftjs";

import client from "../config/apollo";
import Loader from "../components/loader";
import { matchToSearch } from "../config/helpers";
import { Title, DataCounter, DeleteData } from "../components/utility";
import { Messages } from "../components/messages";
import { PageTableElement, PageTable, CreatePageForm, Page, UpdatePageForm } from "../components/page";
import routes from "../routes";

const hashtagConfig = {
    separator: ' ',
    trigger: '#',
};

export class PageList extends React.Component {
    state = { errors: {} };
    componentDidMount = async () => {
        try {
            const { data: { pages } } = await client.query({ query: PAGES_LIST });
            this.setState({ pages });
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    renderPages = () => {
        let { pages } = this.state;
        let { search } = this.props;
        pages = pages.filter(p => matchToSearch(p.title, search));
        pages = pages.map((d, k) => <PageTableElement data={d} key={k} />);
        return <PageTable>{pages}</PageTable>;
    }
    render = () => {
        const { pages, errors } = this.state;
        if(!pages) return <Loader />;
        return (
            <>
                <Title message="Administration des pages" />
                <p className="uk-text-meta"><DataCounter total={pages.length} type="page" /></p>
                <Messages error={errors.message} />
                <p className="uk-margin"><Link to={routes.CREATE_PAGE} className="uk-button uk-button-primary">Ajouter une page</Link></p>
                { this.renderPages() }
            </>
        );
    }
};

export class CreatePage extends React.Component {
    state = { errors: {}, editorState: EditorState.createEmpty(), type: "CONTENT" };
    handleTitleChange = (title) => {
        if(!title.length) this.setState({ errors: { ...this.state.errors, title: "Veuillez entrer le titre de la page" }, title });
        else this.setState({ errors: { ...this.state.errors, title: null}, title });
    }
    handleDescriptionChange = (description) => {
        if(description.length < 10) this.setState({ errors: { ...this.state.errors, description: "La description de la page est trop courte, elle doit dépasser 10 caractères" }, description });
        else this.setState({ errors: { ...this.state.errors, description: null}, description });
    }
    handleTypeChange = (type) => this.setState({ type });
    handleEditorStateChange = (editorState) => this.setState({ editorState });
    handleSubmit = async () => {
        try {
            const { title, description, type, editorState } = this.state;

            let content = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            content = draftToHtml(content);

            const variables = { title, description, type, content };
            const { data: { createPage } } = await client.mutate({ mutation: CREATE_PAGE, variables });
            this.setState({ success: `La page "${createPage.title}" a bien été créée` });
        } catch({ message}) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    renderForm = () => {
        const { title, description, editorState, type } = this.state;
        return (
            <>
                <p className="uk-margin">
                    <label htmlFor="type" className="uk-label">Type de la page</label>
                    <select onChange={({ target: { value }}) => this.handleTypeChange(value)} className="uk-input">
                        <option value="CONTENT">Une page avec du contenu simple</option>
                        <option value="GROUP">Une page regroupant un groupe d'articles</option>
                    </select>
                </p>
                <CreatePageForm
                    editorState={editorState}
                    hashtagConfig={hashtagConfig}
                    onEditorStateChange={this.handleEditorStateChange}
                    isContentPage={type==="CONTENT"}
                    onTitleChange={this.handleTitleChange}
                    onDescriptionChange={this.handleDescriptionChange}
                    onSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    not_empty={title && description}
                />
            </>
        );
    }
    render = () => {
        const { success, errors } = this.state;
        return (
            <>
                <Title message="Ajout d'une page" />
                <p className="uk-margin"><Link className="uk-button uk-button-primary" to={routes.PAGES}>Liste des pages</Link></p>
                <Messages success={success} error={errors.message} />
                { this.renderForm() }
            </>
        );
    }
};

export class PageDetail extends React.Component {
    state = { errors: {} };
    componentDidMount = async () => {
        const { _id } = this.props.match.params;
        try {
            const { data: { page } } = await client.query({ query: PAGE, variables: { _id } });
            this.setState({ page });
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    renderPage = () => {
        const  { page } = this.state;
        return <Page data={page} />;
    }
    render = () => {
        const { page, errors } = this.state;
        if(!page) return <Loader />;
        return (
            <>
                <Title message={page.title} />
                <Messages error={errors.message} />
                { this.renderPage() }
            </>
        );
    }
};

export class PageUpdate extends React.Component {
    state = { errors: {}, type: "CONTENT", editorState: EditorState.createEmpty() };
    componentDidMount = async () => {
        const { _id } = this.props.match.params;
        try {
            const { data: { page } } = await client.query({ query: PAGE, variables: { _id } });
            const contentBlock = htmlToDraft(page.content);
            if(contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                
                this.setState({ page, editorState });
            }
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    handleTitleChange = (title) => {
        if(!title.length) this.setState({ errors: { ...this.state.errors, title: "Veuillez entrer le titre de la page" }, title });
        else this.setState({ errors: { ...this.state.errors, title: null}, title });
    }
    handleDescriptionChange = (description) => {
        if(description.length < 10) this.setState({ errors: { ...this.state.errors, description: "La description de la page est trop courte, elle doit dépasser 10 caractères" }, description });
        else this.setState({ errors: { ...this.state.errors, description: null}, description });
    }
    handleTypeChange = (type) => this.setState({ type });
    handleEditorStateChange = (editorState) => this.setState({ editorState });
    handleSubmit = async () => {
        try {
            let { title, description, type, editorState, page } = this.state;
            const { _id } = this.props.match.params;

            let content = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            content = draftToHtml(content);

            if(!title) title = page.title;
            if(!description) description = page.description;
            if(!type) type = page.type;

            if(type==="GROUP") content="";

            const variables = { title, description, type, content, _id };
            const { data: { updatPage } } = await client.mutate({ mutation: UPDATE_PAGE, variables });
            this.setState({ success: `La page "${updatPage.title}" a bien été modifiée` });
        } catch({ message}) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    renderForm = () => {
        const { title, description, editorState, type, page } = this.state;
        return (
            <>
                <p className="uk-margin">
                    <label htmlFor="type" className="uk-label">Type de la page</label>
                    <select defaultValue={type} onChange={({ target: { value }}) => this.handleTypeChange(value)} className="uk-input">
                        <option value="CONTENT">Une page avec du contenu simple</option>
                        <option value="GROUP">Une page regroupant un groupe d'articles</option>
                    </select>
                </p>
                <UpdatePageForm
                    editorState={editorState}
                    hashtagConfig={hashtagConfig}
                    onEditorStateChange={this.handleEditorStateChange}
                    isContentPage={type==="CONTENT"}
                    onTitleChange={this.handleTitleChange}
                    onDescriptionChange={this.handleDescriptionChange}
                    onSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    not_empty={title && description}
                    currentValues={page}
                />
            </>
        );
    }
    render = () => {
        const { success, errors, page } = this.state;
        if(!page) return <Loader />
        return (
            <>
                <Title message="Ajout d'une page" />
                <p className="uk-margin"><Link className="uk-button uk-button-primary" to={routes.PAGES}>Liste des pages</Link></p>
                <Messages success={success} error={errors.message} />
                { this.renderForm() }
            </>
        );
    }
}

export class PageDelete extends React.Component {
    state = { errors: {} };
    componentDidMount = async () => {
        const { _id } = this.props.match.params;
        try {
            const { data: { page } } = await client.query({ query: PAGE, variables: { _id } });
            this.setState({ page });
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    handleDelete = async () => {
        try {
            const { _id } = this.props.match.params;
            const { data: { deletePage } } = await client.mutate({ mutation: DELETE_PAGE, variables: { _id } });
            this.setState({ success: `La page "${deletePage.title}" a été supprimée avec succès`});
        } catch({ message }) { this.setState({ errors: { ...this.state.errors, message }}); }
    }
    renderPage = () => {
        return <DeleteData {...this.props} title={this.state.page.title} onDelete={this.handleDelete} />
    }
    render = () => {
        const { page, success, errors } = this.state;
        if(!page) return <Loader />;
        return (
            <>
                <Messages success={success} error={errors.message} />
                {this.renderPage()}
            </>
        );
    }
}

const PAGES_LIST = gql`
    {
        pages {
            _id, slug, title, type createdAt
        }
    }
`;

const PAGE = gql`
    query GetPage($_id: ID!) {
        page(_id: $_id) {
            _id, title, slug, content, description, type, createdAt 
        }
    }
`;

const CREATE_PAGE = gql`
    mutation CreatePage($title: String!, $description: String!, $type: String!, $content: String) {
        createPage(title: $title, description: $description, type: $type, content: $content) {
            title
        }
    }
`;

const UPDATE_PAGE = gql`
    mutation UpdatePage($_id: ID!, $title: String, $description: String, $content: String) {
        updatePage(_id: $_id, title: $title, description: $description, content: $content) {
            _id
        }
    }
`;

const DELETE_PAGE = gql`
    mutation DeletePage($_id: ID!) {
        deletePage(_id: $_id) {
            _id
        }
    }
`;