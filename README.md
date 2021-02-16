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
  * Pay loan payment by installment amount
* Lender's interface
  * Lender to register on the system
  * Lender deposit amount to fastLoanEscrow 
* super-validator interface
  * Get escrow balance
  * Approve loan requests
  * Transfer amount to borrower
  * Refund to lender

## Sample Walkthrough of DApp
1.  From Borrower screen, submit loan request by filling project id, title and amount e.g.(1, abc, 10). click Submit.
2.  From Lender screen, click Register.
3.  From Super Validator screen, fill number of installments (e.g. 6) and click Approve.
4.  From Lender screen, Enter amount e.g. '10000000000000000000' and click Submit.
5.  From Super Validator screen, click on Get Escrow Balance to get balance in the smart contract. it will show 10000000000000000000.
6.  Transfer to borrower from Super Validator screen. Click Transfer to Borrower.
7.  From Super Validator screen, click on Get Escrow Balance to get balance in the smart contract. it will show 0 balance.
8.  Borrower can pay back loan in installments. Do this from Borrower screen. Enter amount as '1750000000000000000' and click Submit x 6 times. since number of installment is 6 and loan interest is at 5%
9.  From Super Validator screen, Get Escrow Balance after each deposit from borrower with Get escrow balance button. it should now show 10500000000000000000.
10. Refund lender's money with interest. From Super Validator screen, click Refund to Lender.
11. Escrow balance after transferring money to lender should now show 0.