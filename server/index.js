const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const { resolvers } = require('./graphql/resolvers');

const typeDefs = importSchema("./graphql/queries/schema.graphql");

// Lancement de la base de données.
require('./startup/db')();
// Chargement du logger.
const logger = require('./startup/logger');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    logger.info("Serveur lancé à l'url: " + url);
})