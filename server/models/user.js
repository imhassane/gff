const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" },
    permissions: { type: [String], enum: ["SUPER_USER", "MANAGER", "AUTHOR", "MEMBER"], default: ["MEMBER"]},
    is_active: { type: Boolean, default: false },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }
    ],
    views: { type: Number, default: 0 },
    post_view_counter: { type: Number, default: 0 },
    comment_counter: { type: Number, default: 0 },
    
}, { timestamps: true });

UserSchema.pre('save', function() {
    if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, 10);
    this.username = this.username.toLowerCase();
});

UserSchema.methods.comparePasswords = function(other) {
    return bcrypt.compareSync(other, this.password,);
}

const User = mongoose.model('User', UserSchema);

const validateUser = (data) => Joi.validate(data, {
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    picture: Joi.string(),
    is_active: Joi.boolean(),
});

module.exports = { User, validateUser };
