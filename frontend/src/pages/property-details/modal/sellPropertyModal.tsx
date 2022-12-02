import { useEffect, useContext } from 'react';
import {
  Grid,
  GridItem,
  Input,
  Select,
  FormLabel,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';
import { deepCopy } from 'utils/util';

type SellPropertyModal = {
  gridLayout: string;
};

export default function SellPropertyModal({ gridLayout }: SellPropertyModal) {
  const {
    propertyId,
    sellFormModel,
    handleInputChange,
    handleSelectChange,
    setSellModelField,
  } = useContext(PropertyDetailsContext);

  useEffect(() => {
    const modelCopy = deepCopy(sellFormModel);

    modelCopy.fields.tokenId.value = propertyId;

    const fieldName = 'tokenId';
    const newModel = modelCopy.fields.tokenId;

    setSellModelField({ fieldName, newModel });
  }, []);

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
          <GridItem colSpan={6}>
            {sellFormModel.fields.tokenId.value}
            <Input
              type="hidden"
              name="tokenId"
              placeholder="Token ID"
              value={sellFormModel.fields.tokenId.value}
            />
          </GridItem>
        </Grid>
        <FormControl
          isInvalid={
            sellFormModel.fields.price.touched &&
            !sellFormModel.fields.price.valid
          }
        >
          <Grid
            templateColumns={gridLayout}
            pt={30}
            pb={30}
            borderBottom="1px solid"
            borderColor={'brand.grey.grey02'}
          >
            <GridItem colSpan={3}>
              <FormLabel>Price:</FormLabel>
            </GridItem>
            <GridItem colSpan={6}>
              <Input
                type="number"
                name="price"
                placeholder="ETH Price"
                min="1"
                max="9999"
                required
                value={sellFormModel.fields.price.value}
                onChange={handleInputChange}
              />
              {sellFormModel.fields.price.touched &&
                !sellFormModel.fields.price.valid && (
                  <FormErrorMessage>
                    Price is required or invalid.
                  </FormErrorMessage>
                )}
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl
          isInvalid={
            sellFormModel.fields.recipientAddress.touched &&
            !sellFormModel.fields.recipientAddress.valid
          }
        >
          <Grid
            templateColumns={gridLayout}
            pt={30}
            pb={30}
            borderBottom="1px solid"
            borderColor={'brand.grey.grey02'}
          >
            <GridItem colSpan={3}>Recipient Address:</GridItem>
            <GridItem colSpan={6}>
              <Input
                name="recipientAddress"
                placeholder="Recipient wallet address"
                required
                value={sellFormModel.fields.recipientAddress.value}
                onChange={handleInputChange}
              />
              {sellFormModel.fields.recipientAddress.touched &&
                !sellFormModel.fields.recipientAddress.valid && (
                  <FormErrorMessage>
                    Recipient wallet address is required or invalid.
                  </FormErrorMessage>
                )}
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl
          isInvalid={
            sellFormModel.fields.expiresAfter.touched &&
            !sellFormModel.fields.expiresAfter.valid
          }
        >
          <Grid templateColumns={gridLayout} pt={30} pb={30}>
            <GridItem colSpan={3}>Expires after:</GridItem>
            <GridItem colSpan={3}>
              <Select
                name="expiresAfter"
                placeholder="Select an expiry date"
                required
                value={sellFormModel.fields.expiresAfter.value}
                onChange={handleSelectChange}
              >
                <option value="three-days">3 days</option>
                <option value="six-days">6 days</option>
                <option value="ten-days">10 days</option>
              </Select>
              {sellFormModel.fields.expiresAfter.touched &&
                !sellFormModel.fields.expiresAfter.valid && (
                  <FormErrorMessage>
                    Expiry date is required or invalid.
                  </FormErrorMessage>
                )}
            </GridItem>
          </Grid>
        </FormControl>
      </GridItem>
    </Grid>
  );
}
