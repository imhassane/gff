const { TagQuery, TagMutation } = require('./tag');
const { CategoryQuery, CategoryMutation } = require('./category');
const { UserQuery, UserMutation } = require('./user');
const { PostQuery, PostMutation } = require('./post');

const resolvers = {
    Query: Object.assign({},
                            TagQuery,
                            CategoryQuery,
                            UserQuery,
                            PostQuery
                        ),
    Mutation: Object.assign({}, 
                            TagMutation,
                            CategoryMutation,
                            UserMutation,
                            PostMutation
                        ),
};

module.exports = { resolvers };