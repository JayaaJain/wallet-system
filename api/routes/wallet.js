const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const wallets = {}, transactions = {}

router.post('/setup', (req, res) => {
    var newWallet = {
        "id": uuidv4(),
        "balance": req.body.balance,
        "name": req.body.name,
        "date": new Date().toISOString(),
        "transactionId": uuidv4(),
      }
    wallets[newWallet.id] = {
        "transactions": [newWallet.transactionId],
        "balance": newWallet.balance,
        "name": newWallet.name,
        "date": newWallet.date
    }
    transactions[newWallet.transactionId] = {
        balance: newWallet.balance,
        amount: newWallet.balance,
        description: 'Wallet setup successful',
        date: newWallet.date,
        type: req.body.balance > 0 ? 'CREDIT' : 'DEBIT'
    }
    res.send(newWallet);
});

router.get('/wallet/:id', (req, res) => {
    var givenWalletId = req.params.id;
    if(!wallets[givenWalletId]) {
        res.status(404).json({errors: {message: 'Object not found'}})
        return false;
    }
    var walletDetails = {
        "id": givenWalletId,
        "balance": wallets[givenWalletId].balance,
        "name": wallets[givenWalletId].name,
        "date": wallets[givenWalletId].date
      }
    res.send(walletDetails);
});

router.post('/transact/:walletId', (req, res) => {
    var newTransactionId =  uuidv4();
    if(!wallets[req.params.walletId]) {
        res.status(404).json({errors: {message: 'Object not found'}})
        return;
    }
    wallets[req.params.walletId].transactions.push(newTransactionId);
    wallets[req.params.walletId].balance += req.body.amount;
    transactions[newTransactionId] = {
        balance: wallets[req.params.walletId].balance,
        amount: req.body.amount,
        description: req.body.description,
        date: new Date().toISOString(),
        type: req.body.amount > 0 ? 'CREDIT' : 'DEBIT'
    }
    res.send({
        "balance": wallets[req.params.walletId].balance,
        "transactionId": newTransactionId
      });
});

router.get('/transactions', (req, res) => {
    var allTransactions = [];
    var givenWalletId = req.query.walletId;
    if(!wallets[givenWalletId]) {
        res.status(404).json({errors: {message: 'Object not found'}})
        return false;
    }
    var givenWallet = wallets[givenWalletId]
    //TODO: splice for skip and slice limit
    for(let eachTransaction of givenWallet.transactions) {
        eachTransaction = {
            "id": eachTransaction,
            "walletId": givenWalletId,
            "amount": transactions[eachTransaction].amount,
            "balance": transactions[eachTransaction].balance,
            "description": transactions[eachTransaction].description,
            "date": transactions[eachTransaction].date,
            "type": transactions[eachTransaction].type
          }
        allTransactions.push(eachTransaction);
    }
    res.send(allTransactions);
});

module.exports = router;