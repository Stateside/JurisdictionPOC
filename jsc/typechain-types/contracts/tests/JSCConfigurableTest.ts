/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace JSCConfigurableLib {
  export type ParameterInfoStruct = {
    name: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    ptype: PromiseOrValue<BigNumberish>;
  };

  export type ParameterInfoStructOutput = [string, string, number] & {
    name: string;
    description: string;
    ptype: number;
  };
}

export declare namespace JSCRevisionsLib {
  export type VotingRulesStruct = {
    votingPeriod: PromiseOrValue<BigNumberish>;
    approvals: PromiseOrValue<BigNumberish>;
    quorumPercentage: PromiseOrValue<BigNumberish>;
    majority: PromiseOrValue<BigNumberish>;
    roles: PromiseOrValue<string>[];
  };

  export type VotingRulesStructOutput = [
    number,
    number,
    number,
    number,
    string[]
  ] & {
    votingPeriod: number;
    approvals: number;
    quorumPercentage: number;
    majority: number;
    roles: string[];
  };

  export type RevisionStruct = {
    name: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    paramNames: PromiseOrValue<string>[];
    paramTypes: PromiseOrValue<BigNumberish>[];
    paramHints: PromiseOrValue<string>[];
    rules: JSCRevisionsLib.VotingRulesStruct;
  };

  export type RevisionStructOutput = [
    string,
    string,
    string[],
    number[],
    string[],
    JSCRevisionsLib.VotingRulesStructOutput
  ] & {
    name: string;
    description: string;
    paramNames: string[];
    paramTypes: number[];
    paramHints: string[];
    rules: JSCRevisionsLib.VotingRulesStructOutput;
  };
}

export interface JSCConfigurableTestInterface extends utils.Interface {
  functions: {
    "executeRevision(string,bytes)": FunctionFragment;
    "getAddressParameter(string)": FunctionFragment;
    "getBoolParameter(string)": FunctionFragment;
    "getNumberParameter(string)": FunctionFragment;
    "getStringParameter(string)": FunctionFragment;
    "isFrozen()": FunctionFragment;
    "isValidParameterIterator(uint256)": FunctionFragment;
    "isValidRevisionIterator(uint256)": FunctionFragment;
    "iterateParameters()": FunctionFragment;
    "iterateRevisions()": FunctionFragment;
    "nextParameter(uint256)": FunctionFragment;
    "nextRevision(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "parameterCount()": FunctionFragment;
    "parameterIteratorGet(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revisionCount()": FunctionFragment;
    "revisionIteratorGet(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "executeRevision"
      | "getAddressParameter"
      | "getBoolParameter"
      | "getNumberParameter"
      | "getStringParameter"
      | "isFrozen"
      | "isValidParameterIterator"
      | "isValidRevisionIterator"
      | "iterateParameters"
      | "iterateRevisions"
      | "nextParameter"
      | "nextRevision"
      | "owner"
      | "parameterCount"
      | "parameterIteratorGet"
      | "renounceOwnership"
      | "revisionCount"
      | "revisionIteratorGet"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "executeRevision",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressParameter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBoolParameter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberParameter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getStringParameter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "isFrozen", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isValidParameterIterator",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidRevisionIterator",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "iterateParameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "iterateRevisions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextParameter",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "nextRevision",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "parameterCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "parameterIteratorGet",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revisionCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revisionIteratorGet",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeRevision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAddressParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBoolParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStringParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isFrozen", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isValidParameterIterator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidRevisionIterator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "iterateParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "iterateRevisions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextParameter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextRevision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "parameterCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "parameterIteratorGet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revisionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revisionIteratorGet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AddressParameterAdded(string,address)": EventFragment;
    "AddressParameterRemoved(string,address)": EventFragment;
    "AddressParameterUpdated(string,address)": EventFragment;
    "BoolParameterAdded(string,bool)": EventFragment;
    "BoolParameterUpdated(string,bool)": EventFragment;
    "ContractFrozen(address,bool)": EventFragment;
    "NumberParameterAdded(string,uint256)": EventFragment;
    "NumberParameterUpdated(string,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RevisionAdded(string)": EventFragment;
    "RevisionExecuted(string,bytes)": EventFragment;
    "RevisionRemoved(string)": EventFragment;
    "StringParameterAdded(string,string)": EventFragment;
    "StringParameterUpdated(string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddressParameterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddressParameterRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddressParameterUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BoolParameterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BoolParameterUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContractFrozen"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NumberParameterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NumberParameterUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StringParameterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StringParameterUpdated"): EventFragment;
}

export interface AddressParameterAddedEventObject {
  name: string;
  value: string;
}
export type AddressParameterAddedEvent = TypedEvent<
  [string, string],
  AddressParameterAddedEventObject
>;

export type AddressParameterAddedEventFilter =
  TypedEventFilter<AddressParameterAddedEvent>;

export interface AddressParameterRemovedEventObject {
  name: string;
  value: string;
}
export type AddressParameterRemovedEvent = TypedEvent<
  [string, string],
  AddressParameterRemovedEventObject
>;

export type AddressParameterRemovedEventFilter =
  TypedEventFilter<AddressParameterRemovedEvent>;

export interface AddressParameterUpdatedEventObject {
  name: string;
  value: string;
}
export type AddressParameterUpdatedEvent = TypedEvent<
  [string, string],
  AddressParameterUpdatedEventObject
>;

export type AddressParameterUpdatedEventFilter =
  TypedEventFilter<AddressParameterUpdatedEvent>;

export interface BoolParameterAddedEventObject {
  name: string;
  value: boolean;
}
export type BoolParameterAddedEvent = TypedEvent<
  [string, boolean],
  BoolParameterAddedEventObject
>;

export type BoolParameterAddedEventFilter =
  TypedEventFilter<BoolParameterAddedEvent>;

export interface BoolParameterUpdatedEventObject {
  name: string;
  value: boolean;
}
export type BoolParameterUpdatedEvent = TypedEvent<
  [string, boolean],
  BoolParameterUpdatedEventObject
>;

export type BoolParameterUpdatedEventFilter =
  TypedEventFilter<BoolParameterUpdatedEvent>;

export interface ContractFrozenEventObject {
  con: string;
  frozen: boolean;
}
export type ContractFrozenEvent = TypedEvent<
  [string, boolean],
  ContractFrozenEventObject
>;

export type ContractFrozenEventFilter = TypedEventFilter<ContractFrozenEvent>;

export interface NumberParameterAddedEventObject {
  name: string;
  value: BigNumber;
}
export type NumberParameterAddedEvent = TypedEvent<
  [string, BigNumber],
  NumberParameterAddedEventObject
>;

export type NumberParameterAddedEventFilter =
  TypedEventFilter<NumberParameterAddedEvent>;

export interface NumberParameterUpdatedEventObject {
  name: string;
  value: BigNumber;
}
export type NumberParameterUpdatedEvent = TypedEvent<
  [string, BigNumber],
  NumberParameterUpdatedEventObject
>;

export type NumberParameterUpdatedEventFilter =
  TypedEventFilter<NumberParameterUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RevisionAddedEventObject {
  name: string;
}
export type RevisionAddedEvent = TypedEvent<[string], RevisionAddedEventObject>;

export type RevisionAddedEventFilter = TypedEventFilter<RevisionAddedEvent>;

export interface RevisionExecutedEventObject {
  name: string;
  pdata: string;
}
export type RevisionExecutedEvent = TypedEvent<
  [string, string],
  RevisionExecutedEventObject
>;

export type RevisionExecutedEventFilter =
  TypedEventFilter<RevisionExecutedEvent>;

export interface RevisionRemovedEventObject {
  name: string;
}
export type RevisionRemovedEvent = TypedEvent<
  [string],
  RevisionRemovedEventObject
>;

export type RevisionRemovedEventFilter = TypedEventFilter<RevisionRemovedEvent>;

export interface StringParameterAddedEventObject {
  name: string;
  value: string;
}
export type StringParameterAddedEvent = TypedEvent<
  [string, string],
  StringParameterAddedEventObject
>;

export type StringParameterAddedEventFilter =
  TypedEventFilter<StringParameterAddedEvent>;

export interface StringParameterUpdatedEventObject {
  name: string;
  value: string;
}
export type StringParameterUpdatedEvent = TypedEvent<
  [string, string],
  StringParameterUpdatedEventObject
>;

export type StringParameterUpdatedEventFilter =
  TypedEventFilter<StringParameterUpdatedEvent>;

export interface JSCConfigurableTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: JSCConfigurableTestInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    executeRevision(
      name: PromiseOrValue<string>,
      pdata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAddressParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getBoolParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getNumberParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getStringParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isFrozen(overrides?: CallOverrides): Promise<[boolean]>;

    isValidParameterIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    iterateParameters(overrides?: CallOverrides): Promise<[BigNumber]>;

    iterateRevisions(overrides?: CallOverrides): Promise<[BigNumber]>;

    nextParameter(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    parameterCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    parameterIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[JSCConfigurableLib.ParameterInfoStructOutput]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revisionCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    revisionIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [JSCRevisionsLib.RevisionStructOutput] & {
        value: JSCRevisionsLib.RevisionStructOutput;
      }
    >;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  executeRevision(
    name: PromiseOrValue<string>,
    pdata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAddressParameter(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getBoolParameter(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getNumberParameter(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getStringParameter(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  isFrozen(overrides?: CallOverrides): Promise<boolean>;

  isValidParameterIterator(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isValidRevisionIterator(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  iterateParameters(overrides?: CallOverrides): Promise<BigNumber>;

  iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

  nextParameter(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nextRevision(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  parameterCount(overrides?: CallOverrides): Promise<BigNumber>;

  parameterIteratorGet(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<JSCConfigurableLib.ParameterInfoStructOutput>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revisionCount(overrides?: CallOverrides): Promise<BigNumber>;

  revisionIteratorGet(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<JSCRevisionsLib.RevisionStructOutput>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    executeRevision(
      name: PromiseOrValue<string>,
      pdata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAddressParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getBoolParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getNumberParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStringParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    isFrozen(overrides?: CallOverrides): Promise<boolean>;

    isValidParameterIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    iterateParameters(overrides?: CallOverrides): Promise<BigNumber>;

    iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

    nextParameter(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    parameterCount(overrides?: CallOverrides): Promise<BigNumber>;

    parameterIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<JSCConfigurableLib.ParameterInfoStructOutput>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    revisionCount(overrides?: CallOverrides): Promise<BigNumber>;

    revisionIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<JSCRevisionsLib.RevisionStructOutput>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AddressParameterAdded(string,address)"(
      name?: null,
      value?: null
    ): AddressParameterAddedEventFilter;
    AddressParameterAdded(
      name?: null,
      value?: null
    ): AddressParameterAddedEventFilter;

    "AddressParameterRemoved(string,address)"(
      name?: null,
      value?: null
    ): AddressParameterRemovedEventFilter;
    AddressParameterRemoved(
      name?: null,
      value?: null
    ): AddressParameterRemovedEventFilter;

    "AddressParameterUpdated(string,address)"(
      name?: null,
      value?: null
    ): AddressParameterUpdatedEventFilter;
    AddressParameterUpdated(
      name?: null,
      value?: null
    ): AddressParameterUpdatedEventFilter;

    "BoolParameterAdded(string,bool)"(
      name?: null,
      value?: null
    ): BoolParameterAddedEventFilter;
    BoolParameterAdded(
      name?: null,
      value?: null
    ): BoolParameterAddedEventFilter;

    "BoolParameterUpdated(string,bool)"(
      name?: null,
      value?: null
    ): BoolParameterUpdatedEventFilter;
    BoolParameterUpdated(
      name?: null,
      value?: null
    ): BoolParameterUpdatedEventFilter;

    "ContractFrozen(address,bool)"(
      con?: null,
      frozen?: null
    ): ContractFrozenEventFilter;
    ContractFrozen(con?: null, frozen?: null): ContractFrozenEventFilter;

    "NumberParameterAdded(string,uint256)"(
      name?: null,
      value?: null
    ): NumberParameterAddedEventFilter;
    NumberParameterAdded(
      name?: null,
      value?: null
    ): NumberParameterAddedEventFilter;

    "NumberParameterUpdated(string,uint256)"(
      name?: null,
      value?: null
    ): NumberParameterUpdatedEventFilter;
    NumberParameterUpdated(
      name?: null,
      value?: null
    ): NumberParameterUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RevisionAdded(string)"(name?: null): RevisionAddedEventFilter;
    RevisionAdded(name?: null): RevisionAddedEventFilter;

    "RevisionExecuted(string,bytes)"(
      name?: null,
      pdata?: null
    ): RevisionExecutedEventFilter;
    RevisionExecuted(name?: null, pdata?: null): RevisionExecutedEventFilter;

    "RevisionRemoved(string)"(name?: null): RevisionRemovedEventFilter;
    RevisionRemoved(name?: null): RevisionRemovedEventFilter;

    "StringParameterAdded(string,string)"(
      name?: null,
      value?: null
    ): StringParameterAddedEventFilter;
    StringParameterAdded(
      name?: null,
      value?: null
    ): StringParameterAddedEventFilter;

    "StringParameterUpdated(string,string)"(
      name?: null,
      value?: null
    ): StringParameterUpdatedEventFilter;
    StringParameterUpdated(
      name?: null,
      value?: null
    ): StringParameterUpdatedEventFilter;
  };

  estimateGas: {
    executeRevision(
      name: PromiseOrValue<string>,
      pdata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAddressParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBoolParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNumberParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStringParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFrozen(overrides?: CallOverrides): Promise<BigNumber>;

    isValidParameterIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    iterateParameters(overrides?: CallOverrides): Promise<BigNumber>;

    iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

    nextParameter(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    parameterCount(overrides?: CallOverrides): Promise<BigNumber>;

    parameterIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revisionCount(overrides?: CallOverrides): Promise<BigNumber>;

    revisionIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    executeRevision(
      name: PromiseOrValue<string>,
      pdata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAddressParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBoolParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumberParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStringParameter(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFrozen(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isValidParameterIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    iterateParameters(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    iterateRevisions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextParameter(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    parameterCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    parameterIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revisionCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    revisionIteratorGet(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
