import {
  createContext,
  useState,
  ReactNode,
  ChangeEvent,
  useEffect,
} from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { deepCopy, getAccountShortName } from 'utils/util';
import { ObjectHashInterface, ActivityInterface } from '@/interfaces/index';
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
} from '@/utils/property-types';
import {
  buildTokenInfoByTitleId,
  buildActiveOffersInfoByTitleId,
} from '@/model/factories/TokenFactory';
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
  actionName: '',
  isOpen: false,
  propertyId: '',
  propertyInfo: [],
  propertyImages: [],
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
  onOpen: () => {},
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

  const [tokens, tokenJurisdictionAddress, loading] = useJSCTitleToken(address);
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
  const [propertyId, setPropertyId] = useState<string>('');
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo[]>([]);
  const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([
    {
      src: 'property-image-01.png',
      alt: 'some image alt description',
    },
    {
      src: 'property-image-02.png',
      alt: 'some image alt description',
    },
    {
      src: 'property-image-03.png',
      alt: 'some image alt description',
    },
  ]);
  const [activeOffers, setActiveOffers] = useState<OfferInfo[]>([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number | null>(
    null
  );
  const [jscJurisdictionInfo, setJscJurisdictionInfo] = useState<jscJurisdictionInfo | undefined>(undefined);

  // ----------------------------------------------------------------
  // Private methods
  // ----------------------------------------------------------------
  function modelToPayload(currentModel: SellFormModel): FormPayload {
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

  function clearFormModel() {
    setSellFormModel(newSellFormModel);
  }

  function isModelValid(currentModel: SellFormModel): boolean {
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

  function validateInput(value: InputValue, validators: Validators): boolean {
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

  function inputPristine(
    value: InputValue,
    name: string,
    currentModel: SellFormModel
  ): boolean {
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

  function changeEvent(
    value: InputValue,
    name: string,
    validators: Validators,
    currentModel: SellFormModel
  ) {
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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { currentTarget } = e;
    const { value, name, pattern, min, max, required } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);

    changeEvent(value, name, { pattern, min, max, required }, modelCopy);
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const { currentTarget } = e;
    const { value, name, required } = currentTarget;
    const modelCopy = deepCopy(sellFormModel);

    changeEvent(value, name, { required }, modelCopy);
  }

  function setSellModelField({ fieldName, newModel }: ModelFieldSetter) {
    const modelCopy = deepCopy(sellFormModel);
    const { fields } = modelCopy;

    fields[fieldName] = newModel;
    setSellFormModel(modelCopy);
  }

  function postSellForm() {
    const payload = modelToPayload(sellFormModel);

    console.log(payload);

    clearFormModel();
    onClose();
  }

  function postAcceptOffer() {
    const payload = activeOffers[selectedOfferIndex || 0];

    console.log(payload);
    onClose();
  }

  function propertyDetailsModalAction() {
    console.log('post the form here');
    if (actionName === 'sell') {
      postSellForm();
    } else {
      postAcceptOffer();
    }
  }

  function showSellModal() {
    const formValid = isModelValid(sellFormModel);

    setActionName('sell');
    setActionButtonDisabled(formValid);
    onOpen();
  }

  function showAcceptOfferModal(i: number) {
    setActionName('accept');
    setActionButtonDisabled(true);
    setSelectedOfferIndex(i);
    onOpen();
  }

  function buildActivity(offer: OfferInfo) {
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
      const tokenInfo = buildTokenInfoByTitleId(tokens, jscJurisdictionInfo, titleId);
      const buyOffersInfo = buildActiveOffersInfoByTitleId(
        tokens,
        titleId,
        'buy'
      );

      setPropertyId(titleId);
      setPropertyInfo(tokenInfo);
      setActiveOffers(buyOffersInfo);
    }
  }, [loading, jscJurisdictionInfo]);

  return (
    <PropertyDetailsContext.Provider
      value={{
        actionName,
        propertyId,
        propertyInfo,
        propertyImages,
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
