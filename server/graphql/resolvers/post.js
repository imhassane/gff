const { Post, validatePost } = require('../../models/post');
const { User } = require('../../models/user');
const { USER_DOESNT_EXIST } = require('../errors');

const posts = async () => {
    try {
        let _posts = await Post.find().populate('user');
        return _posts;
    } catch(ex) {
        throw ex;
    }
};

const post = async (parent, data, context) => {
    try {
        const _post = await Post.findOne(data);
        // Test de l'existance du Post.

        return _post;
    } catch(ex) {
        throw ex;
    }
};

const createPost = async (parent, data, context) => {
    try {
        const { errors } = validatePost(data);
        if(errors) throw new Error(errors.details[0].message);

        let _author = await User.findOne({ _id: data.author });
        if(!_author) throw new Error(USER_DOESNT_EXIST);

        let _post = new Post(data);
        _post = await _post.save();

        _post.author = _author;
        await _post.save();

        _author.posts.push(_post);
        await _author.save();

        return _post;
    } catch(ex) {
        throw ex;
    }
};

const updatePost = async (parent, data, context) => {
    try {
        let _post = await Post.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _post;
    } catch(ex) {

    }
};

const deletePost = async (parent, data, context) => {
    try {
        let _post = await Post.findOneAndRemove(data);
        return _post;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    PostQuery: { posts, post },
    PostMutation: { createPost, updatePost, deletePost }
}