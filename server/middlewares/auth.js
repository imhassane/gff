const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


const getUserFromToken = async (token) => {
    try {
        if(token) {
            let decoded = jwt.verify(token, 'secret');
            const user = await User.findOne({ _id: decoded._id });
            if(user) return user;
        }
        return null;
    } catch(ex) {
        throw ex;
    }
};

module.exports = { getUserFromToken };
