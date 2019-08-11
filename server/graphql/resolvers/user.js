const { User, validateUser } = require('../../models/user');
const { USERNAME_EXIST, EMAIL_EXIST, USER_DOESNT_EXIST } = require('../errors');

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
        const _user = await User.findOne(data);
        if(!_user) throw new Error(USER_DOESNT_EXIST)

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

module.exports = {
    UserQuery: { users, user },
    UserMutation: { createUser, updateUser, deleteUser }
}