import React from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import Loader from "../components/loader";
import { Reader } from "../components/reader";
import { Title } from "../components/utility";

export class ReaderList extends React.Component {
    state = { errors: {} };
    componentDidMount = async () => {
        try {
            let { data: { readers } } = await client.query({ query: READER_LIST });
            this.setState({ readers });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }});
        }
    }
    renderReader = () => {
        let { readers } = this.state;
        readers = readers.filter(r => r.email.toLowerCase().includes(this.props.search));
        readers = readers.map((d, k) => <Reader data={d} key={k} />);
        return (
            <table className="uk-table uk-table-divider uk-table-small">
                <thead>
                    <th>Adresse email</th>
                    <th>Actif</th>
                    <th>Actif depuis</th>
                </thead>
                <tbody>{ readers }</tbody>
            </table>
        );
    }
    render = () => {
        const { readers } = this.state;
        if(!readers) return <Loader />;
        return (
            <>
                <Title message="Abonnés" />
                <p className="uk-margin">{ readers.length } abonnés au total</p>
                { this.renderReader() }
            </>
        );
    }
};

const READER_LIST = gql`
    {
        readers {
            email
            deleted
            createdAt
        }
    }
`;
