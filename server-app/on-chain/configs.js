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
const contractAddr = '0x47E688569082e15be88597c812abF3B36D4b942b';

//NOTE: prevent Ganache account addresses be changed by saving the Ethereum workspace
const superValidatorAccount = '0x3E48C5090E27FCFeFCfd66b3E0a32AB19788678D';
const superValidatorPrivateKey = Buffer.from('35c7a119ced50e1429b423cb655443c4ebaeec3a11538fa853e8cddc29296c9c', 'hex');

const borrowerAccount = '0x9379f9643E8bdc06451254d64234Cb0f5a40d1a1';
const borrowerPrivateKey = Buffer.from('cccf4855d1a17930449118e8225d770edaef854eae45020c197bfde2dd1aa61e', 'hex');

const lenderAccount = '0x674D4d1B5e8Fd5387CA5907c21059dE309AF9275';
const lenderPrivateKey = Buffer.from('b32b69c8d27a21172078c41c9df0e93b935740ccafbb0aba97f56016cf9dad82', 'hex');

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