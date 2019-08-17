const { TagQuery, TagMutation } = require('./tag');
const { CategoryQuery, CategoryMutation } = require('./category');
const { UserQuery, UserMutation } = require('./user');
const { PostQuery, PostMutation } = require('./post');
const { DocumentaryQuery, DocumentaryMutation } = require('./documentary');
const { PictureQuery, PictureMutation } = require('./picture');
const { CommentQuery, CommentMutation } = require('./comment');

const resolvers = {
    Query: Object.assign({},
                            TagQuery,
                            CategoryQuery,
                            UserQuery,
                            PostQuery,
                            DocumentaryQuery,
                            PictureQuery,
                            CommentQuery
                        ),
    Mutation: Object.assign({}, 
                            TagMutation,
                            CategoryMutation,
                            UserMutation,
                            PostMutation,
                            DocumentaryMutation,
                            PictureMutation,
                            CommentMutation
                        ),
};

module.exports = { resolvers };