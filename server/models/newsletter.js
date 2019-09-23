const mongoose = require('mongoose');
const Joi = require('joi');

const NewsLetterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    published: { type: Boolean, default: false }
}, { timestamps: true });

const NewsLetter = mongoose.model('NewsLetter', NewsLetterSchema);

const validateNewsLetter = (data) => Joi.validate(data, {
    title: Joi.string().required(),
    content: Joi.string().required(),
});

module.exports = { NewsLetter, validateNewsLetter };
