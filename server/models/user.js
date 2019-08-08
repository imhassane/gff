const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" },
    is_staff: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', function() {
    this.username = this.username.toLowerCase();
    this.password = bcrypt.hashSync(this.password, 10);
});

UserSchema.methods.comparePasswords = function(other) {
    return bcrypt.compareSync(other, this.password);
}

const User = mongoose.model('User', UserSchema);

const validateUser = (data) => Joi.validate(data, {
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    picture: Joi.string(),
    is_staff: Joi.boolean(),
    is_active: Joi.boolean(),
});

module.exports = { User, validateUser };
