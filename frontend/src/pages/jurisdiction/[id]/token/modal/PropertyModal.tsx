import { useEffect, useContext, useState } from 'react';
import {
  Grid,
  GridItem,
  Input,
  Select,
  FormLabel,
  FormErrorMessage,
  FormControl,
  HStack,
  Text
} from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';
import { deepCopy } from 'utils/util';
import SpecialSelect from '@/components/SpecialSelect';
import { useAliases } from '@/store/useAliases';
import { ActionNames } from '@/utils/property-types';

type PropertyModal = {
  gridLayout: string;
  type: ActionNames
};

export default function PropertyModal({ gridLayout, type }: PropertyModal) {
  const {
    propertyId,
    ownerAddress,
    selectedOffer,
    sellFormModel,
    handleInputChange,
    handleSelectChange,
    setSellFormModel,
  } = useContext(PropertyDetailsContext);
  const { aliasesByAddress } = useAliases()
  const [ recipientName, setRecipientName ] = useState('');

  useEffect(() => {
    const modelCopy = deepCopy(sellFormModel);
    modelCopy.fields.tokenId.value = propertyId;
    modelCopy.fields.price.value = selectedOffer?.price.toString() || "";
    modelCopy.fields.recipientAddress.value = selectedOffer?.address || "";
    modelCopy.fields.expiresAfter.value = selectedOffer?.expiresAfter.toString() || "";

    const lca = modelCopy.fields.recipientAddress?.value.toLowerCase()
    if (aliasesByAddress?.[lca])
      setRecipientName(aliasesByAddress[lca].alias)

    setSellFormModel(modelCopy)
  }, [propertyId, selectedOffer, aliasesByAddress]);

  let readOnly = ["OfferToSell", "OfferToBuy"].includes(type) == false
  let showRecipient = type !== "OfferToBuy"

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
          <GridItem colSpan={2}>
            <FormLabel htmlFor="tokenId">Token ID:</FormLabel>
          </GridItem>
          <GridItem colSpan={10}>
            {sellFormModel.fields.tokenId.value}
            <Input
              type="hidden"
              name="tokenId"
              placeholder="Token ID"
              value={sellFormModel.fields.tokenId.value}
              readOnly={readOnly}
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
            <GridItem colSpan={2}>
              <FormLabel>Price (ETH):</FormLabel>
            </GridItem>
            <GridItem colSpan={10}>
              <Input
                type="number"
                name="price"
                placeholder="ETH Price"
                autoComplete='off'
                value={sellFormModel.fields.price.value}
                onChange={e => handleInputChange(e)}
                readOnly={readOnly}
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
          display={showRecipient ? 'block' : 'none'}
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
            <GridItem colSpan={2}>Recipient Address:</GridItem>
            <GridItem colSpan={10}>
              <HStack>
                {
                  !readOnly &&
                    <SpecialSelect
                      width='35%'
                      value={(recipientName || sellFormModel.fields.recipientAddress.value) ? { label: recipientName, value: sellFormModel.fields.recipientAddress.value } : { label: '', value: '' }}
                      options={aliasesByAddress}
                      onChange={(selectedOption: any) => {
                        if (selectedOption === undefined) {
                          setRecipientName("");
                        }
                        else {
                          setRecipientName(selectedOption.label); 
                          if (selectedOption.label !== selectedOption.value)
                            handleInputChange({
                              currentTarget: {
                                value:selectedOption.value, 
                                name:"recipientAddress", 
                                required: true,
                              } as any} as any)
                        }
                      }}
                    />
                }
                {
                  readOnly &&
                    <Input
                      width='35%'
                      value={recipientName}
                      readOnly
                    />
                }
                <Input
                  name="recipientAddress" 
                  width='65%'
                  placeholder="Recipient wallet address"
                  value={sellFormModel.fields.recipientAddress.value}
                  onChange={handleInputChange}
                  readOnly={readOnly}
                />
              </HStack>
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
            <GridItem colSpan={2}>Expires after:</GridItem>
            <GridItem colSpan={10}>
              {
                readOnly ? <Text>{sellFormModel.fields.expiresAfter.value} days</Text>
                : <Select
                    name="expiresAfter"
                    placeholder="Select an expiry date"
                    required
                    value={sellFormModel.fields.expiresAfter.value}
                    onChange={handleSelectChange}
                  >
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="10">10 days</option>
                  </Select>
              }
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
