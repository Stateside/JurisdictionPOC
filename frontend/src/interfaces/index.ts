export interface SiteLayoutData {
  title: string;
  ctaConnect: string;
}

export interface SiteLabel {
  regular: string;
  vip: string;
}

export interface HomeLabels {
  pageTitle: string;
  mainTitle: SiteLabel;
  ctaConnect: string;
}


export interface TagInterface {
  type?: string;
  justify?: string;
  caret?: JSX.Element|null;
  information?: string;
  disableHover?: boolean;
  children: JSX.Element | JSX.Element[];
}

export interface ObjectHashInterface {
  [key: string]: any;
}

export interface Offer {
  buyer: string
  amount: number,
  buyerAddress: string,
}

export interface Token {
  tokenId: string
  titleId: string
  owner: string
  ownerAddress: string
  ownerFrozen: boolean
  frozen: boolean
  offersToBuy: Offer[]
  offersToSell: Offer[]
  url: string
}
