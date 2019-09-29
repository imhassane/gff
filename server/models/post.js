const mongoose = require('mongoose');
const Joi = require('joi');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: true },
    draft: { type: Boolean, default: false },
    extract: { type: String, required: true },
    slug: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref:"Tag", required: true }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref:"Category", required: true }],
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" } ],
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" },
}, { timestamps: true });

PostSchema.pre('save', function() {
    this.slug = slugify(this.title, { remove: /[*+~.()'"!:@]/g, lower: true });
});

const Post = mongoose.model('Post', PostSchema);

const validatePost = (data) => Joi.validate(data, {
    title: Joi.string().required(),
    content: Joi.string().required(),
    active: Joi.boolean(),
    extract: Joi.string().required(),
    draft: Joi.boolean(),
    tags: Joi.required(),
    categories: Joi.required(),
    picture: Joi.string(),
});

module.exports = { Post, validatePost };
