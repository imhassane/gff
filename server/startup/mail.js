const mailjet = require('node-mailjet');
const connect = mailjet.connect('3f90e8137a705680e304f1c56cc99fad', '5114236c4f8b481f5fb6bf2b4ed15f96');

module.exports.post = connect.post('send', { version: 'v3.1'});
