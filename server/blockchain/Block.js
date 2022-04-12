const sha256 = require('crypto-js/sha256');

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
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mine(difficulty) {
        while (this.calculateHash().slice(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
        }
        this.hash = this.calculateHash();
        console.log('index', this.index);
        console.log('nonce', this.nonce);
        console.log('hash', this.hash);
    }
}

module.exports = Block;