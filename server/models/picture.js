const mongoose = require('mongoose');
const Joi = require('joi');

const PictureSchema = new mongoose.Schema({
    type: { type: String, enum: [ "POST", "USER", "DOCUMENTARY" ] },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    path: { type: String, required: true }
}, { timestamps: true });

const Picture = mongoose.model('Picture', PictureSchema);

const validatePicture = (data) => Joi.validate(data, {
    type: Joi.string(),
    user: Joi.optional(),
    post: Joi.optional(),
    path: Joi.string().required(),
});

module.exports = { Picture, validatePicture };
