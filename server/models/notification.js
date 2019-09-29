const mongoose = require('mongoose');
const Joi = require('joi');

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["CONTACT", "COMMENT"], required: true },
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    seen: { type: Boolean, default: false }
}, { timestamps: true });

NotificationSchema.pre('save', function() {
    console.log("hello")
})

const Notification = mongoose.model('Notification', NotificationSchema);

const validateNotification = (data) => Joi.validate(data, {
    title: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().required(),
    contact: Joi.string(),
    post: Joi.string()
});

module.exports = { Notification, validateNotification };
