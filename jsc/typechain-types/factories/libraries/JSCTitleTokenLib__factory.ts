/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  JSCTitleTokenLib,
  JSCTitleTokenLibInterface,
} from "../../libraries/JSCTitleTokenLib";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "getChangeOwnerRevision",
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
            type: "JSCRevisionsLib.ParamType[]",
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
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getFreezeOwnerRevision",
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
            type: "JSCRevisionsLib.ParamType[]",
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
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getFreezeTokenRevision",
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
            type: "JSCRevisionsLib.ParamType[]",
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
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getRevisions",
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
            type: "JSCRevisionsLib.ParamType[]",
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
        internalType: "struct JSCRevisionsLib.Revision[]",
        name: "result",
        type: "tuple[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x6125ec61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061018c5760003560e01c8063a385a939116100e2578063c140b22311610096578063da3a87ed11610070578063da3a87ed146101d3578063e381a5c614610374578063fe38eed91461039457600080fd5b8063c140b22314610321578063c440aa9a14610341578063cc5bb9951461036157600080fd5b8063b63485cc116100c7578063b63485cc146102cb578063b7d5af6e146102fb578063b8a6ad201461030e57600080fd5b8063a385a939146102a3578063a8a581ea146102b657600080fd5b80636b0675be1161014457806379591b7c1161011e57806379591b7c146102805780638f4cc70c146102935780639f3023d21461029b57600080fd5b80636b0675be1461022b5780636c2f471c1461024b57806374a83d641461026b57600080fd5b8063289833da11610175578063289833da146101d35780633695ca2d146101f85780636137e2441461021857600080fd5b80630d179c5f146101915780631ff5d27e146101b3575b600080fd5b81801561019d57600080fd5b506101b16101ac366004611ed6565b6103c6565b005b8180156101bf57600080fd5b506101b16101ce366004611f49565b610562565b6101e56101e1366004611f7e565b5490565b6040519081526020015b60405180910390f35b81801561020457600080fd5b506101b1610213366004611f97565b6106cd565b6101e5610226366004611fcc565b6107b8565b81801561023757600080fd5b506101b1610246366004611fcc565b610836565b81801561025757600080fd5b506101b1610266366004611f49565b610951565b6102736109be565b6040516101ef91906121d6565b6101b161028e366004612200565b610d76565b610273610e16565b610273611188565b6101e56102b1366004611fcc565b611511565b6102be611533565b6040516101ef9190612233565b8180156102d757600080fd5b506102eb6102e6366004612295565b6115dd565b60405190151581526020016101ef565b6101b1610309366004611fcc565b61174d565b6101e561031c366004611fcc565b6117ba565b81801561032d57600080fd5b506101b161033c366004612311565b611835565b81801561034d57600080fd5b506101b161035c366004611fcc565b6119dd565b6101b161036f36600461233d565b611a65565b81801561038057600080fd5b506101b161038f366004612369565b611b33565b6102eb6103a2366004611fcc565b600090815260049190910160205260409020600101546001600160a01b0316151590565b6001600160a01b0383166104215760405162461bcd60e51b815260206004820152601860248201527f6d696e7420746f20746865207a65726f2061646472657373000000000000000060448201526064015b60405180910390fd5b6001600160a01b0383166000908152600785016020526040902061044590826119dd565b61045284600501826119dd565b60008181526004850160209081526040909120835161047392850190611c97565b50600081815260048501602052604080822060010180546001600160a01b0319166001600160a01b03871690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a46104ea60008483604051806020016040528060008152506115dd565b61055c5760405162461bcd60e51b815260206004820152602a60248201527f7472616e7366657220746f206e6f6e204552433732315265636569766572206960448201527f6d706c656d656e746572000000000000000000000000000000000000000000006064820152608401610418565b50505050565b600081116105b25760405162461bcd60e51b815260206004820152601760248201527f416d6f756e74206d757374206e6f74206265207a65726f0000000000000000006044820152606401610418565b604080516060810182526001600160a01b038416808252602080830185905242838501526000918252600187019052919091205415610671576001600160a01b038316600090815260018086016020526040909120548291869161061691906123d4565b81548110610626576106266123eb565b600091825260209182902083516003929092020180546001600160a01b0319166001600160a01b0390921691909117815590820151600182015560409091015160029091015561055c565b83546001808201865560008681526020808220855160039095020180546001600160a01b0319166001600160a01b0395861617815585820151818501556040958601516002909101558754969093168152950190529092205550565b6001600160a01b038116600090815260078401602052604090206106f19083610836565b6106fe8360050183610836565b60008281526004840160205260408120906107198282611d1b565b6001820180546001600160a01b03191690556002820180547fffffffffffffffffffffff0000000000000000000000000000000000000000001690556003820160006107658282611d58565b50506005820160006107778282611d58565b5050604051849250600091506001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4505050565b8154600090821061080b5760405162461bcd60e51b815260206004820152601360248201527f696e646578206f7574206f6620626f756e6473000000000000000000000000006044820152606401610418565b826000018281548110610820576108206123eb565b9060005260206000209060030201905092915050565b60008181526001830160205260409020546108935760405162461bcd60e51b815260206004820152601660248201527f546f6b656e496420646f6573206e6f74206578697374000000000000000000006044820152606401610418565b81546000828152600184016020526040902054101561091357815482906108bc906001906123d4565b815481106108cc576108cc6123eb565b6000918252602080832090910154838352600180860190925260409092205484916108f6916123d4565b81548110610906576109066123eb565b6000918252602090912001555b815482908061092457610924612401565b60008281526020808220830160001990810183905590920190925591815260019290920190526040812055565b60008181526004840160205260408082206002810180546001600160a01b0319166001600160a01b038781169182179092556001830154935192948694919391909216917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a450505050565b6109c6611d79565b60408051600280825260608201909252600091816020015b60608152602001906001900390816109de5790505090506040518060400160405280600581526020017f6f776e657200000000000000000000000000000000000000000000000000000081525081600081518110610a3e57610a3e6123eb565b602002602001018190525060405180604001604052806006815260200165667265657a6560d01b81525081600181518110610a7b57610a7b6123eb565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600081600081518110610ac057610ac06123eb565b60200260200101906003811115610ad957610ad9612090565b90816003811115610aec57610aec612090565b81525050600181600181518110610b0557610b056123eb565b60200260200101906003811115610b1e57610b1e612090565b90816003811115610b3157610b31612090565b90525060408051600280825260608201909252600091816020015b6060815260200190600190039081610b4c5790505090506040518060400160405280601981526020017f41646472657373206f662073656c6563746564206f776e65720000000000000081525081600081518110610bac57610bac6123eb565b60200260200101819052506040518060400160405280600d81526020017f467265657a65206f776e65723f0000000000000000000000000000000000000081525081600181518110610c0057610c006123eb565b602090810291909101015260408051600280825260608201909252600091816020015b6060815260200190600190039081610c2357905050905060405180604001604052806008815260200167129d591a58da585b60c21b81525081600081518110610c6e57610c6e6123eb565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b81525081600181518110610cad57610cad6123eb565b60200260200101819052506040518060c001604052806040518060400160405280600b81526020017f467265657a654f776e657200000000000000000000000000000000000000000081525081526020016040518060600160405280602d815260200161258a602d913981526020018581526020018481526020018381526020016040518060a00160405280611c206007610d489190612417565b61ffff1681526000602082015260336040820181905260608201526080019390935291909152949350505050565b6001600160a01b038216600090815260098401602052604090205460ff161515811580159190911490610dc15760405180606001604052806021815260200161253a60219139610df8565b6040518060400160405280601d81526020017f746f6b656e206f776e6572206163636f756e742069732066726f7a656e0000008152505b9061055c5760405162461bcd60e51b81526004016104189190612441565b610e1e611d79565b60408051600280825260608201909252600091816020015b6060815260200190600190039081610e36579050509050604051806040016040528060058152602001643a37b5b2b760d91b81525081600081518110610e7e57610e7e6123eb565b602002602001018190525060405180604001604052806006815260200165667265657a6560d01b81525081600181518110610ebb57610ebb6123eb565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600281600081518110610f0057610f006123eb565b60200260200101906003811115610f1957610f19612090565b90816003811115610f2c57610f2c612090565b81525050600181600181518110610f4557610f456123eb565b60200260200101906003811115610f5e57610f5e612090565b90816003811115610f7157610f71612090565b90525060408051600280825260608201909252600091816020015b6060815260200190600190039081610f8c5790505090506040518060400160405280601481526020017f4944206f662073656c656374656420746f6b656e00000000000000000000000081525081600081518110610fec57610fec6123eb565b60200260200101819052506040518060400160405280600d81526020017f467265657a6520746f6b656e3f0000000000000000000000000000000000000081525081600181518110611040576110406123eb565b602090810291909101015260408051600280825260608201909252600091816020015b606081526020019060019003908161106357905050905060405180604001604052806008815260200167129d591a58da585b60c21b815250816000815181106110ae576110ae6123eb565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b815250816001815181106110ed576110ed6123eb565b60200260200101819052506040518060c001604052806040518060400160405280600b81526020017f467265657a65546f6b656e00000000000000000000000000000000000000000081525081526020016040518060600160405280602d815260200161250d602d913981526020018581526020018481526020018381526020016040518060a00160405280611c206007610d489190612417565b611190611d79565b60408051600280825260608201909252600091816020015b60608152602001906001900390816111a8579050509050604051806040016040528060058152602001643a37b5b2b760d91b815250816000815181106111f0576111f06123eb565b60200260200101819052506040518060400160405280600881526020017f6e65774f776e657200000000000000000000000000000000000000000000000081525081600181518110611244576112446123eb565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600281600081518110611289576112896123eb565b602002602001019060038111156112a2576112a2612090565b908160038111156112b5576112b5612090565b815250506000816001815181106112ce576112ce6123eb565b602002602001019060038111156112e7576112e7612090565b908160038111156112fa576112fa612090565b90525060408051600280825260608201909252600091816020015b60608152602001906001900390816113155790505090506040518060400160405280601481526020017f4944206f662073656c656374656420746f6b656e00000000000000000000000081525081600081518110611375576113756123eb565b60200260200101819052506040518060400160405280601481526020017f41646472657373206f66206e6577206f776e6572000000000000000000000000815250816001815181106113c9576113c96123eb565b602090810291909101015260408051600280825260608201909252600091816020015b60608152602001906001900390816113ec57905050905060405180604001604052806008815260200167129d591a58da585b60c21b81525081600081518110611437576114376123eb565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b81525081600181518110611476576114766123eb565b60200260200101819052506040518060c001604052806040518060400160405280600b81526020017f4368616e67654f776e657200000000000000000000000000000000000000000081525081526020016040518060600160405280602f815260200161255b602f913981526020018581526020018481526020018381526020016040518060a00160405280611c206007610d489190612417565b600061151d838361174d565b5060009081526004919091016020526040902090565b60408051600380825260808201909252606091816020015b611553611d79565b81526020019060019003908161154b579050509050611570611188565b81600081518110611583576115836123eb565b6020026020010181905250611596610e16565b816001815181106115a9576115a96123eb565b60200260200101819052506115bc6109be565b816002815181106115cf576115cf6123eb565b602002602001018190525090565b60006001600160a01b0384163b1561174157604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611621903390899088908890600401612454565b6020604051808303816000875af192505050801561165c575060408051601f3d908101601f1916820190925261165991810190612490565b60015b61170f573d80801561168a576040519150601f19603f3d011682016040523d82523d6000602084013e61168f565b606091505b5080516000036117075760405162461bcd60e51b815260206004820152603460248201527f617474656d70746564207472616e7366657220746f206e6f6e2045524337323160448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610418565b805181602001fd5b7fffffffff0000000000000000000000000000000000000000000000000000000016630a85bd0160e11b149050611745565b5060015b949350505050565b60008181526004830160205260409020600101546001600160a01b03166117b65760405162461bcd60e51b815260206004820152601060248201527f696e76616c696420746f6b656e204944000000000000000000000000000000006044820152606401610418565b5050565b8154600090821061180d5760405162461bcd60e51b815260206004820152601360248201527f696e646578206f7574206f6620626f756e6473000000000000000000000000006044820152606401610418565b826000018281548110611822576118226123eb565b9060005260206000200154905092915050565b6001600160a01b038116600090815260018301602052604090205461189c5760405162461bcd60e51b815260206004820152600e60248201527f4e6f206f6666657220666f756e640000000000000000000000000000000000006044820152606401610418565b81546001600160a01b0382166000908152600184016020526040902054101561197857815482906118cf906001906123d4565b815481106118df576118df6123eb565b9060005260206000209060030201826000016001846001016000856001600160a01b03166001600160a01b031681526020019081526020016000205461192591906123d4565b81548110611935576119356123eb565b60009182526020909120825460039092020180546001600160a01b0319166001600160a01b03909216919091178155600180830154908201556002918201549101555b815482908061198957611989612401565b6000828152602080822060036000199094019384020180546001600160a01b031916815560018181018490556002909101839055929093556001600160a01b03939093168352929092019091526040812055565b600081815260018301602052604090205415611a3b5760405162461bcd60e51b815260206004820152601660248201527f546f6b656e496420616c726561647920657869737473000000000000000000006044820152606401610418565b81546001818101845560008481526020808220909301849055845493815293019052604090912055565b600082815260048401602052604090206002015460ff74010000000000000000000000000000000000000000909104161515811580159190911490611adf576040518060400160405280601381526020017f746f6b656e206973206e6f742066726f7a656e00000000000000000000000000815250610df8565b6040518060400160405280600f81526020017f746f6b656e2069732066726f7a656e00000000000000000000000000000000008152509061055c5760405162461bcd60e51b81526004016104189190612441565b6001600160a01b038216611b895760405162461bcd60e51b815260206004820152601c60248201527f7472616e7366657220746f20746865207a65726f2061646472657373000000006044820152606401610418565b336001600160a01b03851614611bbd57611ba585826000611a65565b611bb185846000610d76565b611bbd85836000610d76565b6001600160a01b03831660009081526007860160205260409020611be19082610836565b6001600160a01b03821660009081526007860160205260409020611c0590826119dd565b600081815260048601602052604090206001810180546001600160a01b0319166001600160a01b03858116919091179091556002909101541615611c4f57611c4f85600083610951565b80826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b828054611ca3906124d2565b90600052602060002090601f016020900481019282611cc55760008555611d0b565b82601f10611cde57805160ff1916838001178555611d0b565b82800160010185558215611d0b579182015b82811115611d0b578251825591602001919060010190611cf0565b50611d17929150611dec565b5090565b508054611d27906124d2565b6000825580601f10611d37575050565b601f016020900490600052602060002090810190611d559190611dec565b50565b5080546000825560030290600052602060002090810190611d559190611e01565b6040518060c001604052806060815260200160608152602001606081526020016060815260200160608152602001611de76040518060a00160405280600061ffff168152602001600061ffff168152602001600060ff168152602001600060ff168152602001606081525090565b905290565b5b80821115611d175760008155600101611ded565b5b80821115611d175780546001600160a01b03191681556000600182018190556002820155600301611e02565b80356001600160a01b0381168114611e4557600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611e7b57611e7b611e4a565b604051601f8501601f19908116603f01168101908282118183101715611ea357611ea3611e4a565b81604052809350858152868686011115611ebc57600080fd5b858560208301376000602087830101525050509392505050565b60008060008060808587031215611eec57600080fd5b84359350611efc60208601611e2e565b9250604085013567ffffffffffffffff811115611f1857600080fd5b8501601f81018713611f2957600080fd5b611f3887823560208401611e60565b949793965093946060013593505050565b600080600060608486031215611f5e57600080fd5b83359250611f6e60208501611e2e565b9150604084013590509250925092565b600060208284031215611f9057600080fd5b5035919050565b600080600060608486031215611fac57600080fd5b8335925060208401359150611fc360408501611e2e565b90509250925092565b60008060408385031215611fdf57600080fd5b50508035926020909101359150565b6000815180845260005b8181101561201457602081850181015186830182015201611ff8565b81811115612026576000602083870101525b50601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b85811015612083578284038952612071848351611fee565b98850198935090840190600101612059565b5091979650505050505050565b634e487b7160e01b600052602160045260246000fd5b600061ffff8083511684528060208401511660208501525060ff604083015116604084015260ff6060830151166060840152608082015160a0608085015261174560a085018261203b565b6000815160c0845261210660c0850182611fee565b90506020808401518583038287015261211f8382611fee565b92505060408401518583036040870152612139838261203b565b60608681015188830391890191909152805180835290840194506000925090830190825b81811015612196578551600480821061218357634e487b7160e01b865260218152602486fd5b508352948401949184019160010161215d565b50506080860151935086810360808801526121b1818561203b565b935050505060a083015184820360a08601526121cd82826120a6565b95945050505050565b6020815260006121e960208301846120f1565b9392505050565b80358015158114611e4557600080fd5b60008060006060848603121561221557600080fd5b8335925061222560208501611e2e565b9150611fc3604085016121f0565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561228857603f198886030184526122768583516120f1565b9450928501929085019060010161225a565b5092979650505050505050565b600080600080608085870312156122ab57600080fd5b6122b485611e2e565b93506122c260208601611e2e565b925060408501359150606085013567ffffffffffffffff8111156122e557600080fd5b8501601f810187136122f657600080fd5b61230587823560208401611e60565b91505092959194509250565b6000806040838503121561232457600080fd5b8235915061233460208401611e2e565b90509250929050565b60008060006060848603121561235257600080fd5b8335925060208401359150611fc3604085016121f0565b600080600080600060a0868803121561238157600080fd5b8535945061239160208701611e2e565b935061239f60408701611e2e565b92506123ad60608701611e2e565b949793965091946080013592915050565b634e487b7160e01b600052601160045260246000fd5b6000828210156123e6576123e66123be565b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b600061ffff80831681851681830481118215151615612438576124386123be565b02949350505050565b6020815260006121e96020830184611fee565b60006001600160a01b038087168352808616602084015250836040830152608060608301526124866080830184611fee565b9695505050505050565b6000602082840312156124a257600080fd5b81517fffffffff00000000000000000000000000000000000000000000000000000000811681146121e957600080fd5b600181811c908216806124e657607f821691505b60208210810361250657634e487b7160e01b600052602260045260246000fd5b5091905056fe5365742066726f7a656e207374617465206f6620746f6b656e207b746f6b656e7d20746f207b667265657a657d746f6b656e206f776e6572206163636f756e74206973206e6f742066726f7a656e4368616e676520746865206f776e6572206f6620746f6b656e207b746f6b656e7d20746f207b6e65774f776e65727d5365742066726f7a656e207374617465206f66206f776e6572207b6f776e65727d20746f207b667265657a657da2646970667358221220edc357cfa11f89f24af459b099fb97fdaebd28582423ddfbcda7fe0bdd61403d64736f6c634300080d0033";

type JSCTitleTokenLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JSCTitleTokenLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class JSCTitleTokenLib__factory extends ContractFactory {
  constructor(...args: JSCTitleTokenLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JSCTitleTokenLib> {
    return super.deploy(overrides || {}) as Promise<JSCTitleTokenLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): JSCTitleTokenLib {
    return super.attach(address) as JSCTitleTokenLib;
  }
  override connect(signer: Signer): JSCTitleTokenLib__factory {
    return super.connect(signer) as JSCTitleTokenLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JSCTitleTokenLibInterface {
    return new utils.Interface(_abi) as JSCTitleTokenLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JSCTitleTokenLib {
    return new Contract(address, _abi, signerOrProvider) as JSCTitleTokenLib;
  }
}
