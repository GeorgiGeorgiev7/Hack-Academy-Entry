const Block = require('./Block');
const Transaction = require('../transaction/Transaction');

class Blockchain {
    constructor() {
        this.difficulty = 4;
        this.chain = [this._createGenesis()];
        this.transactionPool = [];
        this.reward = 17;
    }

    _createGenesis() {
        const genesisBlock = new Block(0, new Date().toUTCString(), '', Array(64 + 1).join('0'));
        genesisBlock.proof(this.difficulty);
        return genesisBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    mineNewBlock(coinbase) {
        const block = new Block(this.chain.length, new Date().toUTCString(), this.transactionPool, this.getLatestBlock().hash);
        block.proof(this.difficulty);
        this.chain.push(block);
        this.transactionPool = [new Transaction(null, coinbase, this.reward)];
        console.log(this.getLatestBlock());
    }

    addTransaction(transaction) {
        this.validateTxn(transaction);
        this.transactionPool.push(transaction);
    }

    validateTxn(transaction) {
        if (transaction.isValid === false)
            throw new Error('Invalid transaction!');
        else if (transaction.from === transaction.to)
            throw new Error('Cannot transfer funds between same accounts!');
        else if (this.checkCurrentBalance(transaction.from) < transaction.amount && transaction.from !== null)
            throw new Error('Insufficient funds!');
    }

    checkCurrentBalance(address) {  // checks for double spending
        const balance = this.balanceOf(address);
        for (const txn of this.transactionPool)
            if (txn.from === address)
                balance -= txn.amount;
        return balance;
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
            if (currentBlock.isDataValid === false) return false;
            return true;
        }
    }
}

module.exports = Blockchain;
