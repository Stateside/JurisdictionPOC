/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  JSCRevisionsLib,
  JSCRevisionsLibInterface,
} from "../../libraries/JSCRevisionsLib";

const _abi = [
  {
    inputs: [
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
            name: "quorumPercentage",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "majority",
            type: "uint8",
          },
          {
            internalType: "string[]",
            name: "roles",
            type: "string[]",
          },
        ],
        internalType: "struct JSCRevisionsLib.VotingRules",
        name: "r",
        type: "tuple",
      },
    ],
    name: "checkVotingRules",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x61156f61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100ad5760003560e01c8063a1dce55411610080578063af0e61ec11610065578063af0e61ec14610171578063c776d8a31461018a578063f76eafc11461019d57600080fd5b8063a1dce5541461013d578063acf264e51461015e57600080fd5b8063446884f6146100b257806354b8f842146100d45780636b0ad69c146100f45780639171872e1461011c575b600080fd5b8180156100be57600080fd5b506100d26100cd366004610c34565b6101b0565b005b8180156100e057600080fd5b506100d26100ef366004610c82565b61049e565b610107610102366004610c82565b61062c565b60405190151581526020015b60405180910390f35b61012f61012a366004610cfe565b61065d565b604051908152602001610113565b61015061014b366004610d17565b610670565b604051610113929190610d69565b6100d261016c366004610da4565b6107ac565b61010761017f366004610d17565b600191909101541190565b61012f610198366004610d17565b61098a565b61012f6101ab366004610c82565b6109fb565b60006101bc8280610ddf565b9050116102105760405162461bcd60e51b815260206004820152601560248201527f4d697373696e67207265766973696f6e206e616d65000000000000000000000060448201526064015b60405180910390fd5b8161021b8280610ddf565b604051610229929190610e2d565b90815260405190819003602001902054156102ac5760405162461bcd60e51b815260206004820152602660248201527f5265766973696f6e20776974682073616d65206e616d6520616c72656164792060448201527f65786973747300000000000000000000000000000000000000000000000000006064820152608401610207565b6102b96060820182610e3d565b90506102c86040830183610e3d565b9050146103175760405162461bcd60e51b815260206004820152601b60248201527f496e636f6e73697374656e7420706172616d65746572206461746100000000006044820152606401610207565b6103246080820182610e3d565b90506103336040830183610e3d565b9050146103825760405162461bcd60e51b815260206004820152601b60248201527f496e636f6e73697374656e7420706172616d65746572206461746100000000006044820152606401610207565b61039261016c60a0830183610e87565b600061039e8280610ddf565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060405192935084928692506103e791508490610ea7565b908152604051908190036020019020600101610403828261130f565b50506001808401805480830182556000919091529061042390829061148a565b6040518590610433908590610ea7565b908152604051908190036020019020556001840180548391908390811061045c5761045c6114a2565b90600052602060002090600202016000019080519060200190610480929190610b05565b50600284018054906000610493836114b8565b919050555050505050565b60008360000183836040516104b4929190610e2d565b90815260405190819003602001902054116105205760405162461bcd60e51b815260206004820152602660248201527f547279696e6720746f2072656d6f7665206e6f6e2d6578697374616e742072656044820152653b34b9b4b7b760d11b6064820152608401610207565b6000836000018383604051610536929190610e2d565b90815260405190819003602001812054915084906105579085908590610e2d565b9081526040519081900360200190206000808255600182018161057a8282610b89565b610588600183016000610b89565b610596600283016000610bc3565b6105a4600383016000610be1565b6105b2600483016000610bc3565b60058201805465ffffffffffff1916815560006105d26006850182610bc3565b5050505050506001846001016001836105eb91906114d1565b815481106105fb576105fb6114a2565b600091825260208220600291820201600101805460ff191693151593909317909255908501805491610493836114e8565b600080846000018484604051610643929190610e2d565b908152604051908190036020019020541190509392505050565b600061066a826000610aaa565b92915050565b600182015460609060009083106106c95760405162461bcd60e51b815260206004820152601060248201527f496e76616c6964206974657261746f72000000000000000000000000000000006044820152606401610207565b60008390508460010181815481106106e3576106e36114a2565b906000526020600020906002020160000180546106ff90610ecf565b80601f016020809104026020016040519081016040528092919081815260200182805461072b90610ecf565b80156107785780601f1061074d57610100808354040283529160200191610778565b820191906000526020600020905b81548152906001019060200180831161075b57829003601f168201915b5050505050925084600001836040516107919190610ea7565b90815260200160405180910390206001019150509250929050565b6107bc60408201602083016114ff565b61ffff1615806107dc57506107d7608082016060830161151c565b60ff16155b61084e5760405162461bcd60e51b815260206004820152603b60248201527f566f74696e672072756c6573206d757374206e6f74207370656369667920626f60448201527f74682061206d616a6f7269747920616e6420617070726f76616c7300000000006064820152608401610207565b61085e608082016060830161151c565b60ff16158061087f5750600061087a606083016040840161151c565b60ff16115b6108f15760405162461bcd60e51b815260206004820152602b60248201527f566f74696e6752756c657320636f6e7461696e73206d616a6f7269747920627560448201527f74206e6f2071756f72756d0000000000000000000000000000000000000000006064820152608401610207565b600061090060208301836114ff565b61ffff16118061093b575061091b60408201602083016114ff565b61ffff16158061093b5750610936608082016060830161151c565b60ff16155b6109875760405162461bcd60e51b815260206004820152601d60248201527f566f74696e67506572696f64206d757374206265206e6f6e2d7a65726f0000006044820152606401610207565b50565b600182015460009082106109e05760405162461bcd60e51b815260206004820152601060248201527f496e76616c6964206974657261746f72000000000000000000000000000000006044820152606401610207565b6109f4836109ef84600161148a565b610aaa565b9392505050565b600080846000018484604051610a12929190610e2d565b9081526040519081900360200190205411610a7e5760405162461bcd60e51b815260206004820152602660248201527f547279696e6720746f20616363657373206e6f6e2d6578697374616e742072656044820152653b34b9b4b7b760d11b6064820152608401610207565b6040518490610a909085908590610e2d565b908152602001604051809103902060010190509392505050565b60005b600183015482108015610ae85750826001018281548110610ad057610ad06114a2565b600091825260209091206001600290920201015460ff165b15610aff5781610af7816114b8565b925050610aad565b50919050565b828054610b1190610ecf565b90600052602060002090601f016020900481019282610b335760008555610b79565b82601f10610b4c57805160ff1916838001178555610b79565b82800160010185558215610b79579182015b82811115610b79578251825591602001919060010190610b5e565b50610b85929150610c02565b5090565b508054610b9590610ecf565b6000825580601f10610ba5575050565b601f0160209004906000526020600020908101906109879190610c02565b50805460008255906000526020600020908101906109879190610c17565b50805460008255601f01602090049060005260206000209081019061098791905b5b80821115610b855760008155600101610c03565b80821115610b85576000610c2b8282610b89565b50600101610c17565b60008060408385031215610c4757600080fd5b82359150602083013567ffffffffffffffff811115610c6557600080fd5b830160c08186031215610c7757600080fd5b809150509250929050565b600080600060408486031215610c9757600080fd5b83359250602084013567ffffffffffffffff80821115610cb657600080fd5b818601915086601f830112610cca57600080fd5b813581811115610cd957600080fd5b876020828501011115610ceb57600080fd5b6020830194508093505050509250925092565b600060208284031215610d1057600080fd5b5035919050565b60008060408385031215610d2a57600080fd5b50508035926020909101359150565b60005b83811015610d54578181015183820152602001610d3c565b83811115610d63576000848401525b50505050565b6040815260008351806040840152610d88816060850160208801610d39565b602083019390935250601f91909101601f191601606001919050565b600060208284031215610db657600080fd5b813567ffffffffffffffff811115610dcd57600080fd5b820160a081850312156109f457600080fd5b6000808335601e19843603018112610df657600080fd5b83018035915067ffffffffffffffff821115610e1157600080fd5b602001915036819003821315610e2657600080fd5b9250929050565b8183823760009101908152919050565b6000808335601e19843603018112610e5457600080fd5b83018035915067ffffffffffffffff821115610e6f57600080fd5b6020019150600581901b3603821315610e2657600080fd5b60008235609e19833603018112610e9d57600080fd5b9190910192915050565b60008251610e9d818460208701610d39565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610ee357607f821691505b602082108103610aff57634e487b7160e01b600052602260045260246000fd5b5b81811015610f185760008155600101610f04565b5050565b601f821115610f5857806000526020600020601f840160051c81016020851015610f435750805b610f55601f850160051c830182610f03565b50505b505050565b67ffffffffffffffff831115610f7557610f75610eb9565b610f8983610f838354610ecf565b83610f1c565b6000601f841160018114610fbd5760008515610fa55750838201355b600019600387901b1c1916600186901b178355610f55565b600083815260209020601f19861690835b82811015610fee5786850135825560209485019460019092019101610fce565b508682101561100b5760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b634e487b7160e01b600052601160045260246000fd5b6801000000000000000083111561104c5761104c610eb9565b8054838255808410156110d5576000828152602081208581019083015b808210156110d15761107b8254610ecf565b80156110c557601f80821160018114611096578585556110c2565b6000858152602090206110b383850160051c820160018301610f03565b50600085815260208120818755555b50505b50600182019150611069565b5050505b5060008181526020812083915b85811015611114576110f48386610ddf565b6110ff818386610f5d565b505060209290920191600191820191016110e2565b505050505050565b600081356003811061066a57600080fd5b6003831061114b57634e487b7160e01b600052602160045260246000fd5b80548260031b60ff811b8086831b1681198416178455505050505050565b6801000000000000000083111561118257611182610eb9565b8054838255808410156111de57816000526020600020601f850160051c8101601f861680156111c8576111c881600019840180546000198360200360031b1c1681555050565b506111db601f840160051c830182610f03565b50505b506000818152602081208391805b8681101561122f576112076112008561111c565b838561112d565b60208401935060018083019250601f8311156112265792830192600092505b506001016111ec565b50505050505050565b61ffff8116811461098757600080fd5b60ff8116811461098757600080fd5b813561126281611238565b61ffff8116905081548161ffff198216178355602084013561128381611238565b63ffff00008160101b169050808363ffffffff1984161717845560408501356112ab81611248565b64ff000000008160201b168464ffffffffff1985161783171785555050505060608201356112d881611248565b815465ff00000000001916602882901b65ff000000000016178255506113016080830183610e3d565b610d63818360018601611033565b6113198283610ddf565b611324818385610f5d565b50506001602061133681850185610ddf565b6113438183868801610f5d565b5050600283016113566040860186610e3d565b6801000000000000000081111561136f5761136f610eb9565b8254818455808210156113f45760008481528581208381019083015b808210156113f05761139d8254610ecf565b80156113e657601f808211600181146113b8578585556113e3565b6000858152602090206113d483850160051c82018e8301610f03565b50600085815260208120818755555b50505b509088019061138b565b5050505b506000928352602083209282905b82811015611430576114148285610ddf565b61141f818389610f5d565b505093860193908501908601611402565b505050505050506114446060830183610e3d565b611452818360038601611169565b50506114616080830183610e3d565b61146f818360048601611033565b5050610f1861148160a0840184610e87565b60058301611257565b6000821982111561149d5761149d61101d565b500190565b634e487b7160e01b600052603260045260246000fd5b6000600182016114ca576114ca61101d565b5060010190565b6000828210156114e3576114e361101d565b500390565b6000816114f7576114f761101d565b506000190190565b60006020828403121561151157600080fd5b81356109f481611238565b60006020828403121561152e57600080fd5b81356109f48161124856fea2646970667358221220af4a5412f62bf979216eadf9c20bde5aede2d0a9c90ba7d40fdeac348a24387964736f6c634300080d0033";

type JSCRevisionsLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JSCRevisionsLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class JSCRevisionsLib__factory extends ContractFactory {
  constructor(...args: JSCRevisionsLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JSCRevisionsLib> {
    return super.deploy(overrides || {}) as Promise<JSCRevisionsLib>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): JSCRevisionsLib {
    return super.attach(address) as JSCRevisionsLib;
  }
  override connect(signer: Signer): JSCRevisionsLib__factory {
    return super.connect(signer) as JSCRevisionsLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JSCRevisionsLibInterface {
    return new utils.Interface(_abi) as JSCRevisionsLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JSCRevisionsLib {
    return new Contract(address, _abi, signerOrProvider) as JSCRevisionsLib;
  }
}
