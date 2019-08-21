import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TagFinder } from "./tag";
import { ChooseCategory } from "./category";
import { PostFileUpload, PostUploaded } from "./upload";
import { PostPlanning } from "../components/planning";
import Loader from "../components/loader";
import client from "../config/apollo";
import { PostResume } from "../components/post";
import gql from "graphql-tag";
import { Success, Error } from "../components/messages";

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
            pictures: [],
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
    handleSubmit = async () => {
        try {
            let { editorState, title, tags, categories, pictures } = this.state;
            let rawContent = convertToRaw(editorState.getCurrentContent(), hashtagConfig);
            let content = draftToHtml(rawContent);
            
            let variables = { title, content, tags, categories, pictures, picture: "5d5be1044dfc394ac4dbd930" };

            let { data: { _id } } = await client.mutate({ mutation: CREATE_POST, variables });
            if(_id) this.setState({ success: `L'article ${title} a été publié avec succès`, errors: {} });

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
                            <PostPlanning onSubmit={this.handleSubmit} />
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
    renderPosts = () => {
        let { posts } = this.state;
        posts = posts.filter(p => p.title.toLowerCase().includes(this.props.search));
        posts = posts.map((d, k) => <PostResume data={d} key={k} />);
        return (
            <div>{ posts }</div>
        )
    }
    render() {
        if(!this.state.posts) return <Loader />
        return (
            <div>
                <h1>Articles publiés</h1>
                <div>
                    { this.renderPosts() }
                </div>
            </div>
        );
    }
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

const CREATE_POST = gql`
    mutation CreatePost(
        $title: String!,
        $categories: [String!],
        $tags: [String!],
        $picture: ID!,
        $content: String!,
    ) {
        createPost(
            title: $title,
            categories: $categories,
            tags: $tags,
            picture: $picture,
            content: $content,
            author: "5d4c34e388156d472c9b2f4d"
        ) {
            _id
            title
        }
    }
`;