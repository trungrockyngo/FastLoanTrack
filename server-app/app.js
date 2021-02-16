var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//const mongoose = require("mongoose");
const Borrower = require("./off-chain/db-models/Borrower");
const Lender = require("./off-chain/db-models/Lender");
const DB = require('./off-chain/db');
const onchainConfig = require('./on-chain/configs');
const fastloan = require('./on-chain/fastloanEscrow');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();


app.use(cors());

//Fix NodeJS/express: cache and 304 status code
app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//NOTE: test mocked data to DB 
/*
callDB = () => {
    const borrower = {borrowerId: 2, name: 'Temple', dateOfBirth: '2010-02-09', SIN: '789-654-123', address: 'xyz', phoneNo: '789 654 123', email: 'hello@hello.com'};

    DB.connectToDB();
    DB.createBorrower(borrower);
}

app.get('/createBorrower', function (req, res) {
    console.log('Before calling DB...');
    callDB();
    return res.send('success');
});
*/

fastloan.init();

app.get('/request', function (req, res) {
    console.log('Requesting the loan from borrower ...');

    let queryObj = req.query;
    // Object.entries(queryObj).forEach( (k,v) => console.log(k + ': ' + v)); 

    fastloan.submitLoanRequest(onchainConfig.borrowerAccount, queryObj.amount, queryObj.projectId, queryObj.projectTitle);
    return res.send('success');
});

app.get('/register', function (req, res) {
    console.log('Registering the lender ...');
    fastloan.registerLender(onchainConfig.lenderAccount);
    return res.send('registerLender() succeed');
});

app.get('/lenders', function (req, res) {
    console.log('Gettting list of lender addresses ...');
    fastloan.getLenders();
    return res.send('getLenders() succeed');
});

app.get('/requestIDs', function (req, res) {
    console.log('Getting list of requestIDs ...');

    fastloan.getRequestIDs().then(
        val => res.send({ requestIDs: val })
    );
});

app.get('/loanDetails', async function (req, res) {
    console.log('Getting loan amount of current requestID ...');

    let loanDetails = {};
    loanDetails = await fastloan.getLoanDetails(req.query.reqID);
    
    res.send(loanDetails);
});

app.get('/approve', function (req, res) {
    console.log('Approving loan request assigned to lender...');

    fastloan.approveLoanRequest(req.query.reqID, onchainConfig.lenderAccount, 6);
    return res.send('approveLoanRequest(...) succeed');
});

app.get('/deposit', function (req, res) {
    console.log('Depositing to fast loan escrow with lender amount ..');

    let queryObj = req.query;
    //Object.entries(queryObj).forEach( (v,k) => console.log(k + ': ' + v)); 
    console.log('the amt deposit ' + parseInt(queryObj.amt));

    fastloan.depositToEscrowFrom(onchainConfig.lenderAccount, parseInt(queryObj.amt));

    return res.send('depositByEscrow(..) succeed');
});

app.get('/transfer', function (req, res) {
    console.log('Transfering escrow amount to borrower...');

    //
    fastloan.transferbyEscrowTo(onchainConfig.borrowerAccount, 10000000000000000000, '0x203eb4f374e71a643b458cc29df5fcf010e6b14bfba71a092da3779ad020187c');
    return res.send('success');
});

app.get('/pay', function (req, res) {
    console.log('Recording loan payment by borrower in installment...');

    ///
    fastloan.recordLoanPayment('0x203eb4f374e71a643b458cc29df5fcf010e6b14bfba71a092da3779ad020187c', 1750000000000000000);
    return res.send('recordLoanPayment(..) succeed');
});

app.get('/refund', function (req, res) {
    console.log('Refund escrow amount back to lender...');

    ///
    fastloan.transferbyEscrowTo(onchainConfig.lenderAccount, 10500000000000000000, '0x203eb4f374e71a643b458cc29df5fcf010e6b14bfba71a092da3779ad020187c');
    return res.send('transferbyEscrowTo(..) succeed');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
