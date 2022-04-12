const ec = new require('elliptic').ec('secp256k1');
const sha256 = require('crypto-js/sha256');

module.exports = {
    ec,
    sha256
};