const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const Borrower = require("./model/Borrower");  
const Lender = require("./model/Lender");
const DB = require("./backend/offchain-db");


app.use(express.static(path.join(__dirname, 'build')));

function callDB() {

    const borrower = {borrowerId: 2, name: 'Temple', dateOfBirth: '2010-02-09', SIN: '789-654-123', address: 'xyz', phoneNo: '789 654 123', email: 'hello@hello.com'};

    DB.connectToDB();
    DB.createBorrower(borrower);

    /*
    const connectionString = "mongodb+srv://admin:admin@cluster0.hhad4.mongodb.net/fastloan?retryWrites=true&w=majority";
    mongoose.connect(connectionString, { useNewUrlParser : true } ).then(() => { 
        console.log("Mongoose connected successfully "); }, 
        error => { console.log("Mongoose could not connect to database " + error);  }
    );
    
    Borrower.create({borrowerId: 1, name: 'Moayyad', dateOfBirth: '2020-01-10', SIN: '123-456-789', address: 'abc', phoneNo: '123 456 789', email: 'test@test.com'});
    */
}

app.get('/ping', function (req, res) {
    console.log('Before calling DB...');
    callDB();
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
