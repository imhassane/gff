import React, { useState, useEffect } from "react";

import gql from "graphql-tag";

import { UserTable, UserTableElement, ProfileResume, ChangePasswordPage, ManageUserPage } from "../components/user";
import client from "../config/apollo";
import routes from "../routes";

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

    _super_users = _super_users.map((d, k) => <UserTableElement permission={props.USER_PERMISSION} data={d} key={k} />);
    _managers = _managers.map((d, k) => <UserTableElement permission={props.USER_PERMISSION} data={d} key={k} />);
    _authors = _authors.map((d, k) => <UserTableElement permission={props.USER_PERMISSION} data={d} key={k} />);
    _members = _members.map((d, k) => <UserTableElement permission={props.USER_PERMISSION} data={d} key={k} />);

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

export const UserProfile = (props) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { me } } = await client.query({ query: ME });
                setUser(me);
            } catch({ message }) { setMessages({ error: messages }); }
        }
        getUser();
    }, []);

    if(!user) return <Loader />
    return (
        <>
            <Messages error={messages.error} />
            <ProfileResume data={user} />
        </>
    )
};

export const ChangePassword = props => {
    const [old, setOld] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [rptPassword, setRptPassword] = useState(null);
    const [messages, setMessages] = useState({});

    const handleRptChange = value => {
        if(value !== newPassword) setMessages({ rpt: "Ce mot de passe ne correspond pas au nouveau"});
        else setMessages({ rpt: null });

        setRptPassword(value);
    }

    const handleSubmit = async () => {
        try {
            if(!old || !newPassword || !rptPassword) setMessages({ error: "Tous les champs doivent être remplis" });
            else {
                const { data: { updatePassword } } = await client.mutate({ mutation: UPDATE_PASSWORD, variables: { oldPassword: old, password: newPassword }});
                if(updatePassword) setMessages({ success: "Le mot de passe a été modifié avec succès, vous allez être rédirigé vers votre profil" });
                setTimeout(() => props.history.push(routes.ME) , 1000);
            }
        } catch({ message }) { setMessages({ error: message }); }
    }

    return (
        <>
            <Title message="Changement du mot de passe" />
            <Messages error={messages.error} success={messages.success} />
            <ChangePasswordPage
                onOldChange={setOld}
                onNewChange={setNewPassword}
                onRptChange={handleRptChange}
                onSubmit={handleSubmit}
                errors={messages}
            />
        </>
    );
}

export const ManageUser = (props) => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await client.query({ query: USER, variables: { _id: props.match.params._id }});
                setUser(data.user);
            } catch({ message}) { setMessages({ error: message }); }
        };
        getUser();
    }, []);
    
    if(!user) return <Loader />;

    return (
        <>
            <Title message="Gestion d'utilisateur" />
            <Messages error={messages.error} success={messages.success} />
            <ManageUserPage data={user} />
        </>
    );
}

const USERS = gql`
    {
        users {
            _id
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

const USER = gql`
    query User($_id: ID!){
        user(_id: $_id) {
            _id
            username
            is_active
            permissions
            picture { path }
            posts {
                _id
            }
            createdAt
        }
    }
`;

const ME = gql`
    {
        me {
            _id, views, post_view_counter, comment_counter,
            username, posts { _id }, permissions, picture { path }, createdAt
        }
    }
`;

const UPDATE_PASSWORD = gql`
    mutation ChangePassword($oldPassword: String!, $password: String!) {
        updatePassword(oldPassword: $oldPassword, password: $password) {
            _id
        }
    }
`;