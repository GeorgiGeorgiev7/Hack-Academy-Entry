const express = require('express');
const Blockchain = require('./blockchain/Blockchain');
const Transaction = require('./transaction/Transaction');
const genAccounts = require('./transaction/accountsGenerator');

const app = express();
const bc = new Blockchain();

const accounts = genAccounts(7);
const txnsPerBlock = 4;

for (const account of accounts) {
    // mining initial empty blocks so everyone has some money
    bc.mineNewBlock(account.getPublic('hex'));
}
bc.mineNewBlock(accounts[accounts.length - 1].getPublic('hex'));

app.use(express.urlencoded({ extended: true }));

app.get('/next', (req, res) => {
    nextBlock();
    res.json(bc.getLatestBlock());
});

app.listen(8080);

function nextBlock() {
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

    bc.mineNewBlock(accounts[Math.ceil(Math.random() * accounts.length - 1)].getPublic('hex'));

}
