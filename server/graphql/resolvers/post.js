const { Post, validatePost } = require('../../models/post');
const { User } = require('../../models/user');
const { Picture } = require('../../models/picture');
const { POST_DOESNT_EXIST, INVALID_PERMISSION } = require('../errors');
const { canWrite, canDelete, canUpdate } = require('../../helpers');

const posts = async () => {
    try {
        let _posts = await Post.find()
                                .populate('author')
                                .populate('comments')
                                .populate('picture')
                                .populate('tags')
                                .populate('categories')
                                .sort('-createdAt');
        return _posts;
    } catch(ex) {
        throw ex;
    }
};

const getPosts = async (parent, data, context) => {
    try {
        let _posts = await posts();
        _posts = _posts.slice(0, data.limit);
        return _posts;
    } catch(ex) {
        throw ex;
    }
}

const post = async (parent, data, context) => {
    try {
        const _post = await Post.findOne(data)
                                .populate('author')
                                .populate('tags')
                                .populate('categories')
                                .populate('picture')
                                .populate('comments');
        // Test de l'existance du Post.
        if(!_post) throw new Error(POST_DOESNT_EXIST);
        
        return _post;
    } catch(ex) {
        throw ex;
    }
};

const createPost = async (parent, data, context) => {
    if(!canWrite(context.user)) throw new Error(INVALID_PERMISSION);
    try {
        const { errors } = validatePost(data);
        if(errors) throw new Error(errors.details[0].message);

        let _post = new Post(data);
        _post.author = context.user;
        await _post.save();

        context.user.posts.push(_post);
        await context.user.save();

        return _post;
    } catch(ex) {
        throw ex;
    }
};

const updatePost = async (parent, data, context) => {
    if(!canUpdate(context.user)) throw new Error(INVALID_PERMISSION);
    try {
        let { picture } = data;
        if(picture) {
            picture = await Picture.findOne({ _id: picture });
            if(picture) {
                data.picture = picture;
            }
        }
        let _post = await Post.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _post;
    } catch(ex) {

    }
};

const deletePost = async (parent, data, context) => {
    if(!canDelete(context.user)) throw new Error(INVALID_PERMISSION);
    try {
        let _post = await Post.findOneAndRemove(data);
        return _post;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    PostQuery: { posts, getPosts, post },
    PostMutation: { createPost, updatePost, deletePost }
}