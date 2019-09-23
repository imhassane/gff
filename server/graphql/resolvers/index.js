const { TagQuery, TagMutation } = require('./tag');
const { CategoryQuery, CategoryMutation } = require('./category');
const { UserQuery, UserMutation } = require('./user');
const { PostQuery, PostMutation } = require('./post');
const { DocumentaryQuery, DocumentaryMutation } = require('./documentary');
const { PictureQuery, PictureMutation } = require('./picture');
const { CommentQuery, CommentMutation } = require('./comment');
const { ReaderQuery, ReaderMutation } = require('./reader');
const { NewsLetterQuery, NewsLetterMutation } = require('./newsletter');
const { ContactQuery, ContactMutation } = require('./contact');
const { SearchQuery } = require('./search');

const resolvers = {
    Query: Object.assign({},
                            TagQuery,
                            CategoryQuery,
                            UserQuery,
                            PostQuery,
                            DocumentaryQuery,
                            PictureQuery,
                            CommentQuery,
                            NewsLetterQuery,
                            ContactQuery,
                            ReaderQuery,
                            SearchQuery
                        ),
    Mutation: Object.assign({},
                            TagMutation,
                            CategoryMutation,
                            UserMutation,
                            PostMutation,
                            DocumentaryMutation,
                            PictureMutation,
                            CommentMutation,
                            NewsLetterMutation,
                            ContactMutation,
                            ReaderMutation
                        ),
};

module.exports = { resolvers };