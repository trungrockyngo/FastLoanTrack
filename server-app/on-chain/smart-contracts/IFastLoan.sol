// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

interface IFastLoan {
    
    event LoanRequestSubmitted(address, uint256, uint256);
    //NOTE: can add more even emitter for other functions 
    
    event LenderRegistered(address);
    
    event LoanRequestApproved(address, uint256);
    
    event LoanPaymentRecorded(uint256);
    
    /**
     * @dev register lender.
	 */
    function registerLender(address _lender) external; 

	/**
	 * @dev create and submit request.
	 */
    function submitLoanRequest(address payable _borrower, uint256 _amount, uint256 _projectId, string memory _projectTitle) external; 
                        //, uint _projectDuration) external;

	
	/**
	 * @dev approve submitted request. Should be done by the superValidator or delegated validator
	 **/
	function approveLoanRequest(bytes32 _requestId, address payable _lender, 
	                            uint8 _numberOfInstallments) external;
	                           
	
	/**
	 * @dev record the payments of the loans by checking whether the payment is fully paid
	 * 
	 * compare _installmentAmount to loan-amount/ numberOfInstallments & numberOfInstallments == 0 
	 * if condition is passed, do update: 
	        - currentBalance  
	        - numberOfInstallments decrease by 1 
	        - transfer eth amount to lender - implemented by Escrow 
	 */
	function recordLoanPayment(bytes32 _requestId, uint256 _installmentAmount) external payable; 
	
	/**
	 * @dev get  list of cryptographic request IDs
	*/
	function getRequestIDs() external view returns (bytes32[] memory); 

    /**
	 * @dev get  list of borrowers
	*/
	function getBorrowers() external view returns (address[] memory); 
	
	/**
	 * @dev get  list of lenders
	*/	
	function getLenders() external view returns (address[] memory);
	
	/**
	 * @dev  returns the borrower's debt which is amount after interest
	*/
	function getAmountAfterInterest(bytes32 _requestId) external view returns (uint256); 
	
	/**
	 * @dev  returns the loan amount before interest
	*/
	function getLoanAmount(bytes32 _requestId) external view returns (uint256);  
}