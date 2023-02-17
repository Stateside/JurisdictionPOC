import { AlertStatus } from '@chakra-ui/react';
import { ChangeEvent, ReactNode } from 'react';

export type PropertyImage = {
  src: string,
  thumbSrc: string,
  alt: string
};

export type PropertyInfo = {
  infoLabel: string;
  infoValue: string | number | null;
  isURL?: boolean;
};

export type InputValue = string;

export type FormInputModel = {
  value: InputValue;
  valid: boolean;
  pristine: boolean;
  touched: boolean;
};

export type FormInputs = {
  [key: string]: FormInputModel;
};

export type SellFormModel = {
  fields: FormInputs;
  formValid: boolean;
};

export type OfferInfo = {
  tokenId: string;
  address: string;
  price: number;
  expiresAfter: number;
  expiresOn: number;
  daysLeft: number;
  type: string;
};

export type Validators = {
  pattern?: string;
  min?: string;
  max?: string;
  required?: boolean;
};

export type FormPayload = {
  [key: string]: string | number;
};

export type ModelFieldSetter = {
  fieldName: string;
  newModel: FormInputModel;
};

export type ActionNames = '' | 
  'OfferToSell' | 'ViewOfferToSell' | 'AcceptOfferToSell' | 'RetractOfferToSell' | 
  'OfferToBuy' | 'ViewOfferToBuy' | 'AcceptOfferToBuy' | 'RetractOfferToBuy'

export type PropertyMapInfo = {
  lat: number,
  lon: number,
}

export type OnDoneFunction = (msg:string, type:AlertStatus) => void

export type PropertyDetailsContextDefoTypes = {
  dataReady: boolean;
  actionName: ActionNames;
  isOpen: boolean;
  jurisdiction: string
  tokenId: string;
  propertyId: string;
  ownerAddress: string;
  propertyInfo: PropertyInfo[];
  propertyImages: PropertyImage[];
  propertyMapInfo: PropertyMapInfo,
  sellFormModel: SellFormModel;
  actionButtonDisabled: boolean;
  selectedOffer: OfferInfo | null;
  offersToBuy: OfferInfo[];
  offersToSell: OfferInfo[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setSellFormModel: (newModel: SellFormModel) => void;
  propertyDetailsModalAction: (onDone:OnDoneFunction) => void
  showModal: (action:ActionNames, offer?:OfferInfo) => void;
  buildActivity: (activity: OfferInfo) => ReactNode | string;
  onOpen: () => void;
  onClose: () => void;
};
