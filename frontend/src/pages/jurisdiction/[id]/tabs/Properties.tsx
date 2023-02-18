import React, { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, CircularProgress, Divider, Text } from '@chakra-ui/react';
import Tag from '@/components/Tag';
import Paginator from '../../Paginator';
import { useRouter } from 'next/router';
import { useTitleTokens } from '@/store/useTitleTokens';
import { Link } from '@/components/Link';
import MemberOnlyButton from '@/components/MemberOnlyButton';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java' />

const Properties = () => {
  const { library } = useWeb3React();
  const router = useRouter();
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();

  const isTokensInitialized = useTitleTokens(state => state.isInitialized)
  const getTokensContractDetails = useTitleTokens(state => state.get)
  const tokenCount = useTitleTokens(state => state.tokenContracts[jurisdictionAddress]?.tokenCount)
  const { tokens, tokensLoading, loadPage } = useTitleTokens(state => ({ 
    tokens: state.tokenContracts[jurisdictionAddress]?.tokens, 
    tokensLoading: state.tokenContracts[jurisdictionAddress]?.tokensLoading, 
    loadPage: state.tokenContracts[jurisdictionAddress]?.loadPage
  }))

  const [ page, setPage ] = useState(1)
  const tokenIds = tokens?.pages[page] || []
  const tokensById = tokens?.tokensById

  const paginator = useMemo(() => (
    <Paginator
      pageSize = {12}
      totalItems = {tokenCount||0}
      currentPage = {page}
      onPageChange={n => setPage(n)} 
    />
  ), [tokenCount, page])

  // Get TitleToken contract details
  useEffect(() => {
    if (isTokensInitialized()) {
      const loadDetails = async () => {
        getTokensContractDetails(jurisdictionAddress, library)
      }      
      loadDetails();
    }
  }, [jurisdictionAddress, library, isTokensInitialized()])

  // Load currently selected page of tokens from the contract
  useEffect(() => {
    if (tokenIds.length == 0 && !tokensLoading && loadPage)
      loadPage(page)
  }, [tokensLoading, tokenIds, page])

  return (
    <>
      <Box marginBottom="20px" width="70%">
        {tokenIds.length>0 && tokenCount > 12 && paginator}

        {tokenIds.length === 0 && tokensLoading && <LoadingIcon /> }
        {tokenIds.map(tokenId => {
          const titleId = tokensById?.[tokenId]?.titleId || tokenId 
          const information = (tokensById?.[tokenId]?.frozen || false) ? 'Frozen' : ''
          return (
            <Link href={`/jurisdiction/${jurisdictionAddress}/token/${titleId}/`} variant={'15/20'} key={titleId}>
              <Tag information={information}><Text>{titleId}</Text></Tag>
            </Link>
          );
        })}

        {tokenIds.length>0 && tokenCount > 12 && paginator}
        {tokenCount === 0 && <Text>No properties found</Text>}
      </Box>
      <Box>
        <Divider m="1rem 0rem"/>
        <MemberOnlyButton 
          variant="Header" 
          onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=jsc.contracts.tokens/AddToken`)}
          disabled
          tooltip="Coming soon"
        >
            Add New Property Tokens
        </MemberOnlyButton>
      </Box>
    </>
  );
};

export default Properties;
