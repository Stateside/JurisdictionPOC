import { useCallback, useEffect, useState } from 'react';
import { Button, CircularProgress, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import EditIcon from '@/components/icons/editIcon';
import { ITokenContractDetails, useTitleTokens } from '@/store/useTitleTokens';
import { useAliases } from '@/store/useAliases';
import { BigNumber, ethers } from 'ethers';

const ChangeButton = (props:{onClick?: () => void}) => (
  <Button width="15%" rightIcon={<EditIcon height={6} width={6} />} variant="Transparent" onClick={props.onClick}>
    <Text pr={3}>Change</Text>
  </Button>)

const LoadingIcon = () => <CircularProgress isIndeterminate size="1em" color='brand.java'/>
type AccountGetter = (details:ITokenContractDetails) => string|undefined
type FeeGetter = (details:ITokenContractDetails) => BigNumber|undefined

const Config = () => {
  const router = useRouter();
  const jurisdictionAddress = router.query.id as string;
  const { library } = useWeb3React();
  
  const name = useJurisdictions(state => state.infos[jurisdictionAddress]?.name);
  const isTokensInitialized = useTitleTokens(state => state.isInitialized)
  const getTokensContractDetails = useTitleTokens(state => state.get)
  const tokensContractDetails = useTitleTokens(state => state.tokenContracts[jurisdictionAddress])
  const { getAlias, aliasesByAddress } = useAliases()

  // Get TitleToken contract details
  useEffect(() => {
    if (isTokensInitialized()) {
      const loadDetails = async () => {
        getTokensContractDetails(jurisdictionAddress, library)
      }      
      loadDetails();
    }
  }, [jurisdictionAddress, library, isTokensInitialized()])

  const getAccount = useCallback((getter:AccountGetter) => {
    if (!tokensContractDetails) 
      return ''
    const account = getter(tokensContractDetails)
    const alias = (account && aliasesByAddress) ? getAlias(account) : account
    return alias == ethers.constants.AddressZero ? 'None' : alias
  }, [tokensContractDetails, aliasesByAddress])

  const getFee = useCallback((getter:FeeGetter) => {
    if (!tokensContractDetails) 
      return ''
    const fee = getter(tokensContractDetails)
    return !fee || fee == ethers.constants.Zero ? 'None' : ethers.utils.formatUnits(fee, "gwei") + " gwei"
  }, [tokensContractDetails, aliasesByAddress])

  return (
    <VStack alignItems="flex-start">
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Jurisdiction name:</Text>
        <Text width="65%">{name||<LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>
 
      <Divider width="100%" marginTop="1em" marginBottom="1em" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Contract address:</Text>
        <Text width="65%">{jurisdictionAddress}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Name:</Text>
        <Text width="65%">{tokensContractDetails?.tokenName||<LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Symbol:</Text>
        <Text width="65%">{tokensContractDetails?.tokenSymbol||<LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Base Token URI:</Text>
        <Text width="65%">{tokensContractDetails?.tokenBaseURI||<LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Account:</Text>
        <Text width="65%">{getAccount(d => d?.registryAccount) || <LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Fee:</Text>
        <Text width="65%">{getFee(d => d?.registryFee) || <LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Account:</Text>
        <Text width="65%">{getAccount(d => d?.maintainerAccount) || <LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Fee:</Text>
        <Text width="65%">{getFee(d => d?.maintainerFee) || <LoadingIcon/>}</Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>NFT Support:</Text>
        <Text width="65%">{
          tokensContractDetails !== undefined && tokensContractDetails.nftSupport !== undefined 
          ? (tokensContractDetails.nftSupport === true ? 'Enabled' : 'Disabled')
          : <LoadingIcon/>}
        </Text>
        <ChangeButton/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

    </VStack>
  );
};

export default Config;
