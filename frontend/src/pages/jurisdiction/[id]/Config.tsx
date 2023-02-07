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
import { useGovernors } from '@/store/useGovernors';
import { buildRoles } from '@/utils/roles';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1em" color='brand.java'/>
type AccountGetter = (details:ITokenContractDetails) => string|undefined
type FeeGetter = (details:ITokenContractDetails) => BigNumber|undefined

const Config = () => {
  const router = useRouter();
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();
  const { library } = useWeb3React();
  
  const name = useJurisdictions(state => state.infos[jurisdictionAddress]?.name);
  const isTokensInitialized = useTitleTokens(state => state.isInitialized)
  const getTokensContractDetails = useTitleTokens(state => state.get)
  const tokensContractDetails = useTitleTokens(state => state.tokenContracts[jurisdictionAddress])
  const { getAlias, aliasesByAddress } = useAliases()

  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const jscGovernorDetails = useGovernors(state => state.governors[jscGovernorAddress])
  const jscGovernor = jscGovernorDetails?.instance

  const [jscVotingPeriod, setJscVotingPeriod] = useState<number|undefined>()
  const [jscVotingApprovals, setJscVotingApprovals] = useState<number|undefined>()
  const [jscVotingMajority, setJscVotingMajority] = useState<number|undefined>()
  const [jscVotingQuorum, setJscVotingQuorum] = useState<number|undefined>()
  const [jscVotingRole, setJscVotingRole] = useState<string|undefined>()

  // Load contracts from jurisdiciton
  useEffect(() => { jurisdictionsLoaded && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, jurisdictionsLoaded, library]);

  // Load governor details
  useEffect(() => { jscGovernorAddress && !jscGovernorDetails && loadGovernorDetails(jscGovernorAddress, library) }, 
    [jscGovernorAddress, jscGovernorDetails, library]);

  useEffect(() => {
    if (jscGovernor) {
      const loadVoting = async () => {
        const vp = await jscGovernor.getNumberParameter("jsc.voting.period")
        const va = await jscGovernor.getNumberParameter("jsc.voting.approvals")
        const vm = await jscGovernor.getNumberParameter("jsc.voting.majority")
        const vq = await jscGovernor.getNumberParameter("jsc.voting.quorum")
        const vr = await jscGovernor.getStringParameter("jsc.voting.role")
        setJscVotingPeriod(vp.toNumber())
        setJscVotingApprovals(va.toNumber())
        setJscVotingMajority(vm.toNumber())
        setJscVotingQuorum(vq.toNumber())
        setJscVotingRole(vr)
      }
      loadVoting()
    }
  }, [jscGovernor])
  
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

  const ChangeButton = useCallback((props: { proposal?: string, disabled?: boolean, tooltip?:string }) => (
    <MemberOnlyButton width="8rem" fontSize="1rem" variant="Transparent" p="0" disabled={props.disabled} tooltip={props.tooltip} 
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
        <ChangeButton proposal='jsc.contracts.jurisdiction/ChangeName' disabled tooltip="Coming soon"/>
      </HStack>
 
      <Divider width="100%" marginTop="1em" marginBottom="1em" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Contract address:</Text>
        <Text width="65%">{jurisdictionAddress}</Text>
        <ChangeButton proposal='jsc.contracts.jurisdiction/Upgrade' disabled tooltip="Coming soon"/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Name:</Text>
        <Text width="65%">{tokensContractDetails?.tokenName||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeName' disabled tooltip="Coming soon"/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Symbol:</Text>
        <Text width="65%">{tokensContractDetails?.tokenSymbol||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeSymbol' disabled tooltip="Coming soon"/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Base Token URI:</Text>
        <Text width="65%">{tokensContractDetails?.tokenBaseURI||<LoadingIcon/>}</Text>
        <ChangeButton proposal='jsc.contracts.tokens/ChangeURI' disabled tooltip="Coming soon"/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Account:</Text>
        <HStack width="65%">
          <Text>{registryAccountName || <LoadingIcon/>}</Text>
          <Text color={"brand.grey.grey03"} pl="3rem">{tokensContractDetails?.registryAccount === registryAccountName ? "" : tokensContractDetails?.registryAccount}</Text>
        </HStack>
        <ChangeButton proposal={`jsc.contracts.tokens/ChangeConfig:jsc.accounts.registry&name=jsc.accounts.registry&value=${tokensContractDetails?.registryAccount}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Fee:</Text>
        <Text width="65%">{getFee(d => d?.registryFee) || <LoadingIcon/>}</Text>
        <ChangeButton proposal={`jsc.contracts.tokens/ChangeConfig:jsc.fees.registry&name=jsc.fees.registry&value=${tokensContractDetails?.registryFee}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Account:</Text>
        <HStack width="65%">
          <Text>{maintainerAccountName || <LoadingIcon/>}</Text>
          <Text color={"brand.grey.grey03"} pl="3rem">{tokensContractDetails?.maintainerAccount === maintainerAccountName ? "" : tokensContractDetails?.maintainerAccount}</Text>
        </HStack>
        <ChangeButton proposal={`jsc.contracts.tokens/ChangeConfig:jsc.accounts.maintainer&name=jsc.accounts.maintainer&value=${tokensContractDetails?.maintainerAccount}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Fee:</Text>
        <Text width="65%">{getFee(d => d?.maintainerFee) || <LoadingIcon/>}</Text>
        <ChangeButton proposal={`jsc.contracts.tokens/ChangeConfig:jsc.fees.maintainer&name=jsc.fees.maintainer&value=${tokensContractDetails?.maintainerFee}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>NFT Support:</Text>
        <Text width="65%">{
          tokensContractDetails !== undefined && tokensContractDetails.nftSupport !== undefined 
          ? (tokensContractDetails.nftSupport === true ? 'Enabled' : 'Disabled')
          : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.tokens/ChangeConfig:jsc.nft.enabled&name=jsc.nft.enabled&value=${tokensContractDetails?.nftSupport?"0":"1"}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Period:</Text>
        <Text width="65%">{
          jscVotingPeriod !== undefined 
            ? jscVotingPeriod + " blocks"
            : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.governor/ChangeConfig:jsc.voting.period&name=jsc.voting.period&value=${jscVotingPeriod}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Approvals:</Text>
        <Text width="65%">{
          jscVotingApprovals !== undefined 
            ? jscVotingApprovals
            : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.governor/ChangeConfig:jsc.voting.approvals&name=jsc.voting.approvals&value=${jscVotingApprovals}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Majority:</Text>
        <Text width="65%">{
          jscVotingMajority !== undefined 
            ? jscVotingMajority+"%"
            : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.governor/ChangeConfig:jsc.voting.majority&name=jsc.voting.majority&value=${jscVotingMajority}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Quorum:</Text>
        <Text width="65%">{
          jscVotingQuorum !== undefined 
            ? jscVotingQuorum+"%"
            : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.governor/ChangeConfig:jsc.voting.approvals&name=jsc.voting.approvals&value=${jscVotingQuorum}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Role:</Text>
        <Text width="65%">{
          jscVotingRole !== undefined 
            ? buildRoles(ethers).rolesById[jscVotingRole]?.name || jscVotingRole || "Any"
            : <LoadingIcon/>}
        </Text>
        <ChangeButton proposal={`jsc.contracts.governor/ChangeConfig:jsc.voting.role&name=jsc.voting.role&value=${jscVotingRole}`}/>
      </HStack>

      <Divider width="100%" margin="2em 0" />

    </VStack>
  );
};

export default Config;
