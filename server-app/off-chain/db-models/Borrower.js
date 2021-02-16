const Mongoose = require("mongoose");

const borrowerSchema = new Mongoose.Schema({
    borrowerId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    SIN: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phoneNo: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    borrowerEthAddress: {
        type: String,
        require: false
    },
    creditScore: {
        type: String,
        require: false
    }
});
const Borrower = Mongoose.model('Borrower', borrowerSchema, 'Borrowers');
module.exports = Borrower;
