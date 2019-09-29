const { Notification, validateNotification } = require('../../models/notification');
const {  RESSOURCE_DOESNT_EXIST, RESSOURCE_EXISTS } = require('../errors');

const notifications = async () => {
    try {
        const _n = await Notification.find().sort({ createdAt: -1 });
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const getNotification = async (data) => {
    try {
        let _n = await Notification.findOne(data);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const notification = async (parent, data, context) => {
    try {
        console.log("Hello")
        const _n = await getNotification(data);
        if(!_n) throw new Error(RESSOURCE_DOESNT_EXIST);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const __createNotification = async (data) => {
    try {
        console.log("Create")
        const { errors } = validateNotification(data);
        if(errors) throw new Error(errors.details[0].message);

        let _n = await getNotification(data);
        if(_n) throw new Error(RESSOURCE_EXISTS);

        _n = new Notification(data);
        _n = await _n.save();
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const createNotification = async (parent, data, context) => {
    try {
        const _n = await __createNotification(data);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const updateNotification = async (parent, data, context) => {
    try {
        let _n = await getNotification({ _id: data._id });
        if(!_n) throw new Error(RESSOURCE_DOESNT_EXIST);

        _n = _n.update(data);
        return _n;
    } catch(ex) {
        throw ex;
    }
};

const deleteNotification = async (parent, data, context) => {
    try {
        let _n = await Notification.findOneAndRemove(data);
        return _n;
    } catch(ex) {
        throw ex;
    };
};

module.exports = {
    getNotification,
    NotificationQuery: { notifications, notification },
    NotificationMutation: { createNotification, updateNotification, deleteNotification }
};
