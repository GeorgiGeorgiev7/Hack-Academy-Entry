const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [this._createGenesis()];
        this.difficulty = 5;
    }

    _createGenesis() {
        return new Block(0, new Date().toUTCString(), '', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (previousBlock.hash !== currentBlock.previousHash) return false;
            return true;
        }
    }
}

// const coin = new Blockchain();

// coin.addBlock(new Block(1, new Date().toUTCString(), ''));
// coin.addBlock(new Block(2, new Date().toUTCString(), ''));
// coin.addBlock(new Block(3, new Date().toUTCString(), ''));
// coin.addBlock(new Block(4, new Date().toUTCString(), ''));

// console.log(coin.isChainValid());

module.exports = Blockchain;