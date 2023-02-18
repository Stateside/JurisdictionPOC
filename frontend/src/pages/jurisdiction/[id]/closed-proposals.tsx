import type { NextPage } from 'next'
import Head from 'next/head'
import { Link } from '@/components/Link';
import { Box, Heading, Text, CircularProgress } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IProposalDetails, useGovernors } from '@/store/useGovernors';
import { useWeb3React } from '@web3-react/core';
import Paginator from '../Paginator';
import Tag from '@/components/Tag';
import { ProposalState } from '@/utils/types';
import Breadcrumb from '@/components/Breadcrumb';

const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>
const PAGE_SIZE = 12

const ClosedProposals: NextPage = () => {
  const { library } = useWeb3React();
  const router = useRouter();

  // First load jurisdiction, then contracts, then Governor, then proposals...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();

  const loadGovernorDetails = useGovernors(state => state.get)
  const isGovernorContractInitialized = useGovernors(state => state.isInitialized)
  const jscGovernorDetails = useGovernors(state => state.governors[jurisdictionAddress])
  const proposalIds = jscGovernorDetails?.proposalIds
  const proposals = jscGovernorDetails?.proposals
  
  const activeOrLoading = (p:IProposalDetails) => p.status===ProposalState.Active || p.status === undefined
  const closedProposalIds = proposalIds?.filter(id => proposals&&!activeOrLoading(proposals[id]))
  const proposalCount = closedProposalIds?.length || 0
  
  const [ page, setPage ] = useState(1)
  
  // Load governor details
  useEffect(() => { jurisdictionAddress && isGovernorContractInitialized() && !jscGovernorDetails && loadGovernorDetails(jurisdictionAddress, library) }, 
  [jurisdictionAddress, jscGovernorDetails, isGovernorContractInitialized(), library]);

  // Load governor proposals
  useEffect(() => {
    if (jscGovernorDetails && !jscGovernorDetails.proposalsLoading && !jscGovernorDetails.allProposalsLoaded) {
      jscGovernorDetails.loadAllProposals()
    }
  }, [jscGovernorDetails]);
  
  // Load proposal details for each proposal if not loaded or loading
  useEffect(() => {
    if (proposalIds?.length) {
      proposalIds.forEach(id => {
        const pd = proposals && proposals[id]
        if (pd && !pd.detailsLoading && !pd.revisions) {
          pd.loadDetails()
        }
      })
    }
  }, [proposalIds])

  const paginator = useMemo(() => (
    <Paginator
      pageSize = {PAGE_SIZE}
      totalItems = {proposalCount}
      currentPage = {page}
      onPageChange={n => setPage(n)} 
    />
  ), [proposalCount, page])

  const getTag = (id:string, name:string, status?:string) => (
    <Link href={"/jurisdiction/"+jurisdictionAddress+"/proposal/"+id} variant={'15/20'} key={id}>
      <Tag information={status}>
        <Text>{name}</Text>
      </Tag>
    </Link>)
    
  return (
    <>
      <Box width="100%">
        <Head>
          <title>Closed Proposals</title>
        </Head>
        <Breadcrumb items={[
          {label:"Jurisdiction", href:`/jurisdiction/${jurisdictionAddress}`},
          {label:"Closed Proposals", href:""},
        ]}/>
        <Heading whiteSpace="pre-line" variant="80" my={4} marginBottom="48px">
          Closed Proposals
        </Heading>
      </Box>
      <Box marginBottom="20px" width="70%">
        {proposalCount > PAGE_SIZE && paginator}

        {closedProposalIds?.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE).map(pid => {
          const p = proposals?.[pid]
          return p?.description ? (
            getTag(pid, p.description, p.status!==undefined?ProposalState[p.status]:'checking...')
          ) : (
            <Tag key={pid} caret={<LoadingCaret />} information='checking...'>
              <Text variant={'15/20'}>{pid}</Text>
            </Tag>
          );
        })}

        {proposalCount > PAGE_SIZE && paginator}
      </Box>
      {(jscGovernorDetails?.allProposalsLoaded && (closedProposalIds === undefined || closedProposalIds.length === 0)) && <Text>No closed proposals found</Text>}
  </>
);

}

export default ClosedProposals