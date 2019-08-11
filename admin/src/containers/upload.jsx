import React from "react";
import S3 from "react-s3";
import S3Config from "../config/aws";

import Loader from "../components/loader";

import { PostFileUploadForm, PostFileUploadResume } from "../components/upload";

export class PostFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: { }, uploading: false };
    }
    handleUpload = async (data) => {
        try {
            this.setState({ uploading: true })
            const { key, location } = await S3.uploadFile(data, S3Config);
            let object = {};

            object[key] = { location, key };
            this.setState({ pictures: { ...this.state.pictures, ...object }, uploading: false });

            this.props.onPictureUpload(location);

        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message}});
        }
    }
    renderForm = () => {
        return (
            <div>
                <PostFileUploadForm onFileUpload={this.handleUpload} />
            </div>
        )
    }
    render() {
        return (
            <div>
                <div>{ this.renderForm() }</div>
            </div>
        );
    }
}

export class PostUploaded extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uploads: [ ...props.uploads ] };
    }
    renderUploaded = () => {
        let { uploads } = this.state;
        uploads = uploads.map((d, k) => <PostFileUploadResume data={d} key={k} />);
        return (
            <div>
                { uploads }
            </div>
        )
    }
    render() {
        return (
            <div>
                { this.renderUploaded() }
            </div>
        );
    }
}
