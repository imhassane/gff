import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import DraftToHTML from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TagFinder } from "./tag";
import { ChooseCategory } from "./category";
import { PostFileUpload, PostUploaded } from "./upload";
import { PostPlanning } from "../components/planning";
import Loader from "../components/loader";
import client from "../config/apollo";
import { PostResume } from "../components/post";
import gql from "graphql-tag";

export class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            content: null, title: null,
            tags: [], categories: [],
            pictures: []
        };
    }
    handleEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }
    handlePictureUpload = (picture) => {
        this.setState({ pictures: [ ...this.state.pictures, picture ]});
    }
    renderEditor = () => {
        const { editorState } = this.state;
        return (
            <div className="uk-grid-small" uk-grid="true">
                <div className="uk-width-3-5@m">
                    <div className="uk-margin">
                        <input type="text" placeholder="Titre de l'article" className="uk-input uk-width-1-1 uk-form-blank" />
                    </div>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.handleEditorStateChange}
                        hashtag={{
                            separator: ' ',
                            trigger: '#',
                        }}
                    />
                </div>
                <div className="uk-width-2-5@m">
                    <div>
                        <div>
                            <strong>Planification de l'article</strong>
                            <PostPlanning />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Tags</strong>
                            <TagFinder />
                        </div>
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Catégories</strong>
                            <ChooseCategory />
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
        return (
            <div>
                <div>
                    { this.renderEditor() }
                </div>
            </div>
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