import { createContext, useState, ReactNode, ChangeEvent, useEffect, useCallback } from 'react';
import { AlertStatus, useDisclosure } from '@chakra-ui/react';
import { deepCopy, getAccountShortName } from '@/utils/util';
import { useRouter } from 'next/router';
import {
  SellFormModel,
  PropertyDetailsContextDefoTypes,
  InputValue,
  Validators,
  PropertyInfo,
  PropertyImage,
  ActionNames,
  OfferInfo,
  PropertyMapInfo,
  OnDoneFunction,
} from '@/utils/property-types';
import {
  buildActiveOffersInfo,
  buildPropertyInfo
} from '@/model/factories/TokenFactory';
import useJSCJurisdiction from '@/hooks/useJSCJurisdiction';
import {jscJurisdictionInfo, thisPropertyInfo} from '@/utils/types';
import { useWeb3React } from '@web3-react/core';
import { useTitleTokens } from '@/store/useTitleTokens';
import { useAliases } from '@/store/useAliases';
import { Token } from '@/store/useTitleTokens';
import Head from 'next/head';
import { IJSCTitleToken } from '../../../../../../typechain-types';
import { ethers } from 'ethers';
import { useRecentActivities } from '@/store/useRecentActivities';

interface PropertyDetailsContextProps {
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

const defoMapInfo:PropertyMapInfo = {
  lat: 0,
  lon: 0,
}

const ComponentWithContextDefoValues: PropertyDetailsContextDefoTypes = {
  dataReady: false,
  actionName: '',
  isOpen: false,
  jurisdiction: '',
  tokenId: '',
  propertyId: '',
  ownerAddress: '',
  propertyInfo: [],
  propertyImages: [],
  propertyMapInfo: {
    lat: 0,
    lon: 0,
  },
  sellFormModel: newSellFormModel,
  actionButtonDisabled: true,
  selectedOffer: null,
  offersToBuy: [],
  offersToSell: [],
  handleInputChange: () => {},
  handleSelectChange: () => {},
  setSellFormModel: () => {},
  propertyDetailsModalAction: () => {},
  showModal: (action:ActionNames, offer?:OfferInfo) => {},
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
}: PropertyDetailsContextProps) {
  
  const { query } = useRouter();
  const id = (query.id as string) || "";
  const titleId = (query.titleId as string) || "";

  const jurisdictionAddress = id as string;

  const { library, account } = useWeb3React();
  const isTokensInitialized = useTitleTokens(state => state.isInitialized);
  const getTokensContractDetails = useTitleTokens(state => state.get);
  const [tokenId, setTokenId] = useState<string>('');
  const tokenInfo:Token = useTitleTokens(state => state.tokenContracts[jurisdictionAddress]?.tokens.tokensById[tokenId]);
  const { aliasesByAddress } = useAliases();
  const [getJurisdictionInfo] = useJSCJurisdiction();

  const { activityToken } = useRecentActivities();

  // ----------------------------------------------------------------
  // Context states
  // ----------------------------------------------------------------
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionName, setActionName] = useState<ActionNames>('');
  const [actionButtonDisabled, setActionButtonDisabled] =
    useState<boolean>(true);
  const [sellFormModel, setSellFormModel] =
    useState<SellFormModel>(newSellFormModel);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo[]>([]);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
  const [offersToBuy, setOffersToBuy] = useState<OfferInfo[]>([]);
  const [offersToSell, setOffersToSell] = useState<OfferInfo[]>([]);
  const [propertyMapInfo, setPropertyMapInfo] = useState<PropertyMapInfo>(defoMapInfo);
  const [selectedOffer, setSelectedOffer] = useState<OfferInfo | null>(
    null
  );
  const [jscJurisdictionInfo, setJscJurisdictionInfo] = useState<jscJurisdictionInfo | undefined>(undefined);
  const [propertyDetails, setPropertyDetails] = useState<thisPropertyInfo|undefined>();

  const [dataReady, setDataReady] = useState<boolean>(false);
  const [titleTokenContract, setTitleTokenContract] = useState<IJSCTitleToken|undefined>();

  // ----------------------------------------------------------------
  // Private methods
  // ----------------------------------------------------------------
  const clearFormModel = useCallback(() => {
    setSellFormModel(newSellFormModel);
  }, [])

  const validateInput = useCallback((value: InputValue, validators: Validators): boolean => {
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
  }, [])

  const inputPristine = useCallback((
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
  }, [])

  const changeEvent = useCallback((
    currentModel: SellFormModel
  ) => {
    validateFields(actionName, currentModel);
    setActionButtonDisabled(!currentModel.formValid);
    setSellFormModel(currentModel);
  }, [actionName])

  const validateFields = useCallback((action: ActionNames, currentModel: SellFormModel) => {
    const fieldsInModel = currentModel.fields;
    let formValid = true;

    for (const name in fieldsInModel) {
      const valid = validateInput(currentModel.fields[name].value, getValidators(action, name));
      formValid = formValid && valid;
      const pristine = inputPristine(currentModel.fields[name].value, name, currentModel);
      currentModel.fields[name].valid = valid;
      currentModel.fields[name].pristine = pristine;
      currentModel.fields[name].touched = !pristine;
    }

    currentModel.formValid = formValid;
    setActionButtonDisabled(formValid);
    setSellFormModel(currentModel);
  }, [validateInput, inputPristine])

  // ----------------------------------------------------------------
  // Public exposed methods
  // ----------------------------------------------------------------

  const getValidators = useCallback((action:ActionNames, field:string) => {
    const validators:Validators = {}
    switch(action) {
      case 'OfferToBuy':
      case 'OfferToSell':
        if (field==='tokenId') validators.required = true
        if (field==='price') validators.required = true
        if (field==='price') validators.min = "0.0000000001"
        if (field==='price') validators.max = "999999999"
        if (field==='address') validators.required = true
        if (field==='expiresAfter') validators.required = true
        break;
    }
    return validators
  }, [])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value, name, } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);
    modelCopy.fields[name].value = value;
    changeEvent(modelCopy);
  }, [sellFormModel, changeEvent])

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { currentTarget } = e;
    const { value, name, } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);
    modelCopy.fields[name].value = value;
    changeEvent(modelCopy);
  }, [sellFormModel, changeEvent])

  const closeModal = useCallback(() => {
    clearFormModel()
    onClose()
  }, [onClose])

  const actionName2Description = useCallback((actionName: ActionNames, titleId:string, price:string, account:string) => {
    switch(actionName) {
      case 'OfferToBuy':
        return `make an offer on ${titleId} for ${price} ETH`
      case 'OfferToSell':
        return `offer ${titleId} to ${account} for ${price} ETH`
      case 'AcceptOfferToBuy':
        return `accept offer from ${account} to buy ${titleId} for ${price} ETH`
      case 'AcceptOfferToSell':
        return `accept offer from ${account} to sell ${titleId} for ${price} ETH`
      case 'RetractOfferToBuy':
        return `retract offer to buy ${titleId} from ${account} for ${price} ETH`
      case 'RetractOfferToSell':
        return `retract offer to sell ${titleId} to ${account} ${price} ETH`
    }
    return `Internal error: Unexpected action ${actionName}`
  }, [])
  
  const propertyDetailsModalAction = useCallback((onDone:OnDoneFunction) => {
    const doAction = async () => {
      const { price, recipientAddress: address } = sellFormModel.fields;
      const other = address?.valid ? aliasesByAddress?.[address.value]?.alias || address.value : address?.value || 'Unknown';
      let msg = 'Please fill in all fields'
      let status:AlertStatus = "success";
      
      if (titleTokenContract && price.valid) {
        try {
	        const priceETH = ethers.utils.parseEther(price.value)
	        switch(actionName) {
	          case 'OfferToBuy':
	            if (price.valid) {
	              //await titleTokenContract?.offerToBuy(tokenId, priceETH, { value: priceETH })
	              msg = `Sent offer to buy ${titleId} from ${other} for ${price.value} ETH`
	            }
	            break;
	          case 'OfferToSell':
	            if (price.valid && address.valid) {
	              //await titleTokenContract?.offerToSell(tokenId, address.value, priceETH)
	              msg = `Sent offer to sell ${titleId} to ${other} for ${price.value} ETH`
	            }
	            break;
	          case 'AcceptOfferToBuy':
	            if (address.valid) {
	              //await titleTokenContract?.acceptOfferToBuy(tokenId, address.value)
	              msg = `Accepted offer to buy ${titleId} from ${other} for ${price.value} ETH`
	            }
	            break;
	          case 'AcceptOfferToSell':
	            if (price.valid) {
	              //await titleTokenContract?.acceptOfferToSell(tokenId, { value: priceETH })
	              msg = `Accepted offer to sell ${titleId} to ${other} for ${price.value} ETH`
	            }
	            break;
	          case 'RetractOfferToBuy':
	            //await titleTokenContract?.cancelOfferToBuy(tokenId)
	            msg = `Retracted offer to buy ${titleId} from ${other} for ${price.value} ETH`
	            break;
	          case 'RetractOfferToSell':
	            if (address.valid) {
	              //await titleTokenContract?.cancelOfferToSell(tokenId, address.value)
	              msg = `Retracted offer to sell ${titleId} to ${other} for ${price.value} ETH`
	            }
	            break;
	          default:
	            msg = `Failed to ${actionName2Description(actionName, titleId, price.value, other)}`
	            status = 'error'
	            break;
	        }
          activityToken (msg, actionName, account, jurisdictionAddress, tokenInfo.titleId);
	        closeModal()	
        } catch (error) {
          status = 'error'
          msg = `Failed to ${actionName2Description(actionName, titleId, price.value, other)}` 
        }      
      }
      else
        status = 'error'
      onDone(msg, status)
    }
    doAction()
  }, [actionName, titleId, tokenId, titleTokenContract, sellFormModel, aliasesByAddress, closeModal])

  const showModal = useCallback((action:ActionNames, offer?:OfferInfo) => {
    validateFields(action, sellFormModel);

    setActionName(action);
    setActionButtonDisabled(!sellFormModel.formValid);
    setSelectedOffer(offer || null);
    onOpen();
  }, [sellFormModel, onOpen])

  const buildActivity = useCallback((offer: OfferInfo) => {
    const account = offer.address && aliasesByAddress 
      ? (aliasesByAddress[offer.address.toLowerCase()]?.alias || getAccountShortName(offer.address))
      : 'unknown';
    switch (offer.type) {
      case 'OfferToSell':
        return `An offer to SELL was made to ${account}`;
      case 'OfferToBuy':
        return `An offer to BUY was made by ${account}`;
    }
    return "unknown";
  }, [aliasesByAddress]);

  // ----------------------------------------------------------------
  // Effects
  // ----------------------------------------------------------------
  useEffect(() => {
    if (isTokensInitialized() && titleId) {
      const loadDetails = async () => {
        const { loadToken, instance } = await getTokensContractDetails(jurisdictionAddress, library.getSigner());
        const jurisdictionInfo = await getJurisdictionInfo(jurisdictionAddress);
      
        setJscJurisdictionInfo(jurisdictionInfo);  
        setTitleTokenContract(instance);
        const tokenId = (await instance.titleToTokenId(titleId)).toHexString();
        setTokenId(tokenId)
        loadToken(tokenId);
      }
      loadDetails();
    }
  }, [jurisdictionAddress, library, isTokensInitialized(), titleId]);

  useEffect(() => {
    if (tokenInfo !== undefined) {
      const setBadURL = () => {
        setPropertyDetails({
          titleId: tokenInfo.titleId,
          ownerInfo: {
            id: "Details unavaliable",
            fname: "Details unavaliable",
            lname: "Details unavaliable"
          },
          propertyDescription: "Details unavaliable",
          url: tokenInfo.url || "Missing URI",
          locationData: {
            address: "Details unavaliable",
            gpsCoordinates: {},
            lat: 0, 
            lon: 0
          },
          images: []
        })
      }

      if (tokenInfo?.url) 
        fetch(tokenInfo?.url)
          .then(res => res.json())
          .then(json => setPropertyDetails(json))
          .catch(err => {
            setBadURL()
          })
      else
        setBadURL()
    }
  }, [tokenInfo?.url])

  useEffect(() => {
    if (tokenInfo && propertyDetails) {
      const pInfo = buildPropertyInfo(tokenInfo, propertyDetails,  jurisdictionAddress, jscJurisdictionInfo, aliasesByAddress[tokenInfo?.owner?.toLowerCase() || '']?.alias);

      setPropertyInfo(pInfo);
      setOffersToBuy(buildActiveOffersInfo(tokenInfo,'OfferToBuy'));
      setOffersToSell(buildActiveOffersInfo(tokenInfo,'OfferToSell'));
      setPropertyMapInfo(propertyDetails.locationData);
      setPropertyImages(propertyDetails.images);
      setDataReady(true);
    }
  }, [tokenInfo, propertyDetails]);

  return (
    <PropertyDetailsContext.Provider
      value={{
        dataReady,
        actionName,
        tokenId,
        jurisdiction: jurisdictionAddress,
        propertyId: titleId,
        ownerAddress: tokenInfo?.owner || '',
        propertyInfo,
        propertyImages,
        propertyMapInfo,
        isOpen,
        sellFormModel,
        actionButtonDisabled,
        selectedOffer,
        offersToBuy,
        offersToSell,
        handleInputChange,
        handleSelectChange,
        setSellFormModel,
        propertyDetailsModalAction,
        showModal,
        buildActivity,
        onClose: closeModal,
        onOpen,
      }}
    >
      <Head>
        <title>Property Details: {titleId}</title>
      </Head>
      {children}
    </PropertyDetailsContext.Provider>
  );
};

export default PropertyDetailsProvider;
