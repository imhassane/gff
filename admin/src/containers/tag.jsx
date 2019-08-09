import React from "react";
import client from "../config/apollo";
import { TagFinderForm, TagResume } from "../components/tag";
import gql from "graphql-tag";

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
        if(!this.props.tags) {
            try {
                let { data: { tags } } = await client.query({ query: TAGS });
                this.setState({ tags });
            } catch({ message }) {
                this.setState({ errors: { message } });
            }
        }
    }

    handleTagNameChange = (tag) => {
        this.setState({ tag });
    }

    handleTagSelection = (data) => {
        const { choosenTags } = this.state;
        let object = {};
        object[data._id] = data;

        this.setState({ choosenTags: Object.assign({}, choosenTags, object) });
    }

    handleTagRemove = (tag) => {
        let { choosenTags } = this.state;
        let data = choosenTags[tag._id];
        if(data) delete choosenTags[tag._id];
        this.setState({ choosenTags });
        
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

const TAGS = gql`
    {
        tags {
            _id
            name
        }
    }
`;