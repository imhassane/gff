const { connect } = require('mongoose');
const logger = require('./logger');

module.exports = async () => {
    try {
        await connect(`mongodb://localhost:27017/gff`, { useNewUrlParser: true, useCreateIndex: true });
        logger.info(`Connexion à la base mongodb://localhost:27017/gff réussie`);
    } catch({ message }) {
        logger.error(message);
    }
}