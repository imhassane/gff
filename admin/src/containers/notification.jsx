import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import { Messages } from "../components/messages";
import { matchToSearch } from "../config/helpers";
import { Notifications } from "../components/notification";
import { DataCounter, Title } from "../components/utility";

export const NotificationList = props => {

    let [notifications, setNotifications] = useState([]);
    let [message, setMessage] = useState({});
    let [seen, setSeen] = useState(false);
    let [type, setType] = useState("");
    
    const getNotifications = async () => {
        try {
            const { data } = await client.query({ query: NOTIFICATIONS_LIST });
            setNotifications(data.notifications);
        } catch({ message }) {
            setMessage({ error: message });
        }
    };

    useEffect(() => { 
        getNotifications();
    }, []);

    const handleMarkAsRead = async (_id) => {
        try {
            await client.mutate({ mutation: NOTIFICATIONS_UPDATE , variables: { _id, seen: !seen } });
            setMessage({ success: "La notification est marquée comme lue "});
        } catch({ message }) { setMessage({ error: message }); }
    }

    let _notifications = notifications.filter(n => n.seen === seen && n.type.includes(type));
    _notifications = _notifications.filter(n => matchToSearch(n.title, props.search));
    _notifications = _notifications.map((d, k) => <Notifications onMarkAsRead={handleMarkAsRead} key={k} data={d} />);


    return (
        <>
            <Title message="Notifications" />
            <DataCounter total={notifications.length} type="notification" />
            <Messages message={message.error} success={message.success} />
            <div className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-1@s uk-grid-match" uk-grid="true">
                <div>
                    <div>
                        <input onChange={ _ => setSeen(!seen) } type="checkbox" className="uk-checkbox"/>
                        <span className="uk-margin-left">Afficher les notifications déjà lues</span>
                    </div>
                </div>
                <div>
                    <div>
                        <select className="uk-select uk-form-small" onChange={({ target: {value }}) => setType(value) }>
                            <option value="">Afficher toutes les notifications</option>
                            <option value="COMMENT">Afficher seulement les commentaires</option>
                            <option value="CONTACT">Afficher seulement les contacts</option>
                        </select>
                    </div>
                </div>
            </div>
            { _notifications }
        </>
    );
};

const NOTIFICATIONS_LIST = gql`
    {
        notifications {
            _id
            title
            type
            seen
            createdAt
        }
    }
`;

const NOTIFICATIONS_UPDATE = gql`
    mutation UpdateNotification($_id: ID!, $seen: Boolean) {
        updateNotification(_id: $_id, seen: $seen) {
            _id, title, type, seen, createdAt
        }
    }
`;