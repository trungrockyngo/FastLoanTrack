const mongoose = require("mongoose");
const Borrower = require("../model/Borrower");  
const Lender = require("../model/Lender");

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

module.exports = {
    connectToDB: connectToDB,
    createBorrower: createBorrower
};
