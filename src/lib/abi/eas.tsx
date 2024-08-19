export const easAbi = [
  {
    type: 'constructor',
    name: '',
    inputs: [
      {
        type: 'address',
        name: 'registry',
        internalType: 'contract ISchemaRegistry',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'VERSION',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'attest',
    inputs: [
      {
        type: 'tuple',
        name: 'request',
        components: [
          {
            type: 'bytes32',
            name: 'schema',
          },
          {
            type: 'tuple',
            name: 'data',
            components: [
              {
                type: 'address',
                name: 'recipient',
              },
              {
                type: 'uint64',
                name: 'expirationTime',
              },
              {
                type: 'bool',
                name: 'revocable',
              },
              {
                type: 'bytes32',
                name: 'refUID',
              },
              {
                type: 'bytes',
                name: 'data',
              },
              {
                type: 'uint256',
                name: 'value',
              },
            ],
          },
        ],
        internalType: 'struct AttestationRequest',
      },
    ],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'attestByDelegation',
    inputs: [
      {
        type: 'tuple',
        name: 'delegatedRequest',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple',
            name: '',
            components: [
              {
                type: 'address',
              },
              {
                type: 'uint64',
              },
              {
                type: 'bool',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes',
              },
              {
                type: 'uint256',
              },
            ],
          },
          {
            type: 'tuple',
            name: '',
            components: [
              {
                type: 'uint8',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes32',
              },
            ],
          },
          {
            type: 'address',
            name: '',
          },
        ],
        internalType: 'struct DelegatedAttestationRequest',
      },
    ],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getAttestTypeHash',
    inputs: [],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAttestation',
    inputs: [
      {
        type: 'bytes32',
        name: 'uid',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'tuple',
        name: '',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'uint64',
            name: '',
          },
          {
            type: 'uint64',
            name: '',
          },
          {
            type: 'uint64',
            name: '',
          },
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'address',
            name: '',
          },
          {
            type: 'address',
            name: '',
          },
          {
            type: 'bool',
            name: '',
          },
          {
            type: 'bytes',
            name: '',
          },
        ],
        internalType: 'struct Attestation',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDomainSeparator',
    inputs: [],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNonce',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRevokeOffchain',
    inputs: [
      {
        type: 'address',
        name: 'revoker',
        internalType: 'address',
      },
      {
        type: 'bytes32',
        name: 'data',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRevokeTypeHash',
    inputs: [],
    outputs: [
      {
        type: 'bytes32',
        name: '',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getSchemaRegistry',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract ISchemaRegistry',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTimestamp',
    inputs: [
      {
        type: 'bytes32',
        name: 'data',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isAttestationValid',
    inputs: [
      {
        type: 'bytes32',
        name: 'uid',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'multiAttest',
    inputs: [
      {
        type: 'tuple[]',
        name: 'multiRequests',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'address',
              },
              {
                type: 'uint64',
              },
              {
                type: 'bool',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes',
              },
              {
                type: 'uint256',
              },
            ],
          },
        ],
        internalType: 'struct MultiAttestationRequest[]',
      },
    ],
    outputs: [
      {
        type: 'bytes32[]',
        name: '',
        internalType: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'multiAttestByDelegation',
    inputs: [
      {
        type: 'tuple[]',
        name: 'multiDelegatedRequests',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'address',
              },
              {
                type: 'uint64',
              },
              {
                type: 'bool',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes',
              },
              {
                type: 'uint256',
              },
            ],
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'uint8',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes32',
              },
            ],
          },
          {
            type: 'address',
            name: '',
          },
        ],
        internalType: 'struct MultiDelegatedAttestationRequest[]',
      },
    ],
    outputs: [
      {
        type: 'bytes32[]',
        name: '',
        internalType: 'bytes32[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'multiRevoke',
    inputs: [
      {
        type: 'tuple[]',
        name: 'multiRequests',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'bytes32',
              },
              {
                type: 'uint256',
              },
            ],
          },
        ],
        internalType: 'struct MultiRevocationRequest[]',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'multiRevokeByDelegation',
    inputs: [
      {
        type: 'tuple[]',
        name: 'multiDelegatedRequests',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'bytes32',
              },
              {
                type: 'uint256',
              },
            ],
          },
          {
            type: 'tuple[]',
            name: '',
            components: [
              {
                type: 'uint8',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes32',
              },
            ],
          },
          {
            type: 'address',
            name: '',
          },
        ],
        internalType: 'struct MultiDelegatedRevocationRequest[]',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'multiRevokeOffchain',
    inputs: [
      {
        type: 'bytes32[]',
        name: 'data',
        internalType: 'bytes32[]',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'multiTimestamp',
    inputs: [
      {
        type: 'bytes32[]',
        name: 'data',
        internalType: 'bytes32[]',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revoke',
    inputs: [
      {
        type: 'tuple',
        name: 'request',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple',
            name: '',
            components: [
              {
                type: 'bytes32',
              },
              {
                type: 'uint256',
              },
            ],
          },
        ],
        internalType: 'struct RevocationRequest',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'revokeByDelegation',
    inputs: [
      {
        type: 'tuple',
        name: 'delegatedRequest',
        components: [
          {
            type: 'bytes32',
            name: '',
          },
          {
            type: 'tuple',
            name: '',
            components: [
              {
                type: 'bytes32',
              },
              {
                type: 'uint256',
              },
            ],
          },
          {
            type: 'tuple',
            name: '',
            components: [
              {
                type: 'uint8',
              },
              {
                type: 'bytes32',
              },
              {
                type: 'bytes32',
              },
            ],
          },
          {
            type: 'address',
            name: '',
          },
        ],
        internalType: 'struct DelegatedRevocationRequest',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'revokeOffchain',
    inputs: [
      {
        type: 'bytes32',
        name: 'data',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'timestamp',
    inputs: [
      {
        type: 'bytes32',
        name: 'data',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        type: 'uint64',
        name: '',
        internalType: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Attested',
    inputs: [
      {
        type: 'address',
        name: 'recipient',
        indexed: true,
      },
      {
        type: 'address',
        name: 'attester',
        indexed: true,
      },
      {
        type: 'bytes32',
        name: 'uid',
        indexed: false,
      },
      {
        type: 'bytes32',
        name: 'schema',
        indexed: true,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Revoked',
    inputs: [
      {
        type: 'address',
        name: 'recipient',
        indexed: true,
      },
      {
        type: 'address',
        name: 'attester',
        indexed: true,
      },
      {
        type: 'bytes32',
        name: 'uid',
        indexed: false,
      },
      {
        type: 'bytes32',
        name: 'schema',
        indexed: true,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokedOffchain',
    inputs: [
      {
        type: 'address',
        name: 'revoker',
        indexed: true,
      },
      {
        type: 'bytes32',
        name: 'data',
        indexed: true,
      },
      {
        type: 'uint64',
        name: 'timestamp',
        indexed: true,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Timestamped',
    inputs: [
      {
        type: 'bytes32',
        name: 'data',
        indexed: true,
      },
      {
        type: 'uint64',
        name: 'timestamp',
        indexed: true,
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AccessDenied',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyRevoked',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyRevokedOffchain',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'AlreadyTimestamped',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientValue',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidAttestation',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidAttestations',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidExpirationTime',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidLength',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidOffset',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRegistry',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRevocation',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRevocations',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSchema',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSignature',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'InvalidVerifier',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'Irrevocable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'NotFound',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'NotPayable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'WrongSchema',
    inputs: [],
    outputs: [],
  },
] as const
