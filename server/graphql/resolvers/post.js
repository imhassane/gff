const { Post, validatePost } = require('../../models/post');

const posts = async () => {
    try {
        let _posts = await Post.find();
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

        let _post = new Post(data);

        _post = await _post.save();
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