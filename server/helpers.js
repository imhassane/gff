const { post } = require('./startup/mail');

const PERMISSIONS = {
    SUPER_USER: 1,
    MANAGER: 2,
    AUTHOR: 3,
    MEMBER: 4
}

module.exports.sendMail = async ({ To, Subject, HTMLPart}) => {
    try {
        const data = await post.request({
            "Messages": [
                {
                    "From": {
                        "Email": "thsow.business@gmail.com",
                        "Name": "Girl For Future"
                        },
                    To,
                    Subject,
                    HTMLPart
                }
            ]
        });
        return data;
    } catch(ex) { throw ex; }
}

const getPermissions = user => {
    if(!user) return 5;
    let max_permission = 4;
    user.permissions.forEach(p => {
        if(PERMISSIONS[p] < max_permission) max_permission = PERMISSIONS[p];
    });
    return max_permission;
};
module.exports.canWrite = (user) => getPermissions(user) < 4;
module.exports.canUpdate = (user) => getPermissions(user) < 4;
module.exports.canDelete = (user) => getPermissions(user) < 3;
module.exports.canAcceptUser = (user) => getPermissions(user) === 1;
module.exports.canDeleteUser = (user) => getPermissions(user) === 1;
module.exports.canChangeUserPermissions = (user) => getPermissions(user) === 1;
