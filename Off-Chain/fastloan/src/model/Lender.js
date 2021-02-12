const Mongoose = require("mongoose");

const lenderSchema = new Mongoose.Schema({
    lenderId: {
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
    lenderEthAddress: {
        type: String,
        require: false
    }
});
const Lender = Mongoose.model('Lender', lenderSchema, 'Lenders');
module.exports = Lender;
