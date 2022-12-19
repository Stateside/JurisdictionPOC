import { ReactNode } from 'react';
export interface MenuItemInterface {
  label: string;
  url: string;
  command: string;
}

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

export interface RecentActivityInterface {
  activities: Array<object>;
}

export interface ActivityInterface {
  type: string;
  tokenID: string;
  price: string;
  account?: string;
}

export interface TagInterface {
  type?: string;
  noCaret?: boolean;
  children: JSX.Element | JSX.Element[];
}

export interface ObjectHashInterface {
  [key: string]: any;
}

export interface Offer {
  buyer: string;
  buyerAddress: string;
  amount: number;
}

export interface Token {
  tokenId: string;
  titleId: string;
  owner: string;
  ownerFrozen: boolean;
  frozen: boolean;
  offersToBuy: Offer[];
  offersToSell: Offer[];
  url: string;
}
