const { User } = require('../../models/user');
const { Tag } = require('../../models/tag');
const { Category } = require('../../models/category');
const { Post } = require('../../models/post');

const search = async (parent, data, context) => {
    try {
        let _reg = new RegExp(data.text, 'i');

        const tags = await Tag.find({ name: { $regex: _reg } });
        const authors = await User.find({ email: { $regex: _reg } });
        const categories = await Category.find({ name: { $regex: _reg }});
        const posts = await Post.find({ title: { $regex: _reg }})
                                .populate('picture');

        return { tags, authors, categories, posts };
    } catch(ex) { throw ex; }
};

module.exports = {
    SearchQuery: { search },
}