const { NewsLetter, validateNewsLetter } = require('../../models/newsletter');
const {  RESSOURCE_DOESNT_EXIST, RESSOURCE_EXISTS } = require('../errors');

const newsletters = async () => {
    try {
        const _n = await NewsLetter.find();
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const getNewsLetter = async (data) => {
    try {
        let _n = await NewsLetter.findOne(data);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const newsletter = async (parent, data, context) => {
    try {
        const _n = await getNewsLetter(data);
        if(!_n) throw new Error(RESSOURCE_DOESNT_EXIST);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const createNewsLetter = async (parent, data, context) => {
    try {
        const { errors } = validateNewsLetter(data);
        if(errors) throw new Error(errors.details[0].message);

        let _n = await getNewsLetter(data);
        if(_n) throw new Error(RESSOURCE_EXISTS);

        _n = new NewsLetter(data);
        _n = await _n.save();
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const updateNewsLetter = async (parent, data, context) => {
    try {
        let _n = await getNewsLetter(data);
        if(!_n) throw new Error(RESSOURCE_DOESNT_EXIST);

        _n = _n.update(data);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const deleteNewsLetter = async (parent, data, context) => {
    try {
        let _n = await NewsLetter.findOneAndRemove(data);
        return _n;
    } catch(ex) {
        throw ex;
    };
};

module.exports = {
    NewsLetterQuery: { newsletters, newsletter },
    NewsLetterMutation: { createNewsLetter, updateNewsLetter, deleteNewsLetter }
};
