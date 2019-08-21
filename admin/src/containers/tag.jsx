import React from "react";
import client from "../config/apollo";
import { TagFinderForm, TagResume, TagForm } from "../components/tag";
import gql from "graphql-tag";
import { Success, Error } from "../components/messages";

export class TagFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: "",
            tags: this.props.tags ? this.props.tags : [],
            choosenTags: {},
            errors: []
        };
    }

    componentDidMount = async () => {
        await this.getTags();
    }

    getTags = async () => {
        if(!this.props.tags) {
            try {
                let { data: { tags } } = await client.query({ query: TAGS });
                this.setState({ tags });
            } catch({ message }) {
                this.setState({ errors: { message } });
            }
        }
    }

    createTag = async (data) => {
        try {
            let { data: { createTag } } = await client.mutate({ mutation: CREATE_TAG, variables: data });
            await this.getTags();
            return createTag;
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }

    handleTagNameChange = async (tag) => {
        
        this.setState({ tag });
        if(tag[tag.length - 1] === ',') {
            let data = await this.createTag({ name: tag.slice(0, tag.length - 1 )});
            this.handleTagSelection(data);
        }
    }

    handleTagSelection = (data) => {
        let { choosenTags } = this.state;
        let object = {};
        object[data._id] = data;

        this.setState({ choosenTags: Object.assign({}, choosenTags, object) });
        choosenTags = Object.keys(choosenTags);
        this.props.onTagSelect(choosenTags);
    }

    handleTagRemove = (tag) => {
        let { choosenTags } = this.state;
        let data = choosenTags[tag._id];
        if(data) delete choosenTags[tag._id];
        this.setState({ choosenTags });
        choosenTags = Object.keys(choosenTags);
        this.props.onTagSelect(choosenTags);
    }

    renderForm = () => {
        let { tags, tag, choosenTags } = this.state;
        tags = tags.filter(t => t.name.toLowerCase().includes(tag));
        tags = tags.map((d, k) => <TagResume onTagSelect={this.handleTagSelection} data={d} key={k} />);
        choosenTags = Object.keys(choosenTags).map((d, k) => <TagResume onTagSelect={this.handleTagRemove} data={choosenTags[d]} key={k} />);

        return (
            <div>
                <div>
                    <TagFinderForm onTagNameChange={this.handleTagNameChange} />
                </div>
                <div>
                    <div>
                        { tag.length > 0 && tags }
                    </div>
                    { choosenTags.length > 0 && (
                        <div>
                            <p><strong><i>Tags choisis pour cet article</i></strong></p>
                            { choosenTags }
                        </div>
                    )}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <div>
                    { this.renderForm() }
                </div>
            </div>
        );
    }
}

export class TagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tags: [], errors: { }, currentTag: null };
    }
    componentDidMount = async () => {
        try {
            let { data: { tags} } = await client.query({ query: TAGS });
            this.setState({ tags });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    handleTagSelect = async (currentTag) => {
        if(this.state.currentTag && this.state.currentTag._id === currentTag._id) this.setState({ currentTag: null })
        else this.setState({ currentTag });
    }
    renderTags = () => {
        let { tags } = this.state;
        let { search } = this.props;
        tags = tags.filter(t => t.name.toLowerCase().includes(search));
        tags = tags.map((d, k) => <TagResume onTagSelect={this.handleTagSelect} data={d} key={k} />)
        return (
            <div>
                <div>{ tags }</div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <h1>Liste des tags</h1>
                <p className="uk-text-meta">{ this.state.tags.length } au total</p>
                <div className="uk-grid-small uk-child-width-1-2@m" uk-grid="true">
                    <div>{ this.renderTags() }</div>
                    { this.state.currentTag && (
                        <UpdateTag data={this.state.currentTag} />
                    )}
                </div>
            </div>
        );
    }
}

export class CreateTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
    }
    handleNameChange = (name) => {
        if(name.length > 3) this.setState({ name, errors: { ...this.state.errors, name: null } });
        else this.setState({ name, errors: { name: "Le nom du tag doit dépasser 3 caractères"} });
    }
    handleSubmit = async () => {
        try {
            let { name } = this.state;
            let { data: { createTag} } = await client.mutate({ mutation: CREATE_TAG, variables: { name } })
            this.setState({ success: createTag.name });
        } catch({ message}) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    renderForm = () => (
        <div>
            { this.state.success && (
                <Success message={`Le tag ${this.state.success} a été ajouté avec succès`} />
            )}
            <TagForm onSubmit={this.handleSubmit} onNameChange={this.handleNameChange} errors={this.state.errors} />
        </div>
    )
    render() {
        return (
            <div>
                <h1>Nouveau tag</h1>
                { this.renderForm() }
            </div>
        )
    }
}

class UpdateTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.data, errors: {} };
    }
    handleNameChange = (name) => {
        if(name.length >= 3) this.setState({ name, errors: { ...this.state.errors, name: null }})
        else this.setState({ name, errors: { name: "Le nom doit contenir au moins 3 caractères", ...this.state.errors }})
    }
    handleSubmit = async () => {
        try {
            let { _id, name } = this.state;
            let { data: { updateTag } } = await client.mutate({ mutation: UPDATE_TAG, variables: { _id, name }});
            this.setState({ success: updateTag.name });
        } catch({ message }) {
            this.setState({ errors: { message, ...this.state.errors }});
        }
    }
    renderForm = () => (
        <div>
            { this.state.success && <Success message={`Le tag ${this.state.success} a été mis à jour avec succès`} />}
            { this.state.errors.message && <Error message={this.state.errors.message} /> }
            <TagForm
                onSubmit={this.handleSubmit}
                onNameChange={this.handleNameChange}
                errors={this.state.errors}
                values={{ name: this.state.name }}
            />
        </div>
    )
    render() {
        return (
            <div>
                <h3>Modification</h3>
                <div>
                    { this.renderForm() }
                </div>
            </div>
        )
    }
}

const TAGS = gql`
    {
        tags {
            _id
            name
        }
    }
`;

const CREATE_TAG = gql`
    mutation CreateTag($name: String!) {
        createTag(name: $name) {
            _id
            name
        }
    }
`;

const UPDATE_TAG = gql`
    mutation UpdateTag($_id: ID!, $name: String!) {
        updateTag(_id: $_id, name: $name) {
            _id
            name
        }
    }
`;