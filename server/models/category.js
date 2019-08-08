const mongoose = require('mongoose');
const Joi = require('joi');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
    ]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

const validateCategory = (data) => Joi.validate(data, {
    name: Joi.string().required(),
    description: Joi.string().optional(),
    posts: Joi.object().optional(),
});

module.exports = { Category, validateCategory };
