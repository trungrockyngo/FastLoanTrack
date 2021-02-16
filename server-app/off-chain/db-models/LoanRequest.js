const Mongoose = require("mongoose");

const loanRequestSchema = new Mongoose.Schema({
    requestId: {
        type: String,
        require: true
    },
    projectId: {
        type: String,
        require: true
    },
    projectTitle: {
        type: String,
        require: true
    },
    projectDesc: {
        type: String,
        require: true
    },
    requestDate: {
        type: String,
        require: false
    },
    borrowerId: {
        type: String,
        require: true
    }
});
const Loan = Mongoose.model('LoanRequest', loanRequestSchema, 'Loans');
module.exports = Loan;
