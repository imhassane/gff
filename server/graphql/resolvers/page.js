const { Page, validatePage } = require('../../models/page');
const { RESSOURCE_DOESNT_EXIST } = require('../errors');

const pages = async (parent, data, context) => {
    try {
        const _pages = await Page.find({ deleted: false })
                                .sort({'createdAt': -1})
                                .populate({
                                    path: 'posts',
                                    populate: { path: 'author' }
                                });
        return _pages;
    } catch(ex) { throw ex; }
};

const getPage = async (data) => {
    try {
        const _page = await Page.findOne(data)
                                .populate({
                                    path: 'posts',
                                    populate: { path: 'author'}
                                });
        return _page;
    } catch(ex) { throw ex; }
};

const page = async (parent, data, context) => {
    try {
        const _page = await getPage(data);
        
        if(!_page || _page.deleted) throw new Error();
        return _page;
    } catch(ex) { throw ex; }
}

const createPage = async (parent, data, context) => {
    try {
        const { errors } = validatePage(data);
        if(errors) throw new Error(errors.details[0].message);

        let _page = await getPage({ title: data.title });
        if(_page) throw new Error();

        _page = new Page(data);
        _page = await _page.save();
        return _page;
    } catch(ex){ throw ex; }
};

const updatePage = async (parent, data, context) => {
    try {
        let _page = await getPage({ _id: data._id });
        if(!_page) throw new Error(RESSOURCE_DOESNT_EXIST);

        _page = await Page.findOneAndUpdate({ _id: data._id}, {$set: data}, { new: true});
        return _page;
    } catch(ex) { throw ex; }
};

const deletePage = async (parent, data, context) => {
    try {
        const _page = await Page.findOneAndRemove(data);
        return _page;
    } catch(ex) { throw ex; }
};

module.exports = {
    PageQuery: { pages, page },
    PageMutation: { createPage, updatePage, deletePage }
};
