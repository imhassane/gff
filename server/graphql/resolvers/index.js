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
const { PageQuery, PageMutation } = require('./page');
const { SearchQuery } = require('./search');
const { NotificationQuery, NotificationMutation } = require('./notification');

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
                            SearchQuery,
                            PageQuery,
                            NotificationQuery,
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
                            ReaderMutation,
                            PageMutation,
                            NotificationMutation,
                        ),
};

module.exports = { resolvers };