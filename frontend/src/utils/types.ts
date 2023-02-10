export enum ParamType {
    t_account,
    t_bool,
    t_contract,
    t_number,
    t_role,
    t_string
}

export const ParamType2SolidyType = {
    [ParamType.t_account]: "address",
    [ParamType.t_bool]: "bool",
    [ParamType.t_contract]: "address",
    [ParamType.t_number]: "uint256",
    [ParamType.t_role]: "uint256",
    [ParamType.t_string]: "string"
}

export enum ProposalState {
    Active,
    Canceled,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed
}

export enum VoteType {
    Against,
    For,
    Abstain
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
    d?: number,
    m?: number,
    s?: number
}

export type gpsCoordinates = {
    [key: string]: degreeCoordinates,
}

export type locationData = {
    address: string,
    gpsCoordinates: gpsCoordinates,
    lat: number,
    lon: number
}

export type imageInfo = {
    src: string,
    alt: string
}

export type thisPropertyInfo = {
    titleId: string,
    ownerInfo: ownerInfo,
    url: string,
    locationData: locationData,
    images: imageInfo[],
    propertyDescription: string
}