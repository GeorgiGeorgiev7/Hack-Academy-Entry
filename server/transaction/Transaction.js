class Transaction {
    constructor(from, to, amount = 0) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    };
}

module.exports = Transaction;
