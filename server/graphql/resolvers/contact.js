const { Contact, validateContact } = require('../../models/contact');
const {  RESSOURCE_DOESNT_EXIST, RESSOURCE_EXISTS } = require('../errors');

const contacts = async () => {
    try {
        const _c = await Contact.find();
        return _c;
    } catch(ex) {
        throw ex;
    }
};

const getContact = async (data) => {
    try {
        let _c = await Contact.findOne(data);
        return _c;
    } catch(ex) {
        throw ex;
    }
};

const contact = async (parent, data, context) => {
    try {
        const _c = await getContact(data);
        if(!_c) throw new Error(RESSOURCE_DOESNT_EXIST);
        return _c;
    } catch(ex) {
        throw ex;
    }
};

const createContact = async (parent, data, context) => {
    try {
        const { errors } = validateContact(data);
        if(errors) throw new Error(errors.details[0].message);

        let _c = await getContact(data);
        if(_c) throw new Error(RESSOURCE_EXISTS);

        _c = new Contact(data);
        _c = await _c.save();
        return _c;
    } catch(ex) {
        throw ex;
    }
};

const updateContact = async (parent, data, context) => {
    try {
        let _c = await getContact(data);
        if(!_c) throw new Error(RESSOURCE_DOESNT_EXIST);

        _c = _c.update(data);
        return _c;
    } catch(ex) {
        throw ex;
    }
};

const deleteContact = async (parent, data, context) => {
    try {
        let _c = await Contact.findOneAndRemove(data);
        return _c;
    } catch(ex) {
        throw ex;
    };
};

module.exports = {
    ContactQuery: { contacts, contact },
    ContactMutation: { createContact, updateContact, deleteContact }
};
