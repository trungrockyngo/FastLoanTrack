const abi = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "address payable",
				"name": "_lender",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_numberOfInstallments",
				"type": "uint8"
			}
		],
		"name": "approveLoanRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lender",
				"type": "address"
			}
		],
		"name": "depositToEscrow",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "LenderRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LoanPaymentRecorded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LoanRequestApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LoanRequestSubmitted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_installmentAmount",
				"type": "uint256"
			}
		],
		"name": "recordLoanPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lender",
				"type": "address"
			}
		],
		"name": "registerLender",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_borrower",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_projectTitle",
				"type": "string"
			}
		],
		"name": "submitLoanRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			}
		],
		"name": "transferbyEscrowTo",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "escrowBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			}
		],
		"name": "getAmountAfterInterest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBorrowers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "_numberOfInstallments",
				"type": "uint8"
			}
		],
		"name": "getInstallmentAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLenders",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			}
		],
		"name": "getLoanAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRequestIDs",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lenderWithdrawals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "superValidator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const providerURL = 'http://localhost:7545';

//NOTE: as of now, every time of deployment on the contract using Ganache, contract address is changed 
const contractAddr = '0xAaD22367D390C6Ca9BE366aa93997423EDd4C215';

//NOTE: prevent Ganache account addresses be changed by saving the Ethereum workspace
const superValidatorAccount = '0x3D728dca2506331E82E9fa3EBD8499fc3e2A5ad0';
const superValidatorPrivateKey = Buffer.from('9f052a1f34716f15911b4dfd22c0c7cbb1b33e6b2ccf0ad319a294f0fdf4b21e', 'hex');

const borrowerAccount = '0x09bC45A63f63fa23F256D6415a7eC5590F5dd39c';
const borrowerPrivateKey = Buffer.from('3340b3216442125af6aeb5c4a866a88b7b27f82378b9a3d47564933b35940daa', 'hex');

const lenderAccount = '0xA9F9B1b1f277CC1A8b3726b313D46676b562919c';
const lenderPrivateKey = Buffer.from('4549b6d72eafb01c60fc1ee1cbd426146f3cb9d003662fea73a0d792e6a3b7af', 'hex');

module.exports = {
    contractAddr: contractAddr,
    abi: abi,
    providerURL: providerURL,
    superValidatorAccount: superValidatorAccount,
    superValidatorPrivateKey: superValidatorPrivateKey,
    borrowerAccount: borrowerAccount,
    borrowerPrivateKey: borrowerPrivateKey,
    lenderAccount: lenderAccount,
    lenderPrivateKey: lenderPrivateKey
};