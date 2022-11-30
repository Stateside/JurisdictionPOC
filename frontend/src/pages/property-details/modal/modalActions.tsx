import { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';

type PropertyDetailsModalActions = {};

export default function PropertyDetailsModalActions({}: PropertyDetailsModalActions) {
  const { actionName, actionButtonDisabled, propertyDetailsModalAction } =
    useContext(PropertyDetailsContext);
  return (
    <Button
      variant="Header"
      mt={{ base: '30px' }}
      mr={3}
      onClick={propertyDetailsModalAction}
      _hover={{
        background: 'brand.javaHover',
      }}
      disabled={!actionButtonDisabled}
    >
      {actionName === 'sell' ? 'Sell Property' : 'Accept Offer'}
    </Button>
  );
}
