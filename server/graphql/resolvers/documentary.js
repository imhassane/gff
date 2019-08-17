const { Documentary, validateDocumentary } = require('../../models/documentary');
const { User } = require('../../models/user');
const { Picture } = require('../../models/picture');

const { DOCUMENTARY_EXIST, USER_DOESNT_EXIST, RESSOURCE_DOESNT_EXIST } = require('../errors');

const documentary = async (parent, data, context) => {
    try {
        const _documentary = await Documentary.findOne(data).populate('author').populate('picture');
        return _documentary;
    } catch(ex) {
        throw ex;
    }
};

const documentaries = async (parent, data, context) => {
    try {
        const _documentaries = await Documentary.find(data).populate('author').populate('picture');
        return _documentaries;
    } catch(ex) {
        throw ex;
    }
};

const createDocumentary = async (parent, data, context) => {
    try {
        const { errors } = validateDocumentary(data);
        if(errors) throw new Error(errors.details[0].message);

        let _documentary = await Documentary.findOne({ url: data.url });
        if(_documentary) throw new Error(DOCUMENTARY_EXIST);

        let _user = await User.findOne({ _id: data.author });
        if(!_user) throw new Error(USER_DOESNT_EXIST);

        let _picture = await Picture.findOne({ _id: data.picture });
        if(!_picture) throw new Error(RESSOURCE_DOESNT_EXIST);

        _documentary = new Documentary(data);
        _documentary.user = _user;
        _documentary.picture = _picture;

        _documentary = await _documentary.save();

        _picture.documentary = _documentary;
        await _picture.save();

        return _documentary;
    } catch(ex) {
        throw ex;
    }
}

const updateDocumentary = async (parent, data, context) => {
    try {
        const _documentary = await Documentary.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });
        return _documentary;
    } catch(ex) {
        throw ex;
    }
}

const deleteDocumentary = async (parent, data, context) => {
    try {
        const _documentary = await Documentary.findOneAndRemove(data);
        return _documentary;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    DocumentaryQuery: { documentaries, documentary },
    DocumentaryMutation: { createDocumentary, updateDocumentary, deleteDocumentary }
}
