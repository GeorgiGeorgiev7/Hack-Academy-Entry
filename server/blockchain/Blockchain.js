const Block = require('./Block');
const Transaction = require('../transaction/Transaction');

class Blockchain {
    constructor() {
        this.difficulty = 3;
        this.chain = [this._createGenesis()];
        this.transactionPool = [];
        this.reward = 7;
    }

    _createGenesis() {
        const genesisBlock = new Block(0, new Date().toUTCString(), '', Array(64 + 1).join('0'));
        genesisBlock.mine(this.difficulty);
        return genesisBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    mineNewBlock(coinbase) {
        const block = new Block(this.chain.length, new Date().toUTCString(), this.transactionPool, this.getLatestBlock().hash);
        block.mine(this.difficulty);
        this.chain.push(block);
        this.transactionPool = [new Transaction(null, coinbase, this.reward)];
    }

    addTransaction(transaction) {
        if (this.balanceOf(transaction.from) < transaction.amount && transaction.from !== null)
            throw new Error('Insufficient funds!');
        else if (transaction.from === transaction.to)
            throw new Error('Cannot transfer fund between same addresses!');
        this.transactionPool.push(transaction);
    }

    balanceOf(address) {
        let balance = 0;
        for (const block of this.chain)
            for (const transaction of block.data) {
                if (transaction.from === address)
                    balance -= transaction.amount;
                else if (transaction.to === address)
                    balance += transaction.amount;
            }
        return balance;
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

module.exports = Blockchain;
