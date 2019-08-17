const mongoose = require('mongoose');
const Joi = require('joi');

const CommentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ],
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    visible: { type: Boolean, default: false },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

const validateComment = (data) => Joi.validate(data, {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    content: Joi.string().required(),
    visible: Joi.bool(),
    post: Joi.string(),
    comment: Joi.string(),
});

module.exports = { Comment, validateComment };
