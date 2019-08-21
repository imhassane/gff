const { Comment, validateComment } = require('../../models/Comment');
const { Post } = require('../../models/post');
const { RESSOURCE_DOESNT_EXIST } = require('../errors');

const allComments = async (parent, data, context) => {
    try {
        const _comments = await Comment.find(data)
                                        .sort('-createdAt')
                                        .populate('post')
                                        .populate('comment')
                                        .populate('comments');
        return _comments;
    } catch(err) {
        throw err;
    }
};

const comments = async (parent, data, context) => {
    try {
        const _comments = await Comment.find(data)
                                        .sort('-createdAt')
                                        .populate('post')
                                        .populate('comment')
                                        .populate('comments');
        return _comments;
    } catch(err) {
        throw err;
    }
};

const comment = async (parent, data, context) => {
    try {
        const _comment = await Comment.findOne(data)
                                        .populate('post')
                                        .populate('comment')
                                        .populate('comments');
        if(!_comment) throw new Error(RESSOURCE_DOESNT_EXIST);
        return _comment;
    } catch(ex) {
        throw ex;
    }
}

const createComment = async (parent, data, context) => {
    try {
        const { errors } = validateComment(data);
        if(errors) throw new Error(errors.details[0].message);

        let post = null, comment = null;
        if(data.post) post = await Post.findById(data.post);

        if(data.comment) comment = await Post.findById(data.comment);

        let _comment = new Comment(data);
        _comment.post = post;
        _comment.comment = comment;

        _comment = await _comment.save();

        if(post) {
            post.comments.push(_comment);
            await post.save();
        }

        if(comment) {
            comment.comments.push(_comment);
            await comment.save();
        }

        return _comment;
    } catch(ex) {
        throw ex;
    }
}

const updateComment = async (parent, data, context) => {
    try {
        const _comment = await Comment.findByIdAndUpdate(data._id, { $set: data }, { new: true });
        return _comment;
    } catch(ex) {
        throw ex;
    }
}

const deleteComment = async (parent, data, context) => {
    try {
        const _comment = await Comment.findOne(data);
        if(_comment) await Comment.findOneAndRemove(data);
        return !_comment ? {} : _comment;
    } catch(ex) {
        throw ex;
    }
};

module.exports = {
    CommentQuery: { allComments, comments, comment },
    CommentMutation: { deleteComment, createComment, updateComment }
}