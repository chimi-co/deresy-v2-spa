const ENVIRONMENT = 'development'; // 'development' or 'production'

const OPTIMISM_NETWORK_ID = ENVIRONMENT === 'development' ? 420 : 20;

const abiGoerli = [
  {
    "inputs": [
      {
        "internalType": "contract IEAS",
        "name": "eas",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessDenied",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientValue",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidEAS",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotPayable",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_requestName",
        "type": "string"
      }
    ],
    "name": "ClosedReviewRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_formId",
        "type": "uint256"
      }
    ],
    "name": "CreatedReviewForm",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_requestName",
        "type": "string"
      }
    ],
    "name": "CreatedReviewRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_requestName",
        "type": "string"
      }
    ],
    "name": "SubmittedReview",
    "type": "event"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation",
        "name": "attestation",
        "type": "tuple"
      }
    ],
    "name": "attest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "closeReviewRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractVersion",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "address[]",
        "name": "reviewers",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "hypercertTargetIDs",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "targetsIPFSHashes",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "formIpfsHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rewardPerReview",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reviewFormIndex",
        "type": "uint256"
      }
    ],
    "name": "createRequest",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "easSchemaID",
        "type": "bytes32"
      },
      {
        "internalType": "string[]",
        "name": "questions",
        "type": "string[]"
      },
      {
        "internalType": "string[][]",
        "name": "choices",
        "type": "string[][]"
      },
      {
        "internalType": "enum DeresyResolver.QuestionType[]",
        "name": "questionTypes",
        "type": "uint8[]"
      }
    ],
    "name": "createReviewForm",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "getRequest",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "reviewers",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "hypercertTargetIDs",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "targetsIPFSHashes",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "formIpfsHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rewardPerReview",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "reviewer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "hypercertID",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "attestationID",
            "type": "bytes32"
          }
        ],
        "internalType": "struct DeresyResolver.Review[]",
        "name": "reviews",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256",
        "name": "reviewFormIndex",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isClosed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "getRequestReviewForm",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "enum DeresyResolver.QuestionType[]",
        "name": "",
        "type": "uint8[]"
      },
      {
        "internalType": "string[][]",
        "name": "choices",
        "type": "string[][]"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_reviewFormIndex",
        "type": "uint256"
      }
    ],
    "name": "getReviewForm",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "enum DeresyResolver.QuestionType[]",
        "name": "",
        "type": "uint8[]"
      },
      {
        "internalType": "string[][]",
        "name": "choices",
        "type": "string[][]"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReviewRequestsNames",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isPayable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation[]",
        "name": "attestations",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "multiAttest",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation[]",
        "name": "attestations",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "multiRevoke",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reviewFormsTotal",
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
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation",
        "name": "attestation",
        "type": "tuple"
      }
    ],
    "name": "revoke",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
const abiProd =[];
const abi = ENVIRONMENT === 'development' ? abiGoerli : abiProd;

const easAbiGoerli = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessDenied",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyRevoked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyRevokedOffchain",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyTimestamped",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientValue",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAttestation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAttestations",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidExpirationTime",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidOffset",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRegistry",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRevocation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRevocations",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSchema",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignature",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidVerifier",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Irrevocable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotPayable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongSchema",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "attester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "name": "Attested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "attester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "name": "Revoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "revoker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      }
    ],
    "name": "RevokedOffchain",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      }
    ],
    "name": "Timestamped",
    "type": "event"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData",
            "name": "data",
            "type": "tuple"
          }
        ],
        "internalType": "struct AttestationRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "attest",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData",
            "name": "data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature",
            "name": "signature",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          }
        ],
        "internalType": "struct DelegatedAttestationRequest",
        "name": "delegatedRequest",
        "type": "tuple"
      }
    ],
    "name": "attestByDelegation",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAttestTypeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      }
    ],
    "name": "getAttestation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDomainSeparator",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getNonce",
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
        "internalType": "address",
        "name": "revoker",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "getRevokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRevokeTypeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSchemaRegistry",
    "outputs": [
      {
        "internalType": "contract ISchemaRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "getTimestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      }
    ],
    "name": "isAttestationValid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct MultiAttestationRequest[]",
        "name": "multiRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiAttest",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature[]",
            "name": "signatures",
            "type": "tuple[]"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          }
        ],
        "internalType": "struct MultiDelegatedAttestationRequest[]",
        "name": "multiDelegatedRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiAttestByDelegation",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct MultiRevocationRequest[]",
        "name": "multiRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiRevoke",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature[]",
            "name": "signatures",
            "type": "tuple[]"
          },
          {
            "internalType": "address",
            "name": "revoker",
            "type": "address"
          }
        ],
        "internalType": "struct MultiDelegatedRevocationRequest[]",
        "name": "multiDelegatedRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiRevokeByDelegation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "data",
        "type": "bytes32[]"
      }
    ],
    "name": "multiRevokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "data",
        "type": "bytes32[]"
      }
    ],
    "name": "multiTimestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData",
            "name": "data",
            "type": "tuple"
          }
        ],
        "internalType": "struct RevocationRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "revoke",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData",
            "name": "data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature",
            "name": "signature",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "revoker",
            "type": "address"
          }
        ],
        "internalType": "struct DelegatedRevocationRequest",
        "name": "delegatedRequest",
        "type": "tuple"
      }
    ],
    "name": "revokeByDelegation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "revokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "timestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const easAbiProd = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessDenied",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyRevoked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyRevokedOffchain",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "AlreadyTimestamped",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientValue",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAttestation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAttestations",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidExpirationTime",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidOffset",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRegistry",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRevocation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidRevocations",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSchema",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignature",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidVerifier",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Irrevocable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotPayable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WrongSchema",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "attester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "name": "Attested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "attester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "schema",
        "type": "bytes32"
      }
    ],
    "name": "Revoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "revoker",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      }
    ],
    "name": "RevokedOffchain",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      }
    ],
    "name": "Timestamped",
    "type": "event"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData",
            "name": "data",
            "type": "tuple"
          }
        ],
        "internalType": "struct AttestationRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "attest",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData",
            "name": "data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature",
            "name": "signature",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          }
        ],
        "internalType": "struct DelegatedAttestationRequest",
        "name": "delegatedRequest",
        "type": "tuple"
      }
    ],
    "name": "attestByDelegation",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAttestTypeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      }
    ],
    "name": "getAttestation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "uid",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "time",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expirationTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "revocationTime",
            "type": "uint64"
          },
          {
            "internalType": "bytes32",
            "name": "refUID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "revocable",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Attestation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDomainSeparator",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getNonce",
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
        "internalType": "address",
        "name": "revoker",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "getRevokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRevokeTypeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSchemaRegistry",
    "outputs": [
      {
        "internalType": "contract ISchemaRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "getTimestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "uid",
        "type": "bytes32"
      }
    ],
    "name": "isAttestationValid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct MultiAttestationRequest[]",
        "name": "multiRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiAttest",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature[]",
            "name": "signatures",
            "type": "tuple[]"
          },
          {
            "internalType": "address",
            "name": "attester",
            "type": "address"
          }
        ],
        "internalType": "struct MultiDelegatedAttestationRequest[]",
        "name": "multiDelegatedRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiAttestByDelegation",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct MultiRevocationRequest[]",
        "name": "multiRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiRevoke",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData[]",
            "name": "data",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature[]",
            "name": "signatures",
            "type": "tuple[]"
          },
          {
            "internalType": "address",
            "name": "revoker",
            "type": "address"
          }
        ],
        "internalType": "struct MultiDelegatedRevocationRequest[]",
        "name": "multiDelegatedRequests",
        "type": "tuple[]"
      }
    ],
    "name": "multiRevokeByDelegation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "data",
        "type": "bytes32[]"
      }
    ],
    "name": "multiRevokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "data",
        "type": "bytes32[]"
      }
    ],
    "name": "multiTimestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData",
            "name": "data",
            "type": "tuple"
          }
        ],
        "internalType": "struct RevocationRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "revoke",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "uid",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct RevocationRequestData",
            "name": "data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct EIP712Signature",
            "name": "signature",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "revoker",
            "type": "address"
          }
        ],
        "internalType": "struct DelegatedRevocationRequest",
        "name": "delegatedRequest",
        "type": "tuple"
      }
    ],
    "name": "revokeByDelegation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "revokeOffchain",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "timestamp",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const easAbi = ENVIRONMENT === 'development' ? easAbiGoerli : easAbiProd;

const contractAddressGoerli = "0x07F31e460395D982aE803Ee387ca8D5A54A1368d";
const contractAddressProd = ""
const contractAddress = ENVIRONMENT === 'development' ? contractAddressGoerli : contractAddressProd;

const easContractAddressGoerli = "0x4200000000000000000000000000000000000021"
const easContractAddressProd = "0x4200000000000000000000000000000000000021"
const easContractAddress = ENVIRONMENT === 'development' ? easContractAddressGoerli : easContractAddressProd;

const easExplorerURLGoerli="https://optimism-goerli-bedrock.easscan.org";
const easExplorerURLProd="https://optimism.easscan.org/";
const easExplorerURL = ENVIRONMENT === 'development' ? easExplorerURLGoerli : easExplorerURLProd;

let account;
let web3;

const handleAccountsChanged = (accounts) => {
  if (accounts.length === 0) {
    document.getElementById("enableMM").innerHTML = "<small>Please connect your wallet</small>";
    document.getElementById("connectBtn").style = "display: block";
  } else if (accounts[0] !== account) {
    account = accounts[0];
      
    if (account != null) {
      document.getElementById("enableMM").innerHTML = `<small>Current account: ${account}</small>`;
      document.getElementById("connectBtn").style = "display: none";
      var pathname = window.location.pathname.split("/").pop()
      if(pathname == 'get_review_form.html' || pathname == 'create_request.html'){
        populateReviewFormIndexSelect();
      } else if(pathname == 'submit_review.html' || pathname == 'get_request.html' || pathname == 'close_request.html'){
        populateReviewRequestNameSelect();
      }
    } else {
      document.getElementById(
        "enableMM"
      ).innerHTML = "Please connect your wallet";
      document.getElementById("connectBtn").style = "display: block";
    }
  }
};
      
const connect = () => {
  ethereum
  .request({ method: "eth_requestAccounts" })
  .then(handleAccountsChanged)
  .catch((err) => {
    if (err.code === 4001) {
      console.log("Connect please...");
      document.getElementById("enableMM").innerHTML ="<small>You refused to connect</small>";
      document.getElementById("connectBtn").style = "display: block";
    } else {
      console.error(err);
    }
  });
};

const handleNetworkMessage = (chainId) => {
  let networkAlert = document.getElementById("network-info");
  if(chainId == OPTIMISM_NETWORK_ID) {
    networkAlert.style = "display:none";
  } else {
    networkAlert.style = "display:block"
  }
};

const getContractVersion = async  () => {
  const contract = new web3.eth.Contract(abi, contractAddress, {
    from: account,
  });
  const contractVersion = await contract.methods.contractVersion().call();
  document.getElementById('contractVersion').innerHTML = `Version: ${contractVersion}`
};
      
const detectMetaMask = () => typeof window.ethereum !== "undefined";
      
window.onload = async function () {
  detectMM = detectMetaMask();
  if (detectMM) {
    document.getElementById("enableMM").getAttribute("disabled", false);
    try {
      web3 = new Web3(window.ethereum);
      await connect();
      ethereum.
      request({ method: "eth_chainId" })
      .then(handleNetworkMessage)
      //.then(getContractVersion);
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("enableMM").getAttribute("disabled", true);
  }
        
  document.getElementById("connectBtn").addEventListener("click", connect);
};