const { Category, validateCategory } = require('../../models/category');
const { Post } = require('../../models/post');

const categories = async () => {
    try {
        let _categories = await Category.find();
        return _categories;
    } catch(ex) {
        throw ex;
    }
};

const category = async (parent, data, context) => {
    try {
        const _category = await Category.findOne(data).populate({
            path: 'posts',
            populate: { path: 'author' }
        });

        return _category;
    } catch(ex) {
        throw ex;
    }
};

const createCategory = async (parent, data, context) => {
    try {
        const { errors } = validateCategory(data);
        if(errors) throw new Error(errors.details[0].message);

        let _category = new Category(data);

        _category = await _category.save();
        return _category;
    } catch(ex) {
        throw ex;
    }
};

const updateCategory = async (parent, data, context) => {
    try {
        let _category = await Category.findOneAndUpdate({ _id: data._id }, {
            $set: data
        }, { new: true });

        return _category;
    } catch(ex) {

    }
};

const deleteCategory = async (parent, data, context) => {
    try {
        let _category = await Category.findOneAndRemove(data);
        return _category;
    } catch(ex) {
        throw ex;
    }
}

module.exports = {
    CategoryQuery: { categories, category },
    CategoryMutation: { createCategory, updateCategory, deleteCategory }
}