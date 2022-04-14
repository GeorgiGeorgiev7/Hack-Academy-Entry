const express = require('express');
const Blockchain = require('./blockchain/Blockchain');
const Transaction = require('./transaction/Transaction');
const genAccounts = require('./transaction/accountsGenerator');
const { sha256 } = require('./utils');

const app = express();
const bc = new Blockchain();

const accounts = genAccounts(7);
const txnsPerBlock = 4;

// mining initial empty blocks so everyone has some money
for (const account of accounts) {
    bc.mineNewBlock(account.getPublic('hex'));
}
bc.mineNewBlock(accounts[accounts.length - 1].getPublic('hex'));

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hack-academy-block.web.app/');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET POST');
    next();
});

app.get('/chain/length', (req, res) => {
    res.json({ length: bc.chain.length });
});

app.get('/next', (req, res) => {
    res.json(nextBlock());
});

app.post('/hash', (req, res) => {
    let hash = sha256(req.body.data).toString();
    let nonce = '';
    const difficultyPattern = Array(req.body.difficulty + 1).join('0');
    if (!hash.startsWith(difficultyPattern)) {
        nonce = 0;
        hash = sha256(req.body.data + nonce).toString();
        while (!hash.startsWith(difficultyPattern))
            hash = sha256(req.body.data + ++nonce).toString();
    }
    res.json({ hash, nonce });
});

app.get('/chain', (req, res) => {
    if (!!req.query.skip && !!req.query.take) {
        const startIdx = Number(req.query.skip) * Number(req.query.take);
        const endIdx = startIdx + Number(req.query.take);
        res.json(bc.chain.slice(startIdx, endIdx));
    } else {
        res.json(bc.chain);
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(' >>> Server running on port:', port));

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
    return bc.getLatestBlock();
}
