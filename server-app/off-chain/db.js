const mongoose = require("mongoose");
const Borrower = require("./db-models/Borrower");  
const Lender = require("./db-models/Lender");
const LoanRequest = require("./db-models/LoanRequest");

const server = 'cluster0.hhad4.mongodb.net';
const username = 'admin';
const password = 'admin';
const dbName = 'fastloan';

function connectToDB() {
    const connectionString = "mongodb+srv://" + username + ":" + password + "@" + server + "/" + dbName + "?retryWrites=true&w=majority";
    mongoose.connect(connectionString, { useNewUrlParser : true } ).then(() => { 
        console.log("Mongoose connected successfully "); }, 
        error => { console.log("Mongoose could not connect to database " + error);  }
    );
}

function createBorrower(borrower) {    
    Borrower.create(borrower);
}

function createLender(lender) {    
    Lender.create(lender);
}

function createLoanRequest(loanRequest) {
    Loan.create(loanRequest);
}

module.exports = {
    connectToDB: connectToDB,
    createBorrower: createBorrower,
    createLender: createLender,
    createLoanRequest: createLoanRequest
};
