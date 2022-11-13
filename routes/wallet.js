const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const transactionType = { Credit: 'CREDIT', Debit: 'DEBIT' };

const Wallet = mongoose.model('Wallet', new mongoose.Schema({
    id: String,
    name: String,
    balance: Number,
    date: {type: Date, default: Date.now},
    transactions: [String],
}));

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    id: String,
    walletId: String,
    amount: Number,
    balance: Number,
    description: String,
    date: {type: Date, default: Date.now},
    type: {type: String, enum: transactionType, default: transactionType.Credit}
}));

router.post('/setup', async (req, res) => {
    let name = req.body.name;
    let balance = req.body.balance ? Number(req.body.balance.toFixed(4)) : 0;
    let walletId = uuidv4();
    const newTransaction = await addNewTransaction(walletId, balance, balance, 'Wallet setup successful');
    const wallet = new Wallet({
        id: walletId,
        name: name,
        balance: balance,
        transactions: [newTransaction.id]
    });
    const result = await wallet.save();
    const walletDetails = (({ id, name, balance, date }) => ({ id, balance, name, date }))(result);
    walletDetails['transactionId'] = result.transactions[0];
    res.send(walletDetails);
});

router.get('/wallet/:id', async (req, res) => {
    var givenWalletId = req.params.id;
    const wallet = await Wallet.findOne({id: givenWalletId}).select("id balance name date");
    if(!wallet) {
        res.status(404).send({errors: {message: 'Object not found'}})
    }
    const walletDetails = (({ id, name, balance, date }) => ({ id, balance, name, date }))(wallet);
    res.send(walletDetails);
});

router.post('/transact/:walletId', async (req, res) => {
    var givenWalletId = req.params.walletId;
    var amount = Number(req.body.amount.toFixed(4));
    var description = req.body.description;

    const wallet = await Wallet.findOne({id: givenWalletId});

    if(!wallet) {
        res.status(404).send({errors: {message: 'Object not found'}})
    }

    wallet.balance += amount;
    wallet.balance = Number(wallet.balance.toFixed(4));
    let newTransaction = await addNewTransaction(givenWalletId, amount, wallet.balance, description);
    wallet.transactions.push(newTransaction.id);
    
    const result = await wallet.save();
    const walletDetails = (({ balance }) => ({ balance }))(result);
    walletDetails['transactionId'] = newTransaction.id;
    res.send(walletDetails);
});

router.get('/transactions', async (req, res) => {
    var givenWalletId = req.query.walletId;
    var skip = req.query.skip;
    var limit = req.query.limit;

    const wallet = await Wallet.find({id: givenWalletId});

    if(!wallet) {
        res.status(404).send({errors: {message: 'Object not found'}})
    }
    const transactions = await Transaction.find({walletId: givenWalletId}).skip(skip).limit(limit);
    res.send(transactions);
});

async function addNewTransaction(walletId, amount, balance, description) {
    const type = amount > 0 ? transactionType.Credit : transactionType.Debit;
    const transaction = new Transaction({
        id: uuidv4(),
        walletId: walletId,
        description: description,
        amount: amount,
        balance: balance,
        type: type
    });
    const result = await transaction.save();
    return result;
}

module.exports = router;