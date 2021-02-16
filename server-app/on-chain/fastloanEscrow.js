const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const onchainConfig = require('./configs');
const BN = require('bn.js');


let contractInstance;
let web3;
let TxObj = Tx.Transaction;

function init() {
    web3 = new Web3(new Web3.providers.HttpProvider(onchainConfig.providerURL));
    contractInstance = new web3.eth.Contract(onchainConfig.abi, onchainConfig.contractAddr);
}

function submitLoanRequest(borrowerAddr, amount, projectId, projectTitle) {
    web3.eth.getTransactionCount(onchainConfig.borrowerAccount).then(nonce => {
        const _data = contractInstance.methods.submitLoanRequest(borrowerAddr, amount, projectId, projectTitle).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: 0,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.borrowerPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function registerLender(lenderAddr) {
    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        const _data = contractInstance.methods.registerLender(lenderAddr).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: 0,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.superValidatorPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function getLenders() {
    //TASK: implement return returned data from function.  -- Try to use call instead of sendSignedTransaction.  

    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        const _data = contractInstance.methods.getLenders().encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: 0,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.superValidatorPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
        //TASK: implement return returned data from function.  -- Try to use call instead of sendSignedTransaction.  
    });
}

function getRequestIDs() {
    const reqIDsData = contractInstance.methods.getRequestIDs().call({ from: onchainConfig.superValidatorAccount });
    
        //console.log(`requestIDs list is ${reqIDsData}`);

    return reqIDsData;
}

async function getLoanDetails(reqId) {
    const loanAmt = await contractInstance.methods.getLoanAmount(reqId).call();
    //loanAmt.then(val => console.log("loan amt " + val));
    console.log("loan amt " + loanAmt);

    const loanAfterInterestAmt = await contractInstance.methods.getAmountAfterInterest(reqId).call();
    console.log("loan amt after interest " + loanAfterInterestAmt);

    const loanDetails = {
        amt: loanAmt, 
        afterInterestAmt: loanAfterInterestAmt
    }
    
    return loanDetails;
}

function depositToEscrowFrom(lenderAddr, loanAmount) {
    web3.eth.getTransactionCount(onchainConfig.lenderAccount).then(nonce => {
        const _data = contractInstance.methods.depositToEscrow(lenderAddr).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: loanAmount,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.lenderPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function approveLoanRequest(reqId, lenderAddr, noOfInstallment) {
    console.log(`reqId ${reqId}, lenderAddr ${lenderAddr}, noOfInstallment ${noOfInstallment}`)

    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        const _data = contractInstance.methods.approveLoanRequest(reqId, lenderAddr, noOfInstallment).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: 0,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.superValidatorPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function transferbyEscrowTo(receiverAddr, amount, requestId) {
    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {

        //FIX: BigNumber issue
        //Big numbers are passed to contract fucntion using web3.utils.toBN(amount) but msg.value accept the param (amount) as is.
        const _data = contractInstance.methods.transferbyEscrowTo(receiverAddr, web3.utils.toBN(amount), requestId).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: amount,
            data: _data
        };

        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.superValidatorPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function recordLoanPayment(requestId, amount) {
    web3.eth.getTransactionCount(onchainConfig.borrowerAccount).then(nonce => {
        const _data = contractInstance.methods.recordLoanPayment(requestId, web3.utils.toBN(amount)).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: amount,
            data: _data
        };
        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.borrowerPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
    });
}

function getEscrowBalance() {
    const escrowBalanceVal = contractInstance.methods.escrowBalance().call({ from: onchainConfig.superValidatorAccount })

    console.log(`escrowBalanceVal is ${escrowBalanceVal}`);

return escrowBalanceVal;
}


module.exports = {
    init: init,
    submitLoanRequest: submitLoanRequest,
    registerLender: registerLender,
    getRequestIDs: getRequestIDs,
    getLenders: getLenders,
    getLoanDetails: getLoanDetails,
    getEscrowBalance: getEscrowBalance, 

    depositToEscrowFrom: depositToEscrowFrom,
    approveLoanRequest: approveLoanRequest,
    transferbyEscrowTo: transferbyEscrowTo,
    recordLoanPayment: recordLoanPayment
};