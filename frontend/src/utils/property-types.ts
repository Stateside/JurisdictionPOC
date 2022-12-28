import { ChangeEvent, ReactNode } from 'react';

export type PropertyImage = {
  src: string;
  alt: string;
};

export type PropertyInfo = {
  infoLabel: string;
  infoValue: string | number | null;
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
  fromAddress: string;
  price: string | number | null;
  expiresAfter: string | number | null;
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

export type ActionNames = '' | 'sell' | 'accept';

export type PropertyDetailsContextDefoTypes = {
  actionName: ActionNames;
  isOpen: boolean;
  propertyId: string;
  propertyInfo: PropertyInfo[];
  propertyImages: PropertyImage[];
  propertyMapInfo: string,
  sellFormModel: SellFormModel;
  actionButtonDisabled: boolean;
  selectedOfferIndex: number | null;
  activeOffers: OfferInfo[];
  favorited: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setSellModelField: (params: ModelFieldSetter) => void;
  postSellForm: () => void;
  propertyDetailsModalAction: () => void;
  showSellModal: () => void;
  showAcceptOfferModal: (index: number) => void;
  buildActivity: (activity: OfferInfo) => ReactNode | string;
  onOpen: () => void;
  onClose: () => void;
  toggleFavorite: () => void;
};
