const mongoose = require('mongoose');
const Joi = require('joi');

const ContactSchema = new mongoose.Schema({
    username: String,
    website: String,
    email: { type: String, required: true },
    object: { type: String, required: true },
    message: { type: String, required: true },
    validated: { type: Boolean, default: false }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

const validateContact = (data) => Joi.validate(data, {
    username: Joi.string(),
    website: Joi.string(),
    email: Joi.string().email().required(),
    object: Joi.string().required(),
    message: Joi.string().required().min(5),
});

module.exports = { Contact, validateContact };
