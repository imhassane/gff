const { Picture, validatePicture } = require('../../models/picture');

const pictures = async (parent, data, context) => {
    try {
        let _pictures = await Picture.find(data);
        return _pictures;
    } catch(ex) {
        throw ex;
    }
};

const picture = async (parent, data, context) => {
    try {
        const _picture = await Picture.findOne(data);
        // Test de l'existance du Picture.

        return _picture;
    } catch(ex) {
        throw ex;
    }
};

const createPicture = async (parent, data, context) => {
    try {
        const { errors } = validatePicture(data);
        if(errors) throw new Error(errors.details[0].message);

        let _picture = new Picture(data);

        _picture = await _picture.save();
        return _picture;
    } catch(ex) {
        throw ex;
    }
};

const updatePicture = async (parent, data, context) => {
    try {
        let _picture = await Picture.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _picture;
    } catch(ex) {

    }
};

const deletePicture = async (parent, data, context) => {
    try {
        let _picture = await Picture.findOneAndRemove(data);
        return _picture;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    PictureQuery: { pictures, picture },
    PictureMutation: { createPicture, updatePicture, deletePicture }
}