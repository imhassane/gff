import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import DraftToHTML from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TagFinder } from "./tag";

export class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            content: null, title: null,
            tags: [], categories: []
        };
    }
    handleEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
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
                        <div className="uk-margin-small">
                            <strong className="uk-margin">Tags</strong>
                            <TagFinder />
                        </div>
                        <div>
                            <strong className="uk-margin">Catégories</strong>
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