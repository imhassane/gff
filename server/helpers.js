const { post } = require('./startup/mail');

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