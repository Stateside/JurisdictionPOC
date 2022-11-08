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
  "0x61254b61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106101815760003560e01c80639f3023d2116100e2578063c140b22311610096578063da3a87ed11610070578063da3a87ed146101c8578063e381a5c614610356578063fe38eed91461037657600080fd5b8063c140b22314610303578063c440aa9a14610323578063cc5bb9951461034357600080fd5b8063b63485cc116100c7578063b63485cc146102ad578063b7d5af6e146102dd578063b8a6ad20146102f057600080fd5b80639f3023d214610290578063a8a581ea1461029857600080fd5b80636b0675be1161013957806374a83d641161011e57806374a83d641461026057806379591b7c146102755780638f4cc70c1461028857600080fd5b80636b0675be146102205780636c2f471c1461024057600080fd5b8063289833da1161016a578063289833da146101c85780633695ca2d146101ed5780636137e2441461020d57600080fd5b80630d179c5f146101865780631ff5d27e146101a8575b600080fd5b81801561019257600080fd5b506101a66101a1366004611ecd565b6103a8565b005b8180156101b457600080fd5b506101a66101c3366004611f40565b610537565b6101da6101d6366004611f75565b5490565b6040519081526020015b60405180910390f35b8180156101f957600080fd5b506101a6610208366004611f8e565b6106a2565b6101da61021b366004611fc3565b610780565b81801561022c57600080fd5b506101a661023b366004611fc3565b6107fe565b81801561024c57600080fd5b506101a661025b366004611f40565b610919565b610268610986565b6040516101e491906121cd565b6101a66102833660046121f7565b610d3b565b610268610ddb565b610268611177565b6102a061152a565b6040516101e4919061222a565b8180156102b957600080fd5b506102cd6102c836600461228c565b6115d4565b60405190151581526020016101e4565b6101a66102eb366004611fc3565b611744565b6101da6102fe366004611fc3565b6117b1565b81801561030f57600080fd5b506101a661031e366004612308565b61182c565b81801561032f57600080fd5b506101a661033e366004611fc3565b6119d4565b6101a6610351366004612334565b611a5c565b81801561036257600080fd5b506101a6610371366004612360565b611b2a565b6102cd610384366004611fc3565b600090815260049190910160205260409020600101546001600160a01b0316151590565b6001600160a01b0383166104035760405162461bcd60e51b815260206004820152601860248201527f6d696e7420746f20746865207a65726f2061646472657373000000000000000060448201526064015b60405180910390fd5b6001600160a01b0383166000908152600585016020526040902061042790826119d4565b60008181526004850160209081526040909120835161044892850190611c8e565b50600081815260048501602052604080822060010180546001600160a01b0319166001600160a01b03871690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a46104bf60008483604051806020016040528060008152506115d4565b6105315760405162461bcd60e51b815260206004820152602a60248201527f7472616e7366657220746f206e6f6e204552433732315265636569766572206960448201527f6d706c656d656e7465720000000000000000000000000000000000000000000060648201526084016103fa565b50505050565b600081116105875760405162461bcd60e51b815260206004820152601760248201527f416d6f756e74206d757374206e6f74206265207a65726f00000000000000000060448201526064016103fa565b604080516060810182526001600160a01b038416808252602080830185905242838501526000918252600187019052919091205415610646576001600160a01b03831660009081526001808601602052604090912054829186916105eb91906123b5565b815481106105fb576105fb6123da565b600091825260209182902083516003929092020180546001600160a01b0319166001600160a01b03909216919091178155908201516001820155604090910151600290910155610531565b83546001808201865560008681526020808220855160039095020180546001600160a01b0319166001600160a01b0395861617815585820151818501556040958601516002909101558754969093168152950190529092205550565b6001600160a01b038116600090815260058401602052604090206106c690836107fe565b60008281526004840160205260408120906106e18282611d12565b6001820180546001600160a01b03191690556002820180547fffffffffffffffffffffff00000000000000000000000000000000000000000016905560038201600061072d8282611d4f565b505060058201600061073f8282611d4f565b5050604051849250600091506001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4505050565b815460009082106107d35760405162461bcd60e51b815260206004820152601360248201527f696e646578206f7574206f6620626f756e64730000000000000000000000000060448201526064016103fa565b8260000182815481106107e8576107e86123da565b9060005260206000209060030201905092915050565b600081815260018301602052604090205461085b5760405162461bcd60e51b815260206004820152601660248201527f546f6b656e496420646f6573206e6f742065786973740000000000000000000060448201526064016103fa565b8154600082815260018401602052604090205410156108db5781548290610884906001906123b5565b81548110610894576108946123da565b6000918252602080832090910154838352600180860190925260409092205484916108be916123b5565b815481106108ce576108ce6123da565b6000918252602090912001555b81548290806108ec576108ec6123f0565b60008281526020808220830160001990810183905590920190925591815260019290920190526040812055565b60008181526004840160205260408082206002810180546001600160a01b0319166001600160a01b038781169182179092556001830154935192948694919391909216917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a450505050565b61098e611d70565b60408051600280825260608201909252600091816020015b60608152602001906001900390816109a65790505090506040518060400160405280600581526020017f6f776e657200000000000000000000000000000000000000000000000000000081525081600081518110610a0657610a066123da565b602002602001018190525060405180604001604052806006815260200165667265657a6560d01b81525081600181518110610a4357610a436123da565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600081600081518110610a8857610a886123da565b60200260200101906003811115610aa157610aa1612087565b90816003811115610ab457610ab4612087565b81525050600181600181518110610acd57610acd6123da565b60200260200101906003811115610ae657610ae6612087565b90816003811115610af957610af9612087565b90525060408051600280825260608201909252600091816020015b6060815260200190600190039081610b145790505090506040518060400160405280601981526020017f41646472657373206f662073656c6563746564206f776e65720000000000000081525081600081518110610b7457610b746123da565b60200260200101819052506040518060400160405280600d81526020017f467265657a65206f776e65723f0000000000000000000000000000000000000081525081600181518110610bc857610bc86123da565b602090810291909101015260408051600280825260608201909252600091816020015b6060815260200190600190039081610beb57905050905060405180604001604052806008815260200167129d591a58da585b60c21b81525081600081518110610c3657610c366123da565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b81525081600181518110610c7557610c756123da565b60200260200101819052506040518060c001604052806040518060400160405280600b81526020017f467265657a654f776e657200000000000000000000000000000000000000000081525081526020016040518060600160405280602381526020016124f36023913981526020018581526020018481526020018381526020016040518060a00160405280600061ffff168152602001600061ffff168152602001600060ff168152602001600060ff1681526020018481525081525094505050505090565b6001600160a01b038216600090815260078401602052604090205460ff161515811580159190911490610d86576040518060600160405280602181526020016124d260219139610dbd565b6040518060400160405280601d81526020017f746f6b656e206f776e6572206163636f756e742069732066726f7a656e0000008152505b906105315760405162461bcd60e51b81526004016103fa9190612406565b610de3611d70565b60408051600280825260608201909252600091816020015b6060815260200190600190039081610dfb579050509050604051806040016040528060058152602001643a37b5b2b760d91b81525081600081518110610e4357610e436123da565b602002602001018190525060405180604001604052806006815260200165667265657a6560d01b81525081600181518110610e8057610e806123da565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600281600081518110610ec557610ec56123da565b60200260200101906003811115610ede57610ede612087565b90816003811115610ef157610ef1612087565b81525050600181600181518110610f0a57610f0a6123da565b60200260200101906003811115610f2357610f23612087565b90816003811115610f3657610f36612087565b90525060408051600280825260608201909252600091816020015b6060815260200190600190039081610f515790505090506040518060400160405280601481526020017f4944206f662073656c656374656420746f6b656e00000000000000000000000081525081600081518110610fb157610fb16123da565b60200260200101819052506040518060400160405280600d81526020017f467265657a6520746f6b656e3f0000000000000000000000000000000000000081525081600181518110611005576110056123da565b602090810291909101015260408051600280825260608201909252600091816020015b606081526020019060019003908161102857905050905060405180604001604052806008815260200167129d591a58da585b60c21b81525081600081518110611073576110736123da565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b815250816001815181106110b2576110b26123da565b6020908102919091018101919091526040805161010081018252600b60c082019081527f467265657a65546f6b656e00000000000000000000000000000000000000000060e0830152815281518083018352601a81527f467265657a65206f7220756e667265657a65206120746f6b656e000000000000818501528184015280820196909652606080870195909552608080870194909452805160a0818101835260008083529382018490529181018390529485019190915291830152820152919050565b61117f611d70565b60408051600280825260608201909252600091816020015b6060815260200190600190039081611197579050509050604051806040016040528060058152602001643a37b5b2b760d91b815250816000815181106111df576111df6123da565b60200260200101819052506040518060400160405280600881526020017f6e65774f776e657200000000000000000000000000000000000000000000000081525081600181518110611233576112336123da565b602090810291909101015260408051600280825260608201909252600091816020016020820280368337019050509050600281600081518110611278576112786123da565b6020026020010190600381111561129157611291612087565b908160038111156112a4576112a4612087565b815250506000816001815181106112bd576112bd6123da565b602002602001019060038111156112d6576112d6612087565b908160038111156112e9576112e9612087565b90525060408051600280825260608201909252600091816020015b60608152602001906001900390816113045790505090506040518060400160405280601481526020017f4944206f662073656c656374656420746f6b656e00000000000000000000000081525081600081518110611364576113646123da565b60200260200101819052506040518060400160405280601481526020017f41646472657373206f66206e6577206f776e6572000000000000000000000000815250816001815181106113b8576113b86123da565b602090810291909101015260408051600280825260608201909252600091816020015b60608152602001906001900390816113db57905050905060405180604001604052806008815260200167129d591a58da585b60c21b81525081600081518110611426576114266123da565b602002602001018190525060405180604001604052806008815260200167129d591a58da585b60c21b81525081600181518110611465576114656123da565b6020908102919091018101919091526040805161010081018252600b60c082019081527f4368616e67654f776e657200000000000000000000000000000000000000000060e0830152815281518083018352601b81527f4368616e676520746865206f776e6572206f66206120746f6b656e0000000000818501528184015280820196909652606080870195909552608080870194909452805160a0818101835260008083529382018490529181018390529485019190915291830152820152919050565b60408051600380825260808201909252606091816020015b61154a611d70565b815260200190600190039081611542579050509050611567611177565b8160008151811061157a5761157a6123da565b602002602001018190525061158d610ddb565b816001815181106115a0576115a06123da565b60200260200101819052506115b3610986565b816002815181106115c6576115c66123da565b602002602001018190525090565b60006001600160a01b0384163b1561173857604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611618903390899088908890600401612419565b6020604051808303816000875af1925050508015611653575060408051601f3d908101601f1916820190925261165091810190612455565b60015b611706573d808015611681576040519150601f19603f3d011682016040523d82523d6000602084013e611686565b606091505b5080516000036116fe5760405162461bcd60e51b815260206004820152603460248201527f617474656d70746564207472616e7366657220746f206e6f6e2045524337323160448201527f526563656976657220696d706c656d656e74657200000000000000000000000060648201526084016103fa565b805181602001fd5b7fffffffff0000000000000000000000000000000000000000000000000000000016630a85bd0160e11b14905061173c565b5060015b949350505050565b60008181526004830160205260409020600101546001600160a01b03166117ad5760405162461bcd60e51b815260206004820152601060248201527f696e76616c696420746f6b656e2049440000000000000000000000000000000060448201526064016103fa565b5050565b815460009082106118045760405162461bcd60e51b815260206004820152601360248201527f696e646578206f7574206f6620626f756e64730000000000000000000000000060448201526064016103fa565b826000018281548110611819576118196123da565b9060005260206000200154905092915050565b6001600160a01b03811660009081526001830160205260409020546118935760405162461bcd60e51b815260206004820152600e60248201527f4e6f206f6666657220666f756e6400000000000000000000000000000000000060448201526064016103fa565b81546001600160a01b0382166000908152600184016020526040902054101561196f57815482906118c6906001906123b5565b815481106118d6576118d66123da565b9060005260206000209060030201826000016001846001016000856001600160a01b03166001600160a01b031681526020019081526020016000205461191c91906123b5565b8154811061192c5761192c6123da565b60009182526020909120825460039092020180546001600160a01b0319166001600160a01b03909216919091178155600180830154908201556002918201549101555b8154829080611980576119806123f0565b6000828152602080822060036000199094019384020180546001600160a01b031916815560018181018490556002909101839055929093556001600160a01b03939093168352929092019091526040812055565b600081815260018301602052604090205415611a325760405162461bcd60e51b815260206004820152601660248201527f546f6b656e496420616c7265616479206578697374730000000000000000000060448201526064016103fa565b81546001818101845560008481526020808220909301849055845493815293019052604090912055565b600082815260048401602052604090206002015460ff74010000000000000000000000000000000000000000909104161515811580159190911490611ad6576040518060400160405280601381526020017f746f6b656e206973206e6f742066726f7a656e00000000000000000000000000815250610dbd565b6040518060400160405280600f81526020017f746f6b656e2069732066726f7a656e0000000000000000000000000000000000815250906105315760405162461bcd60e51b81526004016103fa9190612406565b6001600160a01b038216611b805760405162461bcd60e51b815260206004820152601c60248201527f7472616e7366657220746f20746865207a65726f20616464726573730000000060448201526064016103fa565b336001600160a01b03851614611bb457611b9c85826000611a5c565b611ba885846000610d3b565b611bb485836000610d3b565b6001600160a01b03831660009081526005860160205260409020611bd890826107fe565b6001600160a01b03821660009081526005860160205260409020611bfc90826119d4565b600081815260048601602052604090206001810180546001600160a01b0319166001600160a01b03858116919091179091556002909101541615611c4657611c4685600083610919565b80826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b828054611c9a90612497565b90600052602060002090601f016020900481019282611cbc5760008555611d02565b82601f10611cd557805160ff1916838001178555611d02565b82800160010185558215611d02579182015b82811115611d02578251825591602001919060010190611ce7565b50611d0e929150611de3565b5090565b508054611d1e90612497565b6000825580601f10611d2e575050565b601f016020900490600052602060002090810190611d4c9190611de3565b50565b5080546000825560030290600052602060002090810190611d4c9190611df8565b6040518060c001604052806060815260200160608152602001606081526020016060815260200160608152602001611dde6040518060a00160405280600061ffff168152602001600061ffff168152602001600060ff168152602001600060ff168152602001606081525090565b905290565b5b80821115611d0e5760008155600101611de4565b5b80821115611d0e5780546001600160a01b03191681556000600182018190556002820155600301611df9565b80356001600160a01b0381168114611e3c57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611e7257611e72611e41565b604051601f8501601f19908116603f01168101908282118183101715611e9a57611e9a611e41565b81604052809350858152868686011115611eb357600080fd5b858560208301376000602087830101525050509392505050565b60008060008060808587031215611ee357600080fd5b84359350611ef360208601611e25565b9250604085013567ffffffffffffffff811115611f0f57600080fd5b8501601f81018713611f2057600080fd5b611f2f87823560208401611e57565b949793965093946060013593505050565b600080600060608486031215611f5557600080fd5b83359250611f6560208501611e25565b9150604084013590509250925092565b600060208284031215611f8757600080fd5b5035919050565b600080600060608486031215611fa357600080fd5b8335925060208401359150611fba60408501611e25565b90509250925092565b60008060408385031215611fd657600080fd5b50508035926020909101359150565b6000815180845260005b8181101561200b57602081850181015186830182015201611fef565b8181111561201d576000602083870101525b50601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b8581101561207a578284038952612068848351611fe5565b98850198935090840190600101612050565b5091979650505050505050565b634e487b7160e01b600052602160045260246000fd5b600061ffff8083511684528060208401511660208501525060ff604083015116604084015260ff6060830151166060840152608082015160a0608085015261173c60a0850182612032565b6000815160c084526120fd60c0850182611fe5565b9050602080840151858303828701526121168382611fe5565b925050604084015185830360408701526121308382612032565b60608681015188830391890191909152805180835290840194506000925090830190825b8181101561218d578551600480821061217a57634e487b7160e01b865260218152602486fd5b5083529484019491840191600101612154565b50506080860151935086810360808801526121a88185612032565b935050505060a083015184820360a08601526121c4828261209d565b95945050505050565b6020815260006121e060208301846120e8565b9392505050565b80358015158114611e3c57600080fd5b60008060006060848603121561220c57600080fd5b8335925061221c60208501611e25565b9150611fba604085016121e7565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561227f57603f1988860301845261226d8583516120e8565b94509285019290850190600101612251565b5092979650505050505050565b600080600080608085870312156122a257600080fd5b6122ab85611e25565b93506122b960208601611e25565b925060408501359150606085013567ffffffffffffffff8111156122dc57600080fd5b8501601f810187136122ed57600080fd5b6122fc87823560208401611e57565b91505092959194509250565b6000806040838503121561231b57600080fd5b8235915061232b60208401611e25565b90509250929050565b60008060006060848603121561234957600080fd5b8335925060208401359150611fba604085016121e7565b600080600080600060a0868803121561237857600080fd5b8535945061238860208701611e25565b935061239660408701611e25565b92506123a460608701611e25565b949793965091946080013592915050565b6000828210156123d557634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6020815260006121e06020830184611fe5565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261244b6080830184611fe5565b9695505050505050565b60006020828403121561246757600080fd5b81517fffffffff00000000000000000000000000000000000000000000000000000000811681146121e057600080fd5b600181811c908216806124ab57607f821691505b6020821081036124cb57634e487b7160e01b600052602260045260246000fd5b5091905056fe746f6b656e206f776e6572206163636f756e74206973206e6f742066726f7a656e467265657a65206f7220756e667265657a6520612070726f7065727479206f776e6572a2646970667358221220b7d7ef9b26187fd85c600c60e28e76775686d35b9eccf95e9e36e01265c3f04564736f6c634300080d0033";

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