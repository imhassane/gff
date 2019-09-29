const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { USER_DOESNT_EXIST, INCORRECT_PASSWORD } = require('../errors');

const authenticate = async (parent, data, context) => {
    try {
        const user = await User.findOne({ email: data.email });
        if(!user) throw new Error(USER_DOESNT_EXIST);

        if(!user.comparePasswords(data.password)) throw new Error(INCORRECT_PASSWORD);

        let token = jwt.sign({ _id: user._id }, 'secret');

        return { token };

    } catch(ex) {
        throw ex;
    }
};

module.exports = {
    AuthMutation: { authenticate }
}