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
  ownerAddress: string;
  ownerFrozen: boolean;
  frozen: boolean;
  offersToBuy: Offer[];
  offersToSell: Offer[];
  url: string;
};

export type JurisdictionContracts = {
  name: string;
  address: string;
  description: string;
};

export type jscJurisdictionInfo = {
  name: string,
  address: string
}

export type fetchJurisdictionInfo = (tokenJurisdictionAddress:string) => Promise<jscJurisdictionInfo>;

export type ownerInfo = {
  id: string,
  fname: string,
  lname: string
}

export type degreeCoordinates = {
  d?: Number,
  m?: Number,
  s?: Number
}

export type gpsCoordinates = {
  [key: string]: degreeCoordinates,
}

export type locationData = {
  address: string,
  gpsCoordinates: gpsCoordinates,
  lat: Number,
  lon: Number
}

export type imageInfo = {
  [key: string]: string
}

export type thisPropertyInfo = {
  titleId: string,
  ownerInfo: ownerInfo,
  url: string,
  locationData: locationData,
  images: imageInfo[]
}
