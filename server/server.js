const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () =>
    console.log(`>>> Blockchain running on port ${port}`));

// const Blockchain = require('./blockchain/Blockchain');
// const Transaction = require('./transaction/Transaction');
const genAccounts = require('./transaction/accountsGenerator');

const accounts = genAccounts(10);
let counter = 0;
for (const account of accounts) {
    counter++;
    console.log(Array(50).join('-'));
    console.log('Акаунт:', counter, '\n');
    console.log('ПИН код:', account.getPrivate('hex'));
    console.log('IBAN:', account.getPublic('hex'));
    console.log(Array(50).join('-'));
}

// console.log(blockchain.chain);