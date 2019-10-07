import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import { Title } from "../components/utility";
import { Messages } from "../components/messages";
import { matchToSearch } from "../config/helpers";
import Loader from "../components/loader";
import { Page } from "../components/menu";


export const MenuPage = props => {
    const [pages, setPages] = useState(null);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const getPages = async () => {
            try {
                const { data } = await client.query({ query: PAGES });
                setPages(data.pages);
            } catch({ message }) { setMessages({ error: message }); }
        };
        getPages();
    });

    const handleEditRank = async (_id) => {
        try {
            let variables = { _id };
            variables.rank = parseInt(prompt("Entrez le nouveau rang de la page"));
            const { data: { updatePage } } = await client.mutate({ mutation: UPDATE_RANK, variables });
            setMessages({ success: `Le rang de la page ${updatePage.title} a été mis à jour`});
            setTimeout(() => document.location.reload(true) , 300);
        } catch({ message }){ setMessages({ error: message }); }
    }

    if(!pages) return <Loader />;

    let _pages = pages.filter(p => matchToSearch(p.title, props.search));
    _pages = _pages.map((d, k) => <Page data={d} key={k} onEditRank={handleEditRank} />);

    return (
        <>
            <Title message="Organisation du menu" />
            <Messages {...messages} />
            {_pages}
        </>
    );
};

const PAGES = gql`
    {
        pages {
            _id
            title
            rank
        }
    }
`;

const UPDATE_RANK = gql`
    mutation UpdatePage($_id: ID!, $rank: Int) {
        updatePage(_id: $_id, rank: $rank) {
            title
        }
    }
`;