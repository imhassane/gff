import React from "react";
import S3 from "react-s3";
import S3Config from "../config/aws";

import client from "../config/apollo";
import gql  from "graphql-tag";

import { PostFileUploadForm, PostFileUploadResume } from "../components/upload";

export class PostFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: { }, pictures: [], uploading: false };
    }
    handleUpload = async (data) => {
        try {
            this.setState({ uploading: true })
            const { location } = await S3.uploadFile(data, S3Config);
            
            let { data: { createPicture } } = await client.mutate({ mutation: CREATE_PICTURE, variables: { path: location } });
            
            let { pictures } = this.state;
            pictures = [ ...pictures, createPicture ];

            this.setState({ pictures, uploading: false });

            this.props.onPictureUpload(pictures);

        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message}});
        }
    }
    renderForm = () =>  <PostFileUploadForm onFileUpload={this.handleUpload} />;

    render() {
        return (
            <>
                <div>{ this.renderForm() }</div>
            </>
        );
    }
}

export class PostUploaded extends React.Component {
    renderUploaded = () => {
        let { uploads } = this.props;
        uploads = uploads.map((d, k) => <PostFileUploadResume data={d} key={k} />);
        return (
            <>
                { uploads }
            </>
        )
    }
    render() {
        return (
            <>
                <strong>Fichiers téléchargés</strong>
                { this.renderUploaded() }
            </>
        );
    }
}

const CREATE_PICTURE = gql`
    mutation CreatePicture($path: String!){
        createPicture(type: "POST", path: $path) {
            _id
            path
        }
    }
`;