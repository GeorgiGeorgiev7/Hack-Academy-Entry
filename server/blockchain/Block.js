const { sha256 } = require('../utils');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mine(difficulty) {
        while (this.calculateHash().slice(0, difficulty) !== Array(difficulty + 1).join('0'))
            this.nonce++;
        this.hash = this.calculateHash();
    }

    isDataValid() {
        for (const tx of this.data)
            if (!tx.isValid())
                return false;
        return true;
    }
}

module.exports = Block;
