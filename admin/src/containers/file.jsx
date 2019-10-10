import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import Loader from "../components/loader";
import { DataCounter, Title } from "../components/utility";
import { Messages } from "../components/messages";
import { File } from "../components/file";

export const Files = () => {
    const [files, setFiles] = useState([]);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const getFiles = async () => {
            try {
                const { data: { pictures } } = await client.query({ query: PICTURES });
                setFiles(pictures)
            } catch({ message }) { setMessages({ error: message }); }
        };
        getFiles();
    });

    let _files = files.map((d, k) => <File data={d} key={k} />);

    return (
        <>
            <Title message="Gestion des fichiers" />
            <DataCounter total={files.length} type="fichier" />
            <Messages error={messages.error} success={messages.success} />
            { !files.length && <Loader /> }
            <div className="uk-grid-small uk-child-width-1-5@m uk-child-width-1-2@s" uk-grid="masonry:true">
                { _files }
            </div>
        </>
    );
};

const PICTURES = gql`
    {
        pictures(type: "POST") {
            _id
            path
        }
    }
`;