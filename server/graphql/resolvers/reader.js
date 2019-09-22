const { Reader, validateReader } = require('../../models/reader');
const {  RESSOURCE_DOESNT_EXIST, RESSOURCE_EXISTS } = require('../errors');

const readers = async () => {
    try {
        const _r = await Reader.find();
        return _r;
    } catch(ex) {
        throw ex;
    }
};

const getReader = async (data) => {
    try {
        let _r = await Reader.findOne(data);
        return _r;
    } catch(ex) {
        throw ex;
    }
};

const reader = async (parent, data, context) => {
    try {
        const _r = await getReader(data);
        if(!_r) throw new Error(RESSOURCE_DOESNT_EXIST);
        return _r;
    } catch(ex) {
        throw ex;
    }
};

const createReader = async (parent, data, context) => {
    try {
        const { errors } = validateReader(data);
        if(errors) throw new Error(errors.details[0].message);

        let _r = await getReader(data);
        if(_r) throw new Error(RESSOURCE_EXISTS);

        _r = new Reader(data);
        _r = await _r.save();
        return _r;
    } catch(ex) {
        throw ex;
    }
};

const updateReader = async (parent, data, context) => {
    try {
        let _r = await getReader(data);
        if(!_r) throw new Error(RESSOURCE_DOESNT_EXIST);

        _r = _r.update(data);
        return _r;
    } catch(ex) {
        throw ex;
    }
};

const deleteReader = async (parent, data, context) => {
    try {
        let _r = await Reader.findOneAndRemove(data);
        return _r;
    } catch(ex) {
        throw ex;
    };
};

module.exports = {
    ReaderQuery: { readers, reader },
    ReaderMutation: { createReader, updateReader, deleteReader }
};
