const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const { resolvers } = require('./graphql/resolvers');

const typeDefs = importSchema("./graphql/queries/schema.graphql");
const GraphQLDateTime = require('graphql-type-datetime');

const { getUserFromToken } = require('./middlewares/auth');

// Lancement de la base de données.
require('./startup/db')();
// Chargement du logger.
const logger = require('./startup/logger');

// Contexte de l'application.
const context = async ({ req }) => {
    try {
        const token = req.headers.authtoken;
        const user = await getUserFromToken(token);
        return { user };
    } catch(ex) {
        throw ex;
    }
};

const server = new ApolloServer({ typeDefs, resolvers: { ...resolvers, DateTime: GraphQLDateTime }, context });

server.listen().then(({ url }) => {
    logger.info("Serveur lancé à l'url: " + url);
})