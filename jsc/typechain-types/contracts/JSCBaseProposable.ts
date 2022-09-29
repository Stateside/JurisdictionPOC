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
} from "../common";

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

export interface JSCBaseProposableInterface extends utils.Interface {
  functions: {
    "executeRevision(string,bytes)": FunctionFragment;
    "isValidRevisionIterator(uint256)": FunctionFragment;
    "iterateRevisions()": FunctionFragment;
    "nextRevision(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revisionCount()": FunctionFragment;
    "revisionIteratorGet(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "executeRevision"
      | "isValidRevisionIterator"
      | "iterateRevisions"
      | "nextRevision"
      | "owner"
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
    functionFragment: "isValidRevisionIterator",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "iterateRevisions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextRevision",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
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
    functionFragment: "isValidRevisionIterator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "iterateRevisions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextRevision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
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
    "OwnershipTransferred(address,address)": EventFragment;
    "RevisionAdded(string)": EventFragment;
    "RevisionExecuted(string)": EventFragment;
    "RevisionRemoved(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevisionRemoved"): EventFragment;
}

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
}
export type RevisionExecutedEvent = TypedEvent<
  [string],
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

export interface JSCBaseProposable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: JSCBaseProposableInterface;

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

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    iterateRevisions(overrides?: CallOverrides): Promise<[BigNumber]>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

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

  isValidRevisionIterator(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

  nextRevision(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

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

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

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

    "RevisionExecuted(string)"(name?: null): RevisionExecutedEventFilter;
    RevisionExecuted(name?: null): RevisionExecutedEventFilter;

    "RevisionRemoved(string)"(name?: null): RevisionRemovedEventFilter;
    RevisionRemoved(name?: null): RevisionRemovedEventFilter;
  };

  estimateGas: {
    executeRevision(
      name: PromiseOrValue<string>,
      pdata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    iterateRevisions(overrides?: CallOverrides): Promise<BigNumber>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

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

    isValidRevisionIterator(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    iterateRevisions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextRevision(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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
