const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const onchainConfig = require('./onchain-config');
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
        //TASK: implement return returned data from function.    
    });
}

function depositToEscrow(lenderAddr, loanAmount) {
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
    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        const _data = contractInstance.methods.approveLoanRequest(reqId, lenderAddr, 6).encodeABI();
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

function transferbyEscrowTo(borrowerAddr, amount, requestId) {
    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        let amountBN = new BN(amount).toString();
        const _data = contractInstance.methods.transferbyEscrowTo(borrowerAddr, amountBN, requestId).encodeABI();
        var rawTx = {
            nonce: nonce,
            gasPrice: '0x20000000000',
            gasLimit: '0x41409',
            to: onchainConfig.contractAddr,
            value: amountBN,
            data: _data
            };
    
        let tx = new TxObj(rawTx);
        tx.sign(onchainConfig.superValidatorPrivateKey);
        let serializedTx = tx.serialize();
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);            
    });
}

function transferbyEscrowTo(borrowerAddr, amount, requestId) {
    web3.eth.getTransactionCount(onchainConfig.superValidatorAccount).then(nonce => {
        amountValue = new BN(amount);
        const _data = contractInstance.methods.transferbyEscrowTo(borrowerAddr, amountValue, requestId).encodeABI();
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
        const _data = contractInstance.methods.recordLoanPayment(requestId, amount).encodeABI();
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

module.exports = {
    init: init,
    submitLoanRequest: submitLoanRequest,
    registerLender: registerLender,
    getLenders: getLenders,
    depositToEscrow: depositToEscrow,
    approveLoanRequest: approveLoanRequest,
    transferbyEscrowTo: transferbyEscrowTo,
    recordLoanPayment: recordLoanPayment
};