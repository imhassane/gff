const { NewsLetter, validateNewsLetter } = require('../../models/newsletter');
const { Reader } = require('../../models/reader');
const {  RESSOURCE_DOESNT_EXIST, RESSOURCE_EXISTS, NO_READERS } = require('../errors');
const { sendMail } = require('../../helpers');


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

const publishNewsLetter = async (parent, data, context) => {
    try {
        let _readers = await Reader.find({ deleted: false });
        if(!_readers.length) throw new Error(NO_READERS);

        let _newsletter = await getNewsLetter(data);

        if(_newsletter.published) return _newsletter;

        let To = _readers.map(r => {
            let obj = {};
            obj.Email = r.email;
            return obj;
        });
        
        const Subject = _newsletter.title;
        const HTMLPart = _newsletter.content;

        try {
            const data = await sendMail({To, Subject, HTMLPart});
            if(data) {
                _newsletter.published = true;
                _newsletter = await _newsletter.save();
            }
        } catch(ex) { throw ex; }

        return _newsletter;
    } catch(ex) { throw ex; }
};

module.exports = {
    NewsLetterQuery: { newsletters, newsletter },
    NewsLetterMutation: { createNewsLetter, updateNewsLetter, deleteNewsLetter, publishNewsLetter }
};
