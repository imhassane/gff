import React from "react";
import gql from "graphql-tag";

import client from "../config/apollo";
import { Error } from "../components/messages";
import Loader from "../components/loader";
import { Title, Empty } from "../components/utility";
import { CommentResume, CommentFilter, CommentTable, CommentDetail, CommentActions } from "../components/comment";

export class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {}, filter: { valid: true }, current: null };
    }
    componentDidMount = async () => {
        try {
            let { data: { allComments } } = await client.query({ query: All_COMMENTS });
            this.setState({ comments: allComments });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message }})
        }
    }
    handleCommentSelection = (current) => {
        const { comments } = this.state;
        this.setState({ current: comments[current] });
    }
    handleFilterChange = (filter) => {
        this.setState({ filter: { ...this.state.filter, ...filter }});
    }
    renderComments = () => {
        let { comments, filter } = this.state;
        let { search } = this.props;

        comments = comments.filter(c => c.valid === filter.valid);
        comments = comments.filter(c => c.username.includes(search) || c.content.includes(search));
        comments = comments.map((d, k) => (<CommentResume onSelection={this.handleCommentSelection} data={d} index={k} key={k} />));

        return <CommentTable>{comments.length > 0 ? comments : <td colSpan={4}><Empty message="Aucun commentaire pour le moment" /></td>}</CommentTable>;
    }
    render() {
        const { errors, comments, current } = this.state;
        if(errors.message) return <Error message={errors.message} />
        if(!comments) return <Loader />
        return (
            <>
                <Title message="Liste des commentaires"/>
                <div>
                    <p className="uk-text meta">{ comments.length } commentaires au total</p>
                    <p><strong>Les commentaires apparaissant ici ont déjà été approuvés.</strong></p>
                    <CommentFilter onFilterChange={this.handleFilterChange} />
                </div>
                {this.renderComments()}
                <Comment comment={current} />
            </>
        )
    }
}

class Comment extends React.Component {
    state = { errors: {} };

    handleValidateComment = async (_id) => {
        try {
            let { data } = await client.mutate({ mutation: VALIDATE_COMMENT, variables: { _id, valid: true}});
            if(data._id) this.setState({ success: true });
        } catch({ message }) {
            console.error(message)
            this.setState({ errors: { ...this.state.errors, message }})
        }
    }
    handleDeleteComment = async (_id) => {
        try {
            const { data: { deleteComment } } = await client.mutate({ mutation: DELETE_COMMENT, variables: { _id } });
            this.setState({ deleteComment });
        } catch({ message }) {
            this.setState({ errors: { ...this.state.errors, message } })
        }
    }
    render() {
        let { comment } = this.props;
        let { deleteComment } = this.state;
        if(!comment) return <></>;
        return (
            <div id="offcanvas-comment" uk-offcanvas="flip: true; mode: reveal; bg-close: true, esc-close: true">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" uk-close="true"></button>
                    <CommentDetail {...comment} deleteComment={deleteComment} />
                    <CommentActions
                        onValidate={this.handleValidateComment}
                        onDelete={this.handleDeleteComment}
                        comment={comment}
                    />
                </div>
            </div>
        );
    }
}

const All_COMMENTS = gql`
    {
        allComments {
            _id
            username
            email
            content
            valid
            createdAt
        }
    }
`;

const VALIDATE_COMMENT = gql`
    mutation ValidateComment($_id: ID!, $valid: Boolean!) {
        updateComment(_id: $_id, valid: $valid) {
            _id
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation DeleteComment($_id: ID!) {
        deleteComment(_id: $_id) {
            _id
        }
    }
`;