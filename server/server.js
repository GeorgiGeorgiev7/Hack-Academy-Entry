const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () =>
    console.log(`>>> Blockchain running on port ${port}`));

const Blockchain = require('./blockchain/Blockchain');
const Transaction = require('./transaction/Transaction');

const blockchain = new Blockchain();

blockchain.mineNewBlock('address1');
blockchain.mineNewBlock('address1');

blockchain.addTransaction(new Transaction('address1', 'address2', 7));
blockchain.mineNewBlock('the_miner');

blockchain.addTransaction(new Transaction('address2', 'address1', 5));
blockchain.mineNewBlock('the_miner');

console.log(blockchain.chain);