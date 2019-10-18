import React, { useState, useEffect } from "react";
import S3 from "react-s3";
import S3Config from "../config/aws";

import client from "../config/apollo";
import gql  from "graphql-tag";

import { PostFileUploadForm, PostFileUploadResume, SelectedPicture } from "../components/upload";
import { Title } from "../components/utility";
import routes from "../routes";
import { Messages } from "../components/messages";
import Loader from "../components/loader";
import useModal from "react-hooks-use-modal";

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

export const UserPictureUpdate = props => {
    const [picture, setPicture] = useState(null);
    const [messages, setMessages] = useState({});

    const handlePictureChange = async (pictures) => {
        setPicture(pictures[0]._id);
        try {
            if(picture) {
                await client.mutate({ mutation: UPDATE_PICTURE, variables: { _id: pictures[0]._id }});
                setMessages({ success: "Votre image de profil a bien été changée" });
                setTimeout(() => props.history.push(routes.ME), 1000);
            }
        } catch({ message }) { setMessages({ error: message }); }
    };
    return (
        <>
            <Title message="Mise à jour de l'image de profil" />
            <Messages error={messages.error} success={messages.success} />
            <PostFileUpload onPictureUpload={handlePictureChange} />
        </>
    );
}

export const SelectFile = props => {
    const [pictures, setPictures] = useState([]);
    const [selected, setSelected] = useState(null);
    const [messages, setMessages] = useState({});
    const [Modal, open, close] = useModal('root');

    const setSelectedPicture = path => setSelected(path);

    useEffect(() => {
        const getPictures = async () => {
            try {
                const { data: { pictures } } = await client.query({ query: PICTURES });
                setPictures(pictures);
            } catch({ message }) { setMessages({ error: message }); }
        }
        getPictures();
    });

    if(!pictures.length) return <Loader />;

    let _pictures = pictures.map((d, k) => <SelectedPicture onSelected={setSelectedPicture} data={d} key={k} />);
    
    return (
        <div className="uk-margin">
            <button onClick={open}>Choisir un fichier</button>
            <Modal>
                <div className="uk-container" style={{ overflow: 'scroll' }}>
                    <button onClick={close}>Fermer</button>
                    <Messages error={messages.error} />
                    { selected && (
                        <p>
                            <img width="40" height="40" src={selected} alt={selected} />
                            <span>{selected}</span>
                        </p>
                    )}
                    <div>
                        <div className="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid="masonry:true">
                            { _pictures }
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const CREATE_PICTURE = gql`
    mutation CreatePicture($path: String!){
        createPicture(type: "POST", path: $path) {
            _id
            path
        }
    }
`;

const UPDATE_PICTURE = gql`
    mutation UpdatePicture($_id: ID!) {
        updateUserPicture(_id: $_id) {
            username
        }
    }
`;

const PICTURES = gql`
    {
        pictures(type: "POST") {
            _id
            path
        }
    }
`;