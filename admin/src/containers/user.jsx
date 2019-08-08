import React from "react";

import gql from "graphql-tag";

import { ProfileResume } from "../components/user";
import client from "../config/apollo";

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], errors: {} };
    }
    componentDidMount = async () => {
        try {
            const { data: { users } } = await client.query({ query: USERS });
            this.setState({ users });
            console.log(users)
        } catch({ message }) {
            this.setState({ errors: { message }});
            console.log(message)
        }
    }
    renderUsers = () => {
        let { users } = this.state;
        users = users.filter(u => u.username.toLowerCase().includes(this.props.search) || u.email.toLowerCase().includes(this.props.search));
        users = users.map((d, k) => (
            <div>
                <ProfileResume data={d} key={k} />
            </div>
        ));

        return (
            <div className="uk-grid-small" uk-grid="true">
                { users }
            </div>
        );
    }
    render() {
        return this.renderUsers();
    }
}

const USERS = gql`
    {
        users {
            username
            email
            is_active
            is_staff
            createdAt
        }
    }
`;
