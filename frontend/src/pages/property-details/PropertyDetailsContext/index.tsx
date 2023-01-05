import { createContext, useState, ReactNode, ChangeEvent, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { deepCopy, getAccountShortName } from 'utils/util';
import { ObjectHashInterface } from '@/interfaces/index';
import { useRouter } from 'next/router';
import {
  SellFormModel,
  PropertyDetailsContextDefoTypes,
  InputValue,
  Validators,
  ModelFieldSetter,
  FormPayload,
  PropertyInfo,
  PropertyImage,
  ActionNames,
  OfferInfo,
} from '../../../utils/property-types';
import {
  buildTokenInfoByTitleId,
  buildActiveOffersInfoByTitleId,
  buildLocationString,
  getTokenByTitleId,
} from '@/model/factories/TokenFactory';
import {getTokenInformationByTitleId} from '@/model/services/DataService';
import useJSCTitleToken from '@/hooks/useJSCTitleToken';
import useJSCJurisdiction from '@/hooks/useJSCJurisdiction';
import {jscJurisdictionInfo} from '@/utils/types';

interface PropertyDetailsContextProps {
  text?: string;
  children?: ReactNode;
}

const newSellFormModel: SellFormModel = {
  fields: {
    tokenId: {
      value: '',
      valid: true,
      pristine: true,
      touched: false,
    },
    price: {
      value: '',
      valid: false,
      pristine: true,
      touched: false,
    },
    recipientAddress: {
      value: '',
      valid: false,
      pristine: true,
      touched: false,
    },
    expiresAfter: {
      value: '',
      valid: false,
      pristine: true,
      touched: false,
    },
  },
  formValid: false,
};

const ComponentWithContextDefoValues: PropertyDetailsContextDefoTypes = {
  dataReady: false,
  actionName: '',
  isOpen: false,
  jurisdiction: '',
  tokenId: '',
  propertyId: '',
  propertyInfo: [],
  propertyImages: [],
  propertyMapInfo: '',
  sellFormModel: newSellFormModel,
  actionButtonDisabled: true,
  selectedOfferIndex: null,
  activeOffers: [],
  handleInputChange: () => {},
  handleSelectChange: () => {},
  setSellModelField: () => {},
  postSellForm: () => {},
  propertyDetailsModalAction: () => {},
  showSellModal: () => {},
  showAcceptOfferModal: () => {},
  buildActivity: () => '',
  onClose: () => {},
  onOpen: () => {}
};

export const PropertyDetailsContext =
  createContext<PropertyDetailsContextDefoTypes>(
    ComponentWithContextDefoValues
  );

const PropertyDetailsProvider = function ({
  children,
  text,
}: PropertyDetailsContextProps) {
  
  const { query } = useRouter();
  const { slug = [] } = query;
  const titleId = slug[0] || '';
  const address = slug[1] || '';

  const {tokens, tokenJurisdictionAddress, loading} = useJSCTitleToken(address);
  const [getJurisdictionInfo] = useJSCJurisdiction();
  // ----------------------------------------------------------------
  // Context states
  // ----------------------------------------------------------------
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionName, setActionName] = useState<ActionNames>('');
  const [actionButtonDisabled, setActionButtonDisabled] =
    useState<boolean>(true);
  const [sellFormModel, setSellFormModel] =
    useState<SellFormModel>(newSellFormModel);
  const [tokenId, setTokenId] = useState<string>('');
  const [propertyId, setPropertyId] = useState<string>('');
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo[]>([]);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
  const [activeOffers, setActiveOffers] = useState<OfferInfo[]>([]);
  const [propertyMapInfo, setPropertyMapInfo] = useState<string>('');
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number | null>(
    null
  );
  const [jscJurisdictionInfo, setJscJurisdictionInfo] = useState<jscJurisdictionInfo | undefined>(undefined);
  const [dataReady, setDataReady] = useState<boolean>(false);

  // ----------------------------------------------------------------
  // Private methods
  // ----------------------------------------------------------------
  const modelToPayload = (currentModel: SellFormModel): FormPayload => {
    const payload: FormPayload = {};
    const fieldsInModel = currentModel.fields;

    for (const fieldName in fieldsInModel) {
      if (Object.prototype.hasOwnProperty.call(fieldsInModel, fieldName)) {
        const fieldModel = fieldsInModel[fieldName];

        if (fieldModel.valid) {
          payload[fieldName] = fieldModel.value;
        }
      }
    }

    return payload;
  }

  const clearFormModel = () => {
    setSellFormModel(newSellFormModel);
  }

  const isModelValid = (currentModel: SellFormModel): boolean => {
    const fieldsInModel = currentModel.fields;
    let formValid = true;

    for (const fieldName in fieldsInModel) {
      if (Object.prototype.hasOwnProperty.call(fieldsInModel, fieldName)) {
        const fieldModel = fieldsInModel[fieldName];

        if (!fieldModel.valid) {
          formValid = false;
          break;
        }
      }
    }

    return formValid;
  }

  const validateInput = (value: InputValue, validators: Validators): boolean => {
    const { pattern, max, min, required } = validators;
    const patt = new RegExp(pattern || '');
    const valueAsNumber: number = Number(value);

    let patternValid = true;
    let maxValid = true;
    let minValid = true;
    let requiredValid = true;

    if (pattern) {
      patternValid = patt.test(value);
    }

    if ((max || min) && !isNaN(valueAsNumber)) {
      maxValid = max ? valueAsNumber <= Number(max) : true;
      minValid = min ? valueAsNumber >= Number(min) : true;
    }

    if (required) {
      requiredValid = value !== '';
    }

    return patternValid && maxValid && minValid && requiredValid;
  }

  const inputPristine = (
    value: InputValue,
    name: string,
    currentModel: SellFormModel
  ): boolean => {
    const currentPristineStatus = currentModel.fields[name].pristine;
    const currentTouchedStatus = currentModel.fields[name].touched;

    if (value !== '') {
      return false;
    }

    if (value === '' && !currentPristineStatus && currentTouchedStatus) {
      return false;
    }

    return true;
  }

  const changeEvent = (
    value: InputValue,
    name: string,
    validators: Validators,
    currentModel: SellFormModel
  ) => {
    const valid = validateInput(value, validators);
    const pristine = inputPristine(value, name, currentModel);

    currentModel.fields[name].value = value;
    currentModel.fields[name].valid = valid;
    currentModel.fields[name].pristine = pristine;
    currentModel.fields[name].touched = !pristine;

    const formValid = isModelValid(currentModel);

    currentModel.formValid = formValid;
    setActionButtonDisabled(formValid);
    setSellFormModel(currentModel);
  }

  // ----------------------------------------------------------------
  // Public exposed methods
  // ----------------------------------------------------------------

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value, name, pattern, min, max, required } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);

    changeEvent(value, name, { pattern, min, max, required }, modelCopy);
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { currentTarget } = e;
    const { value, name, required } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);

    changeEvent(value, name, { required }, modelCopy);
  }

  const setSellModelField = ({ fieldName, newModel }: ModelFieldSetter) => {
    const modelCopy = deepCopy(sellFormModel);
    const { fields } = modelCopy;

    fields[fieldName] = newModel;
    setSellFormModel(modelCopy);
  }

  const postSellForm = () => {
    const payload = modelToPayload(sellFormModel);

    console.log(payload);

    clearFormModel();
    onClose();
  }

  const postAcceptOffer = () => {
    const payload = activeOffers[selectedOfferIndex || 0];

    console.log(payload);
    onClose();
  }

  const propertyDetailsModalAction = () => {
    console.log('post the form here');
    if (actionName === 'sell') {
      postSellForm();
    } else {
      postAcceptOffer();
    }
  }

  const showSellModal = () => {
    const formValid = isModelValid(sellFormModel);

    setActionName('sell');
    setActionButtonDisabled(formValid);
    onOpen();
  }

  const showAcceptOfferModal = (i: number) => {
    setActionName('accept');
    setActionButtonDisabled(true);
    setSelectedOfferIndex(i);
    onOpen();
  }

  const buildActivity = (offer: OfferInfo) => {
    const copy: ObjectHashInterface = {
      received:
        offer.fromAddress &&
        `You have a new offer from ${getAccountShortName(offer.fromAddress)}`,
      made: 'You made an offer on token ID',
      sellingMe:
        offer.fromAddress &&
        `${getAccountShortName(offer.fromAddress)}  is selling you token ID`,
    };
    return `${copy[offer.type]}`;
  }

  // ----------------------------------------------------------------
  // Effects
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!loading) {
      // console.log('propertyTiming: loading done!');
      console.timeLog('propertyTiming', 'Property context: has finished loading');
      const loadData = async () => {
        const jurisdictionInfo = await getJurisdictionInfo(tokenJurisdictionAddress);

        setJscJurisdictionInfo(jurisdictionInfo);
      }

      loadData().catch((err) => {
        console.log(err);
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && jscJurisdictionInfo) {
      console.timeLog('propertyTiming', 'Property context: has finished loading and jscJurisdictionInfo is ready');
      const thisPropertyInfo = getTokenInformationByTitleId(titleId);
      const cartesianMapInfo = buildLocationString(thisPropertyInfo.locationData, 'cartesian');
      const tokenInfo = buildTokenInfoByTitleId(tokens, jscJurisdictionInfo, thisPropertyInfo, titleId);
      const buyOffersInfo = buildActiveOffersInfoByTitleId(
        tokens,
        titleId,
        'buy'
      );

      setTokenId(getTokenByTitleId(tokens, titleId)?.tokenId || '');
      setPropertyId(titleId);
      setPropertyInfo(tokenInfo);
      setActiveOffers(buyOffersInfo);
      setPropertyImages(thisPropertyInfo.images);
      setPropertyMapInfo(cartesianMapInfo);
      setDataReady(true);
      console.timeEnd('propertyTiming');
    }
  }, [loading, jscJurisdictionInfo]);

  return (
    <PropertyDetailsContext.Provider
      value={{
        dataReady,
        actionName,
        tokenId,
        jurisdiction: tokenJurisdictionAddress,
        propertyId,
        propertyInfo,
        propertyImages,
        propertyMapInfo,
        isOpen,
        sellFormModel,
        actionButtonDisabled,
        selectedOfferIndex,
        activeOffers,
        handleInputChange,
        handleSelectChange,
        setSellModelField,
        postSellForm,
        propertyDetailsModalAction,
        showSellModal,
        showAcceptOfferModal,
        buildActivity,
        onClose,
        onOpen,
      }}
    >
      {children}
    </PropertyDetailsContext.Provider>
  );
};

export default PropertyDetailsProvider;
