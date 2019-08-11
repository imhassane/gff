const { Tag, validateTag } = require('../../models/tag');

const tags = async () => {
    try {
        let _tags = await Tag.find();
        return _tags;
    } catch(ex) {
        throw ex;
    }
};

const tag = async (parent, data, context) => {
    try {
        const _tag = await Tag.findOne(data);
        // Test de l'existance du tag.

        return _tag;
    } catch(ex) {
        throw ex;
    }
};

const createTag = async (parent, data, context) => {
    try {
        const { errors } = validateTag(data);
        if(errors) throw new Error(errors.details[0].message);

        let _tag = await Tag.findOne(data);
        if(_tag) return _tag;

        _tag = new Tag(data);
        _tag = await _tag.save();
        return _tag;
    } catch(ex) {
        throw ex;
    }
};

const updateTag = async (parent, data, context) => {
    try {
        let _tag = await Tag.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _tag;
    } catch(ex) {

    }
};

const deleteTag = async (parent, data, context) => {
    try {
        let _tag = await Tag.findOneAndRemove(data);
        return _tag;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    TagQuery: { tags, tag },
    TagMutation: { createTag, updateTag, deleteTag }
}