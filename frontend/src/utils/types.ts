export enum ParamType {
  t_address,
  t_bool,
  t_number,
  t_string,
}

export enum ProposalState {
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

export enum VoteType {
  Against,
  For,
  Abstain,
}

export type Offer = {
  buyer: string;
  buyerAddress: string;
  amount: number;
};

export type Token = {
  tokenId: string;
  titleId: string;
  owner: string;
  ownerFrozen: boolean;
  frozen: boolean;
  offersToBuy: Offer[];
  offersToSell: Offer[];
  url: string;
};
