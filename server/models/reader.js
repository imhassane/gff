const mongoose = require('mongoose');
const Joi = require('joi');

const ReaderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    unsuscribed: { type: Boolean, default: false },
}, { timestamps: true });

const Reader = mongoose.model('Reader', ReaderSchema);

const validateReader = (data) => Joi.validate(data, {
    email: Joi.string().email().required()
});

module.exports = { Reader, validateReader };
