const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const Borrower = require("./model/Borrower");  
const Lender = require("./model/Lender");
const DB = require('./backend/offchain-db');
const onchainConfig = require('./backend/onchain-config');
const fastloan = require('./backend/onchain-fastloan');
//const Web3Utils = require('web3-utils');

//var BN = Web3Utils.BN;

app.use(express.static(path.join(__dirname, 'build')));

function callDB() {

    const borrower = {borrowerId: 2, name: 'Temple', dateOfBirth: '2010-02-09', SIN: '789-654-123', address: 'xyz', phoneNo: '789 654 123', email: 'hello@hello.com'};

    DB.connectToDB();
    DB.createBorrower(borrower);
}

app.get('/ping', function (req, res) {
    console.log('Before calling DB...');
    callDB();
    return res.send('pong');
});

app.get('/request', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.submitLoanRequest(onchainConfig.borrowerAccount, 10, 1, 'abc');
    return res.send('success');
});

app.get('/register', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.registerLender(onchainConfig.lenderAccount);
    return res.send('success');
});

app.get('/getlender', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.getLenders();
    return res.send('success');
});

app.get('/deposit', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.depositToEscrow(onchainConfig.lenderAccount, 10000000000000000000);
    return res.send('success');
});

app.get('/approve', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.approveLoanRequest('0xb2f7ef517d6d222ec36ff363c5f759f2a52106dfdc6a1a6008d6719e5d8eb641', onchainConfig.lenderAccount, 6);
    return res.send('success');
});

app.get('/transfer', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.transferbyEscrowTo(onchainConfig.borrowerAccount, 10000000000000000000, '0xb2f7ef517d6d222ec36ff363c5f759f2a52106dfdc6a1a6008d6719e5d8eb641');
    return res.send('success');
});

app.get('/pay', function (req, res) {
    console.log('Before calling Fastloan...');
    fastloan.init();
    fastloan.recordLoanPayment('0xa8566ea8f4a44f3884f316c0e68fe67d1fbbeae1a6bcfd62d386d6bfa7dd04c5', '1750000000000000000');
    return res.send('success');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
