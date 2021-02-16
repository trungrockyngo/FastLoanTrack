# FastLoan - A microfianance DApp

## Team Members
* Trung Ngo
* Temple Okosun
* Moayyad Alfaris
* Oluwaseun Soetan

## Project Overview
FastLoan is a project implemented with the aim of helping both unemployed, low-income and un-banked individuals to have access to loan facility. The system is built to facilitate a quick, hassle free access to loan and at the same time provide transparency and visibility to investors on timelines and loan repayment activities. 

## Instructions to running the project
* Launch ganache from its application or command line using `ganache-cli -d`
* compile and deploy **FastLoanEscrow.sol and it's interface** in **server-app/on-chain/smart-contracts** on remix by connecting remix to ganache. Choose **Web3 Provider** environment to connect to ganache
* Copy contract address, super validator address + private, borrower address + private key, lender address + private key from Ganache into the file - **server-app/on-chain/configs.js**
* From command line, Go to server-app folder and start express: `npm start`. Make sure to install packages first `npm install`
* Server application (Express) runs on port 8000, [http://localhost:8000](http://localhost:8000)
* From command line, Go to web-interface folder and start express: `npm start`. 
* view web interface on port 3000, [http://localhost:3000](http://localhost:3000)

## Quick run through of DApp
* Choose if super-validator, borrower, or lender.
* Borrower's interface:
  * Submit loan application
  * pay loan payment by installment amount
* Lender's interface
  * Lender to register on the system
  * Lender deposit amount to fastLoanEscrow 
* super-validator interface
  * get escrow balance
  * approve loan requests