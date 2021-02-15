// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import './IFastLoan.sol';

contract FastLoanEscrow is IFastLoan {
    
    struct LoanRequest {
		address payable borrower;
		uint256 projectID;
        string projectTitle;
		uint projectDuration;
		uint256 amount;
	}
	
	struct Loan {
	    uint256 projectID;
		address payable lender;
		address payable borrower;
		uint256 amount;
		uint256 afterInterestBalance;
		uint256 interestAmount; 
		uint256 paymentEndTime;
		uint8 requiredNofInstallments; 
		uint8 remainingNofInstallments;
		bool isClosed;
	}
	
	mapping(address => uint256) public lenderWithdrawals;
	
	mapping(address => uint256) private lenderDepositInEscrow; 
	
	uint256 public escrowBalance; 
	
	// Current implementation: nonce as state variable counter 
	uint256 private nonce; 
	
	// Request info
	bytes32[] private requestIDs;
	mapping(bytes32 => LoanRequest) private requests;
	
	// Loan info. // one loan per user.
	mapping(address => bytes8) private userLoan;
	mapping(bytes32 => Loan) private loanDB;

	// Aggregate Lenders info
	address[] private allLenders;
	mapping(address => bool) private lendersExisted; 
	

	// Aggregate borrowers' info
	address[] private allBorrowers;
	mapping(address => bool) private borrowersExisted;
	
	// User-specific information
	mapping(address => uint) private debt;
	
	// All projects ever started (excludes requests)
	bytes8[] private allProjects;

	
	// Super validator also controlling the escrow 
	address public superValidator;
	
	//NOTE: fixed duration set at 6 months 
    uint256 private fixedDuration = 15552000;
    
    //FUTURE enhancement: have the mapping of more flexible project loan durations 

	constructor () {
	    superValidator = msg.sender;
	    nonce = 0; 
	    
	    escrowBalance = address(this).balance;
	}
    
    function registerLender(address _lender) override public {
        require(_lender != superValidator, "the current lender address is superValidator");
        
        if (!lendersExisted[_lender]) {
            allLenders.push(_lender);
            lendersExisted[_lender] = true; 
        }
    }

    function submitLoanRequest(address payable _borrower, uint256 _amount, uint256 _projectId, string memory _projectTitle) override public {

        require(_borrower != superValidator, "the borower needs the different address from the superValidator");
        
        //validate that borrower does not submit multiple loan request.
        require(!borrowersExisted[_borrower], "borrower is already existed, can not submit multiple loan request");
        
        //TASK: check if mapping of _projectID is existed 
        //require(_projectId)
	    
	    bytes32 _requestId = keccak256(abi.encodePacked(_borrower, _amount, nonce, address(this)));
        nonce += 1; 
        
        
        //NOTE: _amount need to be in big decimal corresponding to wei
        uint256 _amount_ = _amount * 1 ether;
        
	    requests[_requestId] = LoanRequest( _borrower, _projectId, _projectTitle, fixedDuration, _amount_);
	 
	    
	     //update allBorrowers
	    allBorrowers.push(msg.sender);
        borrowersExisted[_borrower] = true; 
	        
	    requestIDs.push(_requestId);
	    
	    emit LoanRequestSubmitted(msg.sender, _amount_, _projectId);
	}

	function approveLoanRequest(bytes32 _requestId, address payable _lender, 
	                            uint8 _numberOfInstallments) public override {
	    require(superValidator == msg.sender, "Approval can only be set by superValidator");
	    
	    //NOTE: check whether _lender is existed in the mapping 
	    for (uint256 i = 0; i < allLenders.length; i++) {
	        if(allLenders[i] == _lender) {
	            
	            loanDB[_requestId].lender = _lender; 
	             
	            loanDB[_requestId].amount =  requests[_requestId].amount;
	    
        	    loanDB[_requestId].projectID = requests[_requestId].projectID;
                
                loanDB[_requestId].borrower = requests[_requestId].borrower; 
                
                uint256 loanAmount = loanDB[_requestId].amount;
                
                //TASK: need to revise w/ SafeMath
                //uint256 interestAmount_ = loanAmount * fixedInterestRate; 
                uint256 interestAmount_ = loanAmount *  5 / 100; 
                
                loanDB[_requestId].interestAmount = interestAmount_;
            
                loanDB[_requestId].afterInterestBalance = loanAmount + interestAmount_;
               
                loanDB[_requestId].paymentEndTime = block.timestamp + fixedDuration; 
                
                loanDB[_requestId].requiredNofInstallments = _numberOfInstallments; 
                
                loanDB[_requestId].remainingNofInstallments = _numberOfInstallments;
    
                loanDB[_requestId].isClosed = false; 
	        }
	    }
	    
	    emit LoanRequestApproved(_lender, _numberOfInstallments);
	}
    
    /**
    * @dev transfer ETH to both borrower or lender involving the loan request
    */
    function transferbyEscrowTo(address _to, uint256 _amount, bytes32 _requestId) public payable {
      require(msg.sender == superValidator, "Must be called by superValidator for the escrow to transfer the amount");
        
        require(lendersExisted[_to] || borrowersExisted[_to], "this address is not existed as borrower or lender"); 
        
        bool amountCheck = (_amount == loanDB[_requestId].afterInterestBalance || _amount == loanDB[_requestId].amount); 
        require(amountCheck, "the amount supposed to be sent to the borrower is not matched");
        
        require(escrowBalance >=_amount, 'not enough balance in escrow balance');
        
        escrowBalance -= _amount; 
        
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Transfer transaction is failed");
        
    }
    
    /**
     * 
	 * @dev deposit ETH to lender managing the loan request
	 **/
	function depositToEscrow(address _lender) public payable {
	    require(_lender == msg.sender, "Must be deposited by the lender"); 
	    
	    lenderDepositInEscrow[_lender] += msg.value;
	    
	    escrowBalance += msg.value; 
	}
	
	function recordLoanPayment(bytes32 _requestId, uint256 _installmentAmount) public payable override {
	    //check _borrower is existed
	    address _borrower_ = loanDB[_requestId].borrower; 
	    require(msg.sender == _borrower_, "_borrower passed in is not existed and do transaction");
	    
	    require(!loanDB[_requestId].isClosed, "loan payment is not finished");
	    
	    uint8 _requiredNofInstallments = loanDB[_requestId].requiredNofInstallments; 
	    
	    //TASK: need to revise w/ SafeMath
	    uint256 _expectedInstallmentAmount__ = loanDB[_requestId].afterInterestBalance / _requiredNofInstallments;
	    
        require (_expectedInstallmentAmount__ == _installmentAmount, "installment amount is not correct");
        
	    
	    loanDB[_requestId].remainingNofInstallments -= 1; 
	    
	    // Move money into escrow account.
	    address currentLender = loanDB[_requestId].lender;
	    
        lenderWithdrawals[currentLender] += _installmentAmount;
	   
	   	escrowBalance += _installmentAmount; 

	    //when the loan installment is completed, escrow transfer total loan amount to the lender and reset the lender's withdrawal to 0
	    if ((loanDB[_requestId].remainingNofInstallments == 0)) {
	        
	        //transferbyEscrowTo(currentLender, amountFromEscrow, _requestId);
	        
	        lenderWithdrawals[loanDB[_requestId].lender] = 0;
	        
	        loanDB[_requestId].isClosed = true;
	    }
	    
	    emit LoanPaymentRecorded(_installmentAmount);
	}
	
	//getters
	function getRequestIDs() public override view returns (bytes32[] memory){
	   return requestIDs;
	}
	
	function getBorrowers() public override view returns (address[] memory) {
	    return allBorrowers; 
	}
	
	function getLenders() public override view returns (address[] memory) {
	    return allLenders;
	}
	
	function getLoanAmount(bytes32 _requestId) public override view returns (uint256) {
	    return loanDB[_requestId].amount; 
	}
	
	function getAmountAfterInterest(bytes32 _requestId) public override view returns (uint256) {
	    return loanDB[_requestId].afterInterestBalance; 
	}
	
	//NOTE: just for testing while deploying contract  
	function getInstallmentAmount(bytes32 _requestId, uint8 _numberOfInstallments) public view returns (uint256) {
	    return loanDB[_requestId].afterInterestBalance / _numberOfInstallments;
	}

}
