const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () =>
    console.log(`>>> Blockchain running on port ${port}`));

const Blockchain = require('./blockchain/Blockchain');
const Transaction = require('./transaction/Transaction');
const genAccounts = require('./transaction/accountsGenerator');

const bc = new Blockchain();

const accounts = genAccounts(3);
const txnsPerBlock = 5;

for (const account of accounts) {
    // mining initial empty blocks so everyone has some money
    bc.mineNewBlock(account.getPublic('hex'));
}
bc.mineNewBlock(accounts[accounts.length - 1].getPublic('hex'));

while (true) {
    for (let i = 0; i < txnsPerBlock; i++) {
        const fromIdx = Math.ceil(Math.random() * accounts.length - 1);
        const from = accounts[fromIdx].getPublic('hex');

        const toIdx = (fromIdx + Math.ceil(Math.random() * (accounts.length - 1))) % accounts.length;
        const to = accounts[toIdx].getPublic('hex');

        const txn = new Transaction(from, to, ((Math.random() * 0.3) + 0.1) * bc.balanceOf(from));
        txn.signTransaction(accounts[fromIdx]);
        try {
            bc.addTransaction(txn);
        } catch (err) { }
    }

    bc.mineNewBlock(accounts[Math.ceil(Math.random() * accounts.length - 1)]);
    console.log(bc.getLatestBlock());
}
