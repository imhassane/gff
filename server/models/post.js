const mongoose = require('mongoose');
const Joi = require('joi');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: true },
    draft: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref:"Tag", required: true }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref:"Category", required: true }],
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

const validatePost = (data) => Joi.validate(data, {
    title: Joi.string().required(),
    content: Joi.string().required(),
    active: Joi.boolean(),
    draft: Joi.boolean(),
    author: Joi.required(),
    tags: Joi.required(),
    categories: Joi.required()
});

module.exports = { Post, validatePost };
