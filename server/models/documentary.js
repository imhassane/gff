const mongoose = require('mongoose');
const Joi = require('joi');

const DocumentarySchema = new mongoose.Schema({
    TYPE: { type: String, enum: ["INVESTIGATION", "TESTIMONY", "REPORTAGE"], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    url: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" },
}, { timestamps: true });

const Documentary = mongoose.model('Documentary', DocumentarySchema);

const validateDocumentary = (data) => Joi.validate(data, {
    type: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    url: Joi.string().required(),
    picture: Joi.string()
});

module.exports = { Documentary, validateDocumentary };
