const { ec } = require('../utils');

module.exports = (count) => {
    const accounts = [];
    for (let i = 0; i < count; i++)
        accounts.push(ec.genKeyPair());
    return accounts;
};