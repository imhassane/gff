const { User, validateUser } = require('../../models/user');
const { USERNAME_EXIST, EMAIL_EXIST, USER_DOESNT_EXIST, INVALID_PERMISSION } = require('../errors');

const users = async () => {
    try {
        let _users = await User.find().populate('posts');
        return _users;
    } catch(ex) {
        throw ex;
    }
};

const user = async (parent, data, context) => {
    try {
        let _user = await User.findOne(data).populate('posts');
        if(!_user) throw new Error(USER_DOESNT_EXIST)
        // Mise à jour du profil.
        _user.views += 1;
        _user = await _user.save();
        return _user;
    } catch(ex) {
        throw ex;
    }
};

const createUser = async (parent, data, context) => {
    try {
        const { errors } = validateUser(data);
        if(errors) throw new Error(errors.details[0].message);



        let _user = await User.findOne({ username: data.username });
        if(_user) throw new Error(USERNAME_EXIST);

        _user = await User.findOne({ email: data.email });
        if(_user) throw new Error(EMAIL_EXIST);

        _user = new User(data);
        _user = await _user.save();
        return _user;
    } catch(ex) {
        throw ex;
    }
};

const updateUser = async (parent, data, context) => {
    try {
        let _user = await User.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _user;
    } catch(ex) {

    }
};

const deleteUser = async (parent, data, context) => {
    try {
        let _user = await User.findOneAndRemove(data);
        return _user;
    } catch(ex) {
        throw ex;
    }
}

const me = async (parent, data, context) => {
    if(!context.user) throw new Error(INVALID_PERMISSION)
    return context.user;
}

const updatePassword = async (parent, data, context) => {
    if(!context.user) throw new Error(INVALID_PERMISSION);
    try {
        if(!context.user.comparePasswords(data.oldPassword)) throw new Error("Le mot de passe est incorrect");
        
        context.user.password = data.password;
        await context.user.save();
        return context.user;
    } catch(ex) { throw ex; }
}

module.exports = {
    UserQuery: { users, user, me },
    UserMutation: { createUser, updateUser, deleteUser, updatePassword }
}