import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TagFinder } from "./tag";
import { ChooseCategory } from "./category";
import { PostFileUpload, PostUploaded, SelectFile } from "./upload";
import { PostPlanning } from "../components/planning";
import Loader from "../components/loader";
import client from "../config/apollo";
import { PostResume, Post } from "../components/post";
import gql from "graphql-tag";
import { Success, Error, Messages } from "../components/messages";
import { Title, DataCounter } from "../components/utility";

const hashtagConfig = {
    separator: ' ',
    trigger: '#',
};

export class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: null,
            tags: [], categories: [],
            pictures: [], draft: false,
            errors: {}
        };
    }
    handleTitleChange = (title) => this.setState({ title });
    handleEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }
    handlePictureUpload = (pictures) => {
        this.setState({ pictures });
    }
    handleCategorySelected = (categories) => {
        this.setState({ categories });
    }
    handleTagSelected = (tags) => {
        this.setState({ tags });
    }
    handleDraftSelect = () => {
        let { draft } = this.state;
        draft = !draft;
        this.setState({ draft });
    }
    handleSubmit = async () => {
        try {
            let { editorState, title, tags, categories, pictures, draft, extract } = this.state;
            let rawContent = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            let content = draftToHtml(rawContent);
            
            let picture;
            if(pictures.length === 0) this.setState({ errors: { ...this.state.errors, message: "Vous devez choisir au moins une image "}});
            else picture = pictures[pictures.length - 1]._id;
            let variables = { title, content, tags, categories, pictures, draft, extract, picture };

            if(!this.state.errors.message || !this.state.errors.message.length) {
                await client.mutate({ mutation: CREATE_POST, variables });
                this.setState({ success: `L'article "${title}" a été publié avec succès`, errors: {} });
            }
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }, success: null });
        }
    }
    renderEditor = () => {
        const { editorState } = this.state;
        return (
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-3-5@m">
                    <div className="uk-margin">
                        <input type="text" onChange={({target:{value}}) => this.handleTitleChange(value) } placeholder="Titre de l'article" className="uk-input uk-width-1-1 uk-form-blank" />
                    </div>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        hashtag={hashtagConfig}
                    />
                </div>
                <div className="uk-width-2-5@m">
                    <div>
                        <div>
                            <strong>Planification de l'article</strong>
                            <PostPlanning onDraftSelect={this.handleDraftSelect} onSubmit={this.handleSubmit} />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Tags</strong>
                            <TagFinder onTagSelect={this.handleTagSelected} />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Catégories</strong>
                            <ChooseCategory onCategorySelect={this.handleCategorySelected} />
                        </div>
                        <div className="uk-margin-small">
                            <strong>Choisir un fichier</strong>
                            <SelectFile />
                            <hr/>
                            <strong>Ajouter des fichiers</strong>
                            <PostFileUpload onPictureUpload={this.handlePictureUpload} />
                            <PostUploaded uploads={this.state.pictures} />
                        </div>
                        <div>
                            <strong>Extrait de l'article</strong>
                            <textarea onChange={({ target: { value }}) => this.setState({ extract: value })} className="uk-textarea"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { success, errors } = this.state;
        return (
            <>
                <Title message="Nouvel article" />
                <Messages success={success} error={errors.message} />
                <>
                    { this.renderEditor() }
                </>
            </>
        );
    }
}

export class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
    }
    componentDidMount = async () => {
        try {
            let { data: { posts } } = await client.query({ query: POSTS });
            this.setState({ posts });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message } });
        }
    }
    handleMoveToTrash = async (_id) => {
        try {
            if(window.confirm("Voulez-vous supprimer l'article ?")) {
                const { data: { moveToDraft } } = await client.mutate({ mutation: MOVE_TO_DRAFT , variables: { _id }});
                this.setState({ success: `L'article "${moveToDraft.title}" a été mis à la corbeille` });
                setTimeout(() => window.location.reload(true), 1000);
            }
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message } });
        }
    }
    renderPosts = () => {
        let { posts } = this.state;
        posts = posts.filter(p => p.title.toLowerCase().includes(this.props.search));
        posts = posts.map((d, k) => <PostResume onMoveToTrash={this.handleMoveToTrash} data={d} key={k} />);
        return (
            <div>{ posts }</div>
        )
    }
    render() {
        const { errors, success, posts } = this.state;
        if(!posts) return <Loader />
        return (
            <div>
                <Title message="Gestion des articles" />
                <Messages error={errors.message} success={success} />
                <div>
                    { this.renderPosts() }
                </div>
            </div>
        );
    }
}

export class UpdatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title: null,
            tags: [], categories: [],
            pictures: [], draft: false,
            errors: {}
        };

    }
    componentDidMount = async () => {
        try {
            const { _id } = this.props.match.params;
            const { data: { post } } = await client.query({ query: GET_POST, variables: { _id }});
            this.setState(post);
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }

    handleTitleChange = (title) => this.setState({ title });
    handleEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }
    handlePictureUpload = (pictures) => {
        this.setState({ pictures });
    }
    handleCategorySelected = (categories) => {
        this.setState({ categories });
    }
    handleTagSelected = (tags) => {
        this.setState({ tags });
    }
    handleDraftSelect = () => {
        let { draft } = this.state;
        draft = !draft;
        this.setState({ draft });
    }
    handleSubmit = async () => {
        try {
            let { editorState, title, tags, categories, pictures, draft, extract } = this.state;
            let rawContent = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            let content = draftToHtml(rawContent);
            
            let variables = { title, content, tags, categories, pictures, draft, extract, picture: "5d7a0873a9687f34c825b895" };

            let { data: { _id } } = await client.mutate({ mutation: CREATE_POST, variables });
            if(_id) this.setState({ success: `L'article ${title} a été mis à jour avec succès`, errors: {} });

        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }, success: null });
        }
    }
    renderEditor = () => {
        const { editorState } = this.state;
        return (
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-3-5@m">
                    <div className="uk-margin">
                        <input type="text" value={this.state.title} onChange={({target:{value}}) => this.handleTitleChange(value) } placeholder="Titre de l'article" className="uk-input uk-width-1-1 uk-form-blank" />
                    </div>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        hashtag={hashtagConfig}
                    />
                </div>
                <div className="uk-width-2-5@m">
                    <div>
                        <div>
                            <strong>Planification de l'article</strong>
                            <PostPlanning onDraftSelect={this.handleDraftSelect} onSubmit={this.handleSubmit} />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Tags</strong>
                            <TagFinder onTagSelect={this.handleTagSelected} />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Catégories</strong>
                            <ChooseCategory onCategorySelect={this.handleCategorySelected} />
                        </div>
                        <div className="uk-margin-small">
                            <strong>Ajouter des fichiers</strong>
                            <PostFileUpload onPictureUpload={this.handlePictureUpload} />
                            <PostUploaded uploads={this.state.pictures} />
                        </div>
                        <div>
                            <strong>Extrait de l'article</strong>
                            <textarea value={this.state.extract} onChange={({ target: { value }}) => this.setState({ extract: value })} className="uk-textarea"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { success, errors } = this.state;
        return (
            <>
                { success && <Success message={success} /> }
                { errors.message && <Error message={errors.message} />}
                <>
                    { this.renderEditor() }
                </>
            </>
        );
    }
}

export const PostDetail = props => {
    const [post, setPost] = useState(null);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data: { post } } = await client.query({ query: GET_POST, variables: { _id: props.match.params._id }});
                setPost(post);
            } catch({ message }) { setMessages({ error: message }); }
        }
        getPost();
    });

    return (
        <>
            <Messages error={messages.error} />
            { !post && <Loader /> }
            { post && <Post data={post} />    }        
        </>
    );
}

export const Trash = props => {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState({});

    const handleRemoveFromTrash = async (_id) => {
        try {
            const { data: { updatePost } } = await client.mutate({ mutation: REMOVE_FROM_TRASH, variables: { _id } });
            setMessages({ success: `L'article "${updatePost.title}" a été déplacé de la corbeille` });
            setTimeout(() => window.location.reload(true), 1000);
        } catch({ message }) { setMessages({ error: message }); }
    }

    const handleDelete = async (_id) => {
        try {
            const { data: { deletePost } } = await client.mutate({ mutation: DELETE_POST, variables: { _id } });
            setMessages({ success: `L'article "${deletePost.title}" a été définitivement supprimé` });
            setTimeout(() => window.location.reload(true), 1000);
        } catch({ message }) { setMessages({ error: message }); }
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data: { draft } } = await client.query({ query: DRAFT });
                setPosts(draft);
            } catch({ message }) { setMessages({ error: message }); }
        }
        getPosts();
    });

    let _posts = posts.map((d, k) => <PostResume
                                            trash={true}
                                            onDelete={handleDelete}
                                            onRemoveToTrash={handleRemoveFromTrash}
                                            data={d} key={k} />);

    return (
        <>
            <Title message="Corbeille 🗑️" />
            <DataCounter total={posts.length} type="article" />
            <Messages error={messages.error} success={messages.success} />
            { _posts }
        </>
    );
}

const POSTS = gql`
{
    posts {
        _id
        title
        createdAt
    }
}
`;

const DRAFT = gql`
{
    draft {
        _id
        title
        createdAt
    }
}
`;

const CREATE_POST = gql`
    mutation CreatePost(
        $title: String!,
        $categories: [String!],
        $tags: [String!],
        $picture: ID!,
        $content: String!,
        $draft: Boolean!,
        $extract: String!,
    ) {
        createPost(
            title: $title,
            categories: $categories,
            tags: $tags,
            picture: $picture,
            content: $content,
            draft: $draft,
            extract: $extract
        ) {
            _id
            title
        }
    }
`;

const GET_POST = gql`
    query GetPost($_id: ID!) {
        post(_id: $_id) {
            _id, title, content,
            categories { _id, name }, tags { _id, name },
            extract, draft
        }
    }
`;

const MOVE_TO_DRAFT = gql`
    mutation MoveToDraft($_id: ID!) {
        moveToDraft(_id: $_id) {
            title
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($_id: ID!) {
        deletePost(_id: $_id) {
            title
        }
    }
`;

const REMOVE_FROM_TRASH = gql`
    mutation RemoveFromTrash($_id: ID!) {
        updatePost(_id: $_id, active: true) {
            title
        }
    }
`;