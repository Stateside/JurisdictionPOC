import { ReactNode } from 'react';
import { Box } from '@chakra-ui/layout';
import { ActionNames } from '@/utils/property-types';

type PropertyDetailsModalHeader = {
  type: ActionNames
};
export default function PropertyDetailsModalHeader({
  type,
}: PropertyDetailsModalHeader) {
  let title = ""
  switch (type) {
    case 'OfferToSell':
    case 'AcceptOfferToSell':
    case 'RetractOfferToSell':
    case 'ViewOfferToSell':
        title = "Offer to Sell"
      break;
    default:
      title = "Offer to Buy"
      break;
  }

  return (
    <Box as="span" fontWeight="400" fontSize={{ base: '60px' }}>
      {title}
    </Box>
  );
}
