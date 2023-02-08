import { useContext } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';
import { ActionNames, OnDoneFunction } from '@/utils/property-types';

type PropertyDetailsModalActions = {
  type: ActionNames
  actionButtonDisabled: boolean
  onDone: OnDoneFunction
};

export default function PropertyDetailsModalActions({type, onDone, actionButtonDisabled}: PropertyDetailsModalActions) {
  const { propertyDetailsModalAction, onClose } = useContext(PropertyDetailsContext);
  let btnText = ""
  if (type === "AcceptOfferToSell" || type === "AcceptOfferToBuy") 
    btnText = "Accept Offer"
  if (type === "OfferToSell" || type === "OfferToBuy") 
    btnText = "Make Offer"
  if (type === "RetractOfferToSell" || type === "RetractOfferToBuy") 
    btnText = "Retract Offer"

  return (
    <HStack>
      <Button
        variant="Header"
        onClick={onClose}
        _hover={{
          background: 'brand.javaHover',
        }}
      >
        Close
      </Button>
      { btnText &&
        <Button
          variant="Header"
          onClick={() => propertyDetailsModalAction(onDone)}
          _hover={{
            background: 'brand.javaHover',
          }}
          disabled={actionButtonDisabled}
        >
          {btnText}
        </Button>
      }
    </HStack>
  );
}
