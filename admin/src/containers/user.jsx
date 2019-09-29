import React, { useState, useEffect } from "react";

import gql from "graphql-tag";

import { UserTable, UserTableElement } from "../components/user";
import client from "../config/apollo";

import { matchToSearch } from "../config/helpers";
import { DataCounter, Title } from "../components/utility";
import { Messages } from "../components/messages";
import Loader from "../components/loader";

export const UserList = (props) => {
    let [users, setUsers] = useState(null);
    let [message, setMessage] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await client.query({ query: USERS });
                setUsers(data.users);
            } catch({ message }) { setMessage(message); }
        }
        getUsers();
    }, []);

    
    if(!users) return <Loader />;
    let _users = users.filter(u => matchToSearch(u.username, props.search));
    let _super_users = _users.filter(u => u.permissions.includes('SUPER_USER'));
    let _managers = _users.filter(u => u.permissions.includes('MANAGER'));
    let _authors = _users.filter(u => u.permissions.includes('AUTHOR'));
    let _members = _users.filter(u => u.permissions.includes('MEMBER'));

    _super_users = _super_users.map((d, k) => <UserTableElement data={d} key={k} />);
    _managers = _managers.map((d, k) => <UserTableElement data={d} key={k} />);
    _authors = _authors.map((d, k) => <UserTableElement data={d} key={k} />);
    _members = _members.map((d, k) => <UserTableElement data={d} key={k} />);

    let _render = (
        <div className="uk-margin">
            <h3>Superviseurs</h3>
            <UserTable>{ _super_users }</UserTable>

            <h3>Managers</h3>
            <UserTable>{ _managers }</UserTable>

            <h3>Auteurs</h3>
            <UserTable>{ _authors }</UserTable>

            <h3>Membres</h3>
            <UserTable>{ _members }</UserTable>
        </div>
    );

    return (
        <>
            <Title message="Gestion des utilisateurs" />
            <Messages error={message} />
            <DataCounter total={users.length} type="utilisateur" />
            { _render }
        </>
    );
}

const USERS = gql`
    {
        users {
            username
            is_active
            permissions
            posts {
                _id
            }
            createdAt
        }
    }
`;
