import { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import EditIcon from '@/components/icons/editIcon';
import { ITokenContractDetails, useTitleTokens } from '@/store/useTitleTokens';
import { useAliases } from '@/store/useAliases';
import { BigNumber, ethers } from 'ethers';
import MemberOnlyButton from '@/components/MemberOnlyButton';

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

  const ChangeButton = useCallback((props: { proposal?: string }) => (
    <MemberOnlyButton width="8rem" fontSize="1rem" variant="Transparent" p="0" 
      onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=${props.proposal}`)}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Text mr="1rem">Change</Text>
        <Box mt=".4rem">
          <EditIcon height={6} width={6} />
        </Box>
      </Box>
    </MemberOnlyButton>
  ),[jurisdictionAddress]);

  const registryAccountName = getAccount(d => d?.registryAccount)
  const maintainerAccountName = getAccount(d => d?.maintainerAccount)

  return (
    <VStack alignItems="flex-start">
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Jurisdiction name:</Text>
        <Text width="65%">{name||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.jurisdiction/ChangeName'/>
      </HStack>
 
      <Divider width="100%" marginTop="1em" marginBottom="1em" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Contract address:</Text>
        <Text width="65%">{jurisdictionAddress}</Text>
        <ChangeButton proposal='jsc.contracts.jurisdiction/Upgrade'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Name:</Text>
        <Text width="65%">{tokensContractDetails?.tokenName||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeName'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Symbol:</Text>
        <Text width="65%">{tokensContractDetails?.tokenSymbol||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeSymbol'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Base Token URI:</Text>
        <Text width="65%">{tokensContractDetails?.tokenBaseURI||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeURI'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Account:</Text>
        <HStack width="65%">
          <Text>{registryAccountName || <LoadingIcon/>}</Text>
          <Text color={"brand.grey.grey03"} pl="3rem">{tokensContractDetails?.registryAccount === registryAccountName ? "" : tokensContractDetails?.registryAccount}</Text>
        </HStack>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeConfig:jsc.accounts.registry'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Fee:</Text>
        <Text width="65%">{getFee(d => d?.registryFee) || <LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeConfig:jsc.fees.registry'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Account:</Text>
        <HStack width="65%">
          <Text>{maintainerAccountName || <LoadingIcon/>}</Text>
          <Text color={"brand.grey.grey03"} pl="3rem">{tokensContractDetails?.maintainerAccount === maintainerAccountName ? "" : tokensContractDetails?.maintainerAccount}</Text>
        </HStack>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeConfig:jsc.accounts.maintainer'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Fee:</Text>
        <Text width="65%">{getFee(d => d?.maintainerFee) || <LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeConfig:jsc.fees.maintainer'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>NFT Support:</Text>
        <Text width="65%">{
          tokensContractDetails !== undefined && tokensContractDetails.nftSupport !== undefined 
          ? (tokensContractDetails.nftSupport === true ? 'Enabled' : 'Disabled')
          : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeConfig:jsc.nft.enabled'/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

    </VStack>
  );
};

export default Config;
