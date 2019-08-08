const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function() {
    this.username = this.username.toLowerCase();
    this.password = bcrypt.hashSync(this.password, 10);
});

UserSchema.methods.comparePasswords = function(other) {
    return bcrypt.compareSync(other, this.password);
}

const validateUser = (data) => Joi.validate(data, {
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    picture: Joi.string()
});

module.exports = { User, validateUser };
