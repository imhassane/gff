const mongoose = require('mongoose');
const Joi = require('joi');
const slugify = require('slugify');

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String, required: true },
    type: { type: String, required: true },
    content: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

PageSchema.pre('save', function() {
    this.slug = slugify(this.title, { remove: /[*+~.()'"!:@]/g, lower: true });
});

const Page = mongoose.model('Page', PageSchema);

const validatePage = (data) => Joi.validate(data, {
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string()
});

module.exports = { Page, validatePage };
