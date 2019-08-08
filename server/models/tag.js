const mongoose = require('mongoose');
const Joi = require('joi');

const TagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
    ]
}, { timestamps: true });

const Tag = mongoose.model('Tag', TagSchema);

const validateTag = (data) => Joi.validate(data, {});

module.exports = { Tag, validateTag };
