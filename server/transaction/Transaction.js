const { sha256 } = require('../utils');
const { ec } = require('../utils');

class Transaction {
    constructor(from, to, amount = 0) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    };

    calculateHash() {
        return sha256(this.from + this.to + this.amount).toString();
    }

    signTransaction(key) {
        if (key.getPublic('hex') !== this.from)
            throw new Error('Invalid public key!');

        const txHash = this.calculateHash();
        const sig = key.sign(txHash, 'base64');
        
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.from === null) return true;

        if (!this.signature) return false;

        const publicKey = ec.keyFromPublic(this.from, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }

}

module.exports = Transaction;
