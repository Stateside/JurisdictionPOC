import { useContext } from 'react';
import {
  Grid,
  GridItem,
  FormLabel,
} from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';

type AcceptOfferModal = {
  gridLayout: string;
};

export default function AcceptOfferModal({ gridLayout }: AcceptOfferModal) {
  const { selectedOfferIndex, activeOffers } = useContext(
    PropertyDetailsContext
  );
  const offerSelected = activeOffers[selectedOfferIndex || 0];
  return (
    <Grid templateColumns={gridLayout}>
      <GridItem colSpan={12}>
        <Grid
          templateColumns={gridLayout}
          pt={30}
          pb={30}
          borderBottom="1px solid"
          borderColor={'brand.grey.grey02'}
        >
          <GridItem colSpan={3}>
            <FormLabel htmlFor="tokenId">Token ID:</FormLabel>
          </GridItem>
          <GridItem colSpan={6}>{offerSelected.tokenId}</GridItem>
        </Grid>
        <Grid
          templateColumns={gridLayout}
          pt={30}
          pb={30}
          borderBottom="1px solid"
          borderColor={'brand.grey.grey02'}
        >
          <GridItem colSpan={3}>
            <FormLabel>From:</FormLabel>
          </GridItem>
          <GridItem colSpan={6}>{offerSelected.fromAddress}</GridItem>
        </Grid>
        <Grid
          templateColumns={gridLayout}
          pt={30}
          pb={30}
          borderBottom="1px solid"
          borderColor={'brand.grey.grey02'}
        >
          <GridItem colSpan={3}>Amount:</GridItem>
          <GridItem colSpan={6}>{offerSelected.price} ETH</GridItem>
        </Grid>
        <Grid templateColumns={gridLayout} pt={30} pb={30}>
          <GridItem colSpan={3}>Expires after:</GridItem>
          <GridItem colSpan={3}>in {offerSelected.expiresAfter} days</GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
