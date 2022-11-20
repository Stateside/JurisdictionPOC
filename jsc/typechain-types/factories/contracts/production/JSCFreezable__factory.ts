/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  JSCFreezable,
  JSCFreezableInterface,
} from "../../../contracts/production/JSCFreezable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "con",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "frozen",
        type: "bool",
      },
    ],
    name: "ContractFrozen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "RevisionAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "pdata",
        type: "bytes",
      },
    ],
    name: "RevisionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "RevisionRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "pdata",
        type: "bytes",
      },
    ],
    name: "executeRevision",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "getRevisionByName",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "paramNames",
            type: "string[]",
          },
          {
            internalType: "enum JSCRevisionsLib.ParamType[]",
            name: "paramTypes",
            type: "uint8[]",
          },
          {
            internalType: "string[]",
            name: "paramHints",
            type: "string[]",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "votingPeriod",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "approvals",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "majority",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "quorum",
                type: "uint8",
              },
              {
                internalType: "string[]",
                name: "roles",
                type: "string[]",
              },
            ],
            internalType: "struct JSCRevisionsLib.VotingRules",
            name: "rules",
            type: "tuple",
          },
        ],
        internalType: "struct JSCRevisionsLib.Revision",
        name: "value",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isFrozen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "JSCRevisionsLib.Iterator",
        name: "i",
        type: "uint256",
      },
    ],
    name: "isValidRevisionIterator",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "iterateRevisions",
    outputs: [
      {
        internalType: "JSCRevisionsLib.Iterator",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "JSCRevisionsLib.Iterator",
        name: "i",
        type: "uint256",
      },
    ],
    name: "nextRevision",
    outputs: [
      {
        internalType: "JSCRevisionsLib.Iterator",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revisionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "JSCRevisionsLib.Iterator",
        name: "i",
        type: "uint256",
      },
    ],
    name: "revisionIteratorGet",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "paramNames",
            type: "string[]",
          },
          {
            internalType: "enum JSCRevisionsLib.ParamType[]",
            name: "paramTypes",
            type: "uint8[]",
          },
          {
            internalType: "string[]",
            name: "paramHints",
            type: "string[]",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "votingPeriod",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "approvals",
                type: "uint16",
              },
              {
                internalType: "uint8",
                name: "majority",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "quorum",
                type: "uint8",
              },
              {
                internalType: "string[]",
                name: "roles",
                type: "string[]",
              },
            ],
            internalType: "struct JSCRevisionsLib.VotingRules",
            name: "rules",
            type: "tuple",
          },
        ],
        internalType: "struct JSCRevisionsLib.Revision",
        name: "value",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526005805460ff1916600117905534801561001d57600080fd5b506100273361002c565b61007c565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6117768061008b6000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c8063c5675c0a11610081578063d9a85a181161005b578063d9a85a181461019c578063f01e590c146101a4578063f2fde38b146101b757600080fd5b8063c5675c0a14610156578063d25c63ed14610169578063d6a7cfd81461018957600080fd5b8063715018a6116100b2578063715018a61461011e5780638da5cb5b14610128578063b1c7c8de1461014357600080fd5b806301ffc9a7146100d95780632321eacc1461010157806333eeb14714610113575b600080fd5b6100ec6100e73660046111db565b6101ca565b60405190151581526020015b60405180910390f35b6003545b6040519081526020016100f8565b60055460ff166100ec565b61012661020e565b005b6000546040516001600160a01b0390911681526020016100f8565b6101266101513660046112d9565b610222565b610105610164366004611351565b610371565b61017c61017736600461136a565b610408565b6040516100f891906114b9565b6100ec610197366004611351565b61093b565b6101056109d2565b61017c6101b2366004611351565b610a67565b6101266101c53660046115b1565b610fa2565b60006001600160e01b031982167f33eeb147000000000000000000000000000000000000000000000000000000001480610208575061020882611037565b92915050565b61021661109e565b61022060006110f8565b565b61022a61109e565b6040517f6b0ad69c00000000000000000000000000000000000000000000000000000000815273__$d094ecee2be569ef0d32593b6bffef0986$__90636b0ad69c9061027d9060019086906004016115da565b602060405180830381865af415801561029a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102be91906115f3565b80156102f657506004826040516102d59190611615565b9081526040519081900360200190205460ff68010000000000000000909104165b6102ff57600080fd5b610334816004846040516103139190611615565b9081526040519081900360200190205463ffffffff61116082150290911716565b7fbe116e771647155f37b08a4ebf4bb1c710020ffb2ab61cc292d8f361a2798b088282604051610365929190611631565b60405180910390a15050565b6040517fc776d8a3000000000000000000000000000000000000000000000000000000008152600160048201526024810182905260009073__$d094ecee2be569ef0d32593b6bffef0986$__9063c776d8a390604401602060405180830381865af41580156103e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102089190611656565b610410611168565b6040517ff76eafc100000000000000000000000000000000000000000000000000000000815273__$d094ecee2be569ef0d32593b6bffef0986$__9063f76eafc1906104639060019086906004016115da565b602060405180830381865af4158015610480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a49190611656565b6040518060c00160405290816000820180546104bf9061166f565b80601f01602080910402602001604051908101604052809291908181526020018280546104eb9061166f565b80156105385780601f1061050d57610100808354040283529160200191610538565b820191906000526020600020905b81548152906001019060200180831161051b57829003601f168201915b505050505081526020016001820180546105519061166f565b80601f016020809104026020016040519081016040528092919081815260200182805461057d9061166f565b80156105ca5780601f1061059f576101008083540402835291602001916105ca565b820191906000526020600020905b8154815290600101906020018083116105ad57829003601f168201915b5050505050815260200160028201805480602002602001604051908101604052809291908181526020016000905b828210156106a45783829060005260206000200180546106179061166f565b80601f01602080910402602001604051908101604052809291908181526020018280546106439061166f565b80156106905780601f1061066557610100808354040283529160200191610690565b820191906000526020600020905b81548152906001019060200180831161067357829003601f168201915b5050505050815260200190600101906105f8565b5050505081526020016003820180548060200260200160405190810160405280929190818152602001828054801561072b57602002820191906000526020600020906000905b82829054906101000a900460ff16600381111561070957610709611458565b8152602060019283018181049485019490930390920291018084116106ea5790505b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b828210156108055783829060005260206000200180546107789061166f565b80601f01602080910402602001604051908101604052809291908181526020018280546107a49061166f565b80156107f15780601f106107c6576101008083540402835291602001916107f1565b820191906000526020600020905b8154815290600101906020018083116107d457829003601f168201915b505050505081526020019060010190610759565b505050908252506040805160a08101825260058401805461ffff80821684526201000082041660208481019190915260ff6401000000008304811685870152650100000000009092049091166060840152600686018054855181840281018401909652808652958201959394929360808601939260009084015b8282101561092b57838290600052602060002001805461089e9061166f565b80601f01602080910402602001604051908101604052809291908181526020018280546108ca9061166f565b80156109175780601f106108ec57610100808354040283529160200191610917565b820191906000526020600020905b8154815290600101906020018083116108fa57829003601f168201915b50505050508152602001906001019061087f565b5050509152505090525092915050565b6040517faf0e61ec000000000000000000000000000000000000000000000000000000008152600160048201526024810182905260009073__$d094ecee2be569ef0d32593b6bffef0986$__9063af0e61ec90604401602060405180830381865af41580156109ae573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020891906115f3565b6040517f9171872e0000000000000000000000000000000000000000000000000000000081526001600482015260009073__$d094ecee2be569ef0d32593b6bffef0986$__90639171872e90602401602060405180830381865af4158015610a3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a629190611656565b905090565b610a6f611168565b6040517fa1dce554000000000000000000000000000000000000000000000000000000008152600160048201526024810183905273__$d094ecee2be569ef0d32593b6bffef0986$__9063a1dce55490604401600060405180830381865af4158015610adf573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b0791908101906116a9565b9050806040518060c0016040529081600082018054610b259061166f565b80601f0160208091040260200160405190810160405280929190818152602001828054610b519061166f565b8015610b9e5780601f10610b7357610100808354040283529160200191610b9e565b820191906000526020600020905b815481529060010190602001808311610b8157829003601f168201915b50505050508152602001600182018054610bb79061166f565b80601f0160208091040260200160405190810160405280929190818152602001828054610be39061166f565b8015610c305780601f10610c0557610100808354040283529160200191610c30565b820191906000526020600020905b815481529060010190602001808311610c1357829003601f168201915b5050505050815260200160028201805480602002602001604051908101604052809291908181526020016000905b82821015610d0a578382906000526020600020018054610c7d9061166f565b80601f0160208091040260200160405190810160405280929190818152602001828054610ca99061166f565b8015610cf65780601f10610ccb57610100808354040283529160200191610cf6565b820191906000526020600020905b815481529060010190602001808311610cd957829003601f168201915b505050505081526020019060010190610c5e565b50505050815260200160038201805480602002602001604051908101604052809291908181526020018280548015610d9157602002820191906000526020600020906000905b82829054906101000a900460ff166003811115610d6f57610d6f611458565b815260206001928301818104948501949093039092029101808411610d505790505b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015610e6b578382906000526020600020018054610dde9061166f565b80601f0160208091040260200160405190810160405280929190818152602001828054610e0a9061166f565b8015610e575780601f10610e2c57610100808354040283529160200191610e57565b820191906000526020600020905b815481529060010190602001808311610e3a57829003601f168201915b505050505081526020019060010190610dbf565b505050908252506040805160a08101825260058401805461ffff80821684526201000082041660208481019190915260ff6401000000008304811685870152650100000000009092049091166060840152600686018054855181840281018401909652808652958201959394929360808601939260009084015b82821015610f91578382906000526020600020018054610f049061166f565b80601f0160208091040260200160405190810160405280929190818152602001828054610f309061166f565b8015610f7d5780601f10610f5257610100808354040283529160200191610f7d565b820191906000526020600020905b815481529060010190602001808311610f6057829003601f168201915b505050505081526020019060010190610ee5565b505050915250509052509392505050565b610faa61109e565b6001600160a01b03811661102b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b611034816110f8565b50565b60006001600160e01b031982167f7accd13900000000000000000000000000000000000000000000000000000000148061020857507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614610208565b6000546001600160a01b031633146102205760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401611022565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61022061172a565b6040518060c0016040528060608152602001606081526020016060815260200160608152602001606081526020016111d66040518060a00160405280600061ffff168152602001600061ffff168152602001600060ff168152602001600060ff168152602001606081525090565b905290565b6000602082840312156111ed57600080fd5b81356001600160e01b03198116811461120557600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561124b5761124b61120c565b604052919050565b600067ffffffffffffffff82111561126d5761126d61120c565b50601f01601f191660200190565b600061128e61128984611253565b611222565b90508281528383830111156112a257600080fd5b828260208301376000602084830101529392505050565b600082601f8301126112ca57600080fd5b6112058383356020850161127b565b600080604083850312156112ec57600080fd5b823567ffffffffffffffff8082111561130457600080fd5b611310868387016112b9565b9350602085013591508082111561132657600080fd5b508301601f8101851361133857600080fd5b6113478582356020840161127b565b9150509250929050565b60006020828403121561136357600080fd5b5035919050565b60006020828403121561137c57600080fd5b813567ffffffffffffffff81111561139357600080fd5b61139f848285016112b9565b949350505050565b60005b838110156113c25781810151838201526020016113aa565b838111156113d1576000848401525b50505050565b600081518084526113ef8160208601602086016113a7565b601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b8581101561144b5782840389526114398483516113d7565b98850198935090840190600101611421565b5091979650505050505050565b634e487b7160e01b600052602160045260246000fd5b600061ffff8083511684528060208401511660208501525060ff604083015116604084015260ff6060830151166060840152608082015160a0608085015261139f60a0850182611403565b60006020808352835160c0828501526114d560e08501826113d7565b905081850151601f19808684030160408701526114f283836113d7565b9250604087015191508086840301606087015261150f8383611403565b606088015187820383016080890152805180835290860194506000935090850190835b8181101561156b578551600480821061155857634e487b7160e01b875260218152602487fd5b5083529486019491860191600101611532565b505060808801519450818782030160a08801526115888186611403565b94505060a08701519250808685030160c087015250506115a8828261146e565b95945050505050565b6000602082840312156115c357600080fd5b81356001600160a01b038116811461120557600080fd5b82815260406020820152600061139f60408301846113d7565b60006020828403121561160557600080fd5b8151801515811461120557600080fd5b600082516116278184602087016113a7565b9190910192915050565b60408152600061164460408301856113d7565b82810360208401526115a881856113d7565b60006020828403121561166857600080fd5b5051919050565b600181811c9082168061168357607f821691505b6020821081036116a357634e487b7160e01b600052602260045260246000fd5b50919050565b600080604083850312156116bc57600080fd5b825167ffffffffffffffff8111156116d357600080fd5b8301601f810185136116e457600080fd5b80516116f261128982611253565b81815286602083850101111561170757600080fd5b6117188260208301602086016113a7565b60209590950151949694955050505050565b634e487b7160e01b600052605160045260246000fdfea2646970667358221220d7239a47c911b054702b585465b7a2a7cf26ed4fd2ee5f3e2fc10ba71dc8b9ca64736f6c634300080d0033";

type JSCFreezableConstructorParams =
  | [linkLibraryAddresses: JSCFreezableLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JSCFreezableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class JSCFreezable__factory extends ContractFactory {
  constructor(...args: JSCFreezableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        JSCFreezable__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: JSCFreezableLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$d094ecee2be569ef0d32593b6bffef0986\\$__", "g"),
      linkLibraryAddresses["libraries/JSCRevisionsLib.sol:JSCRevisionsLib"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JSCFreezable> {
    return super.deploy(overrides || {}) as Promise<JSCFreezable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): JSCFreezable {
    return super.attach(address) as JSCFreezable;
  }
  override connect(signer: Signer): JSCFreezable__factory {
    return super.connect(signer) as JSCFreezable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JSCFreezableInterface {
    return new utils.Interface(_abi) as JSCFreezableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JSCFreezable {
    return new Contract(address, _abi, signerOrProvider) as JSCFreezable;
  }
}

export interface JSCFreezableLibraryAddresses {
  ["libraries/JSCRevisionsLib.sol:JSCRevisionsLib"]: string;
}
