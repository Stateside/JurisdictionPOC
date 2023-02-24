import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, CircularProgress, Divider, Heading, HStack, Input, Link, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import AddRevisionModal, { NewRevision, ParameterValues } from './AddRevisionModal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Tag from '@/components/Tag';
import { IContract, useJurisdictions } from '@/store/useJurisdictions';
import { useWeb3React } from '@web3-react/core';
import DeleteIcon from '@/components/icons/deleteIcon';
import { useGovernors } from '@/store/useGovernors';
import { createProposalVersion } from '@/utils/proposals';
import { ethers } from 'ethers';
import { ParamType, ParamType2SolidyType } from '@/utils/types';
import Breadcrumb from '@/components/Breadcrumb';
import { accountsByAddress } from '@/utils/accounts';
import { useRecentActivities } from '@/store/useRecentActivities';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

const CreateProposal: NextPage = () => {
  const { account, chainId, library } = useWeb3React();
  const toast = useToast()
  const router = useRouter();
  const { loaded: loadedJurisdictions, loadContracts } = useJurisdictions();
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();
  const jurisdictionName = useJurisdictions(state => state.infos[jurisdictionAddress?.toLowerCase()]?.name);
  const [description, setDescription] = useState<string>('');
  const [autoOpenedRevisionModel, setAutoOpenedRevisionModel] = useState(false);
  const [newRevisions, setNewRevisions] = useState<NewRevision[]>([])
  const [editingRevision, setEditingRevision] = useState<NewRevision|undefined>()

  let childContracts = useJurisdictions(state => state.contracts[jurisdictionAddress])?.list  
  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const isGovernorContractInitialized = useGovernors(state => state.isInitialized)
  const refreshGovernorDetails = useGovernors(state => state.refresh)
  const jscGovernorDetails = useGovernors(state => state.governors[jurisdictionAddress])
  const [contracts, setContracts] = useState<IContract[]>(childContracts)
  const { saveCreateProposalActivity } = useRecentActivities();

  // Get list of contracts
  useEffect(() => {
    if (childContracts)
      setContracts([...childContracts, 
        {
          name: "jsc.contracts.jurisdiction",
          address: jurisdictionAddress,
          description: "Jurisdiction Contract"
        }].sort((a,b) => a.name.localeCompare(b.name))
      )
  }, [childContracts, jurisdictionAddress])

  // Load contracts from jurisdiciton
  useEffect(() => { loadedJurisdictions && contracts === undefined && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, loadedJurisdictions, library]);

  // Load governor details
  useEffect(() => { jurisdictionAddress && isGovernorContractInitialized() && !jscGovernorDetails && loadGovernorDetails(jurisdictionAddress, library) }, 
    [jurisdictionAddress, jscGovernorDetails, isGovernorContractInitialized(), library]);

  // Builds a NewRevision object from the data requested in the URL
  const requestedRevision:NewRevision|undefined = useMemo(() => {
    if (contracts) {
      // The parameters are provided in the URL. Use asPath instead of query in case params have same name as NextJS dynamic routes
      const queryString = router.asPath.split("?")[1]
      const queryParamsArray = queryString? queryString.split("&") : []
      const queryParamsMap: { [name:string]: string } = {}
      queryParamsArray.forEach(p => {
        const [key, value] = p.split("=")
        queryParamsMap[key] = value
      })
      
      // Separate the contract and revision from the rest of the parameters in the URL
      const {p:urlContractRevision, ...urlParams} = queryParamsMap
      const [urlContract, urlRevision] = (urlContractRevision as string)?.split("/") || []

      if (urlContract) {
        // Build the revision parameters from the URL parameters
        const revisionParams:ParameterValues = {}
        const urlParamsKeys = urlParams ? Object.keys(urlParams) : []    
        urlParamsKeys.forEach(p => {
          if (p.startsWith("_"))
            p = p.substring(1)
          revisionParams[p] = urlParams[p] as string
        })

        return {
          id: 0,
          target: contracts.find(c => c.name === urlContract)?.address || "",
          name: urlRevision,
          description: "",
          pdata: "",
          parameters: revisionParams
        }
      }
    }

    return undefined
  }, [contracts, router])

  useEffect(() => {
    if (requestedRevision && !autoOpenedRevisionModel) {
      setAutoOpenedRevisionModel(true)
      setEditingRevision({...requestedRevision})
    }
  }, [requestedRevision, autoOpenedRevisionModel])

  const isValidProposal = useCallback(() => {
    return (
      jscGovernorDetails?.instance &&
      description !== "" &&
      newRevisions.length > 0
    )
  }, [newRevisions, description])

  const getNextRevisionId = () => newRevisions.reduce((max, r) => r.id > max ? r.id : max, 0)+1

  const openRevisionModal = useMemo(() => {
      return <AddRevisionModal 
        isOpen={editingRevision!==undefined}
        jurisdictionName={jurisdictionName}
        contracts={contracts}
        revision={editingRevision||{id:0, target: "", name: "", description:"", parameters: {}}}
        setRevision={(r:NewRevision) => setEditingRevision(r) }
        onCancelAddRevision={() => { setEditingRevision(undefined); } }
        onOkAddRevision={() => { 
          if (editingRevision) 
            setNewRevisions([...newRevisions, { ...editingRevision, id:getNextRevisionId()}]); 
          setEditingRevision(undefined);
        }}
        onOkUpdateRevision={() => { 
          if (editingRevision) 
            setNewRevisions(newRevisions.map(r => r.id === editingRevision.id ? editingRevision : r)); 
          setEditingRevision(undefined);
        }}
      />
    }, [jurisdictionName, newRevisions, editingRevision, contracts])

  const saveProposalToDatabase = useCallback(async (proposalId:string, revs:NewRevision[], description:string, version:number, pdata:string[]) => {
    const blockNumber = await library.getBlockNumber();
    const blocksPerWeek = 5*60*24*7
    
    const data = {
      id: proposalId,
      startBlock: blockNumber-1,
      deadline: blockNumber+blocksPerWeek,
      proposer: account,
      version: version,
      description: description,
      chainId,
      governor: jscGovernorAddress.toLowerCase(),
      revisions: revs.map((r,i) => ({
        target: r.target.toLowerCase(),
        name: r.name,
        description: r.description,
        pdata: pdata[i],
        parameters: Object.keys(r.parameters).map(n => {
          if (r.paramNames && r.paramTypes && r.paramHints) {
            const i = r.paramNames?.indexOf(n) || 0
            return {
              name: n,
              type: r.paramTypes[i],
              hint: r.paramHints[i],
              value: r.parameters[n]
            }
          }
          else []
        })
      })),
    }

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([data])
    }

    try {
      const r = await fetch("/api/proposals/save", request)
      if (r.status !== 200)
        console.log("Error saving proposal")
    } catch(e) {
      console.log("Error saving proposal", e)
    }
  }, [account, chainId, jscGovernorAddress, library])
  
  // Call governor contract to create a proposal
  const createProposal = useCallback(async () => {
    if (!isValidProposal() || !jscGovernorDetails?.instance)
      return
    try {
      // Validate and convert parameters according to expected types.  This is important because the solidity code 
      // can sometimes, without warning, decode paramaters that have been encoded with the wrong type.
      // Lesson learned: ABI Encoding "false" or "0" as a boolean produces no error, but decoding either of them as a boolean produces true.
      const getValue = (t:ParamType, v:string) => {
        if ([ParamType.t_account, ParamType.t_contract, ParamType.t_string].includes(t))
          return v
        else if (t === ParamType.t_bool) {
          if (v === "1")
            return true
          if (v === "0")
            return false
          throw new Error(`Cannot convert ${v} to boolean`)
        }
        else if ([ParamType.t_role, ParamType.t_number].includes(t)) {
          return ethers.BigNumber.from(v)
        }
        throw new Error(`Unknown parameter type ${t}`)
      }

      // Encode parameters for all revisions
      const allPdata = newRevisions.map(r => 
        ethers.utils.defaultAbiCoder.encode(
          r.paramTypes?.map(t => ParamType2SolidyType[t]) || [],
          r.paramNames?.map((n,i) => getValue(r.paramTypes?.[i]||0, r.parameters[n])) || []))

      // Prepare arguments for propose() method
      const revs = newRevisions.map((r,i) => ({
        target: r.target,
        name: r.name,
        pdata: allPdata[i]
      }))
      const version = createProposalVersion(new Date())
      
      // Send transaction to blockchain
      await jscGovernorDetails.instanceWithSigner(library.getSigner()).propose(revs, description, version)

      // Save details of proposal to database
      const descriptionHash:string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
      const proposalId = await jscGovernorDetails?.instance.hashProposal(revs, descriptionHash, version)
      await saveProposalToDatabase(proposalId.toHexString(), newRevisions, description, version, allPdata)

      // Save in recent activities
      if (account)
        saveCreateProposalActivity(account, accountsByAddress[account.toLowerCase()]?.name||account||"Unknown", jurisdictionAddress, proposalId.toHexString(), description)

      // Clear cache for this governor
      refreshGovernorDetails(jscGovernorAddress)

      toast({
        title: 'Proposal Submitted',
        description: "The proposal has been submitted to the blockchain. It may take a few minutes to be confirmed. Reload this page in a few mintues to see the proposal.",
        status: 'success',
        duration: 3000
      })
    router.push(`/jurisdiction/${jurisdictionAddress}/proposal/${proposalId.toHexString()}`)
    } catch (error:any) {
      toast({
        title: 'Creation Failed',
        description: error.message,
        status: 'error',
        duration: 6000
      })
    }
  }, [isValidProposal, description, newRevisions, jscGovernorDetails?.instance])

  return (
    <Box width="100%">
      <Head>
        <title>Create a Proposal</title>
      </Head>
      <Breadcrumb items={[
        {label:"Jurisdiction", href:`/jurisdiction/${jurisdictionAddress}`},
        {label:"Create Proposal", href:""},
        ]}/>
      <Heading whiteSpace="pre-line" my={4} variant="80" marginBottom="48px">
        Create Proposal
      </Heading>
      <Divider marginBottom="10px" borderColor="#D3D3D3" />
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Jurisdiction Name:</Text>
            <Box>{jurisdictionName||<LoadingIcon/>}</Box>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Description:</Text>
            <Textarea width="40%" backgroundColor="#ffffff" value={description} onChange={e => setDescription(e.target.value)}/>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%" gap="1rem">
              {newRevisions.map((r,i) => (
                  <HStack width="100%" alignItems="flex-start" key={r.id}>
                    <Link
                      onClick={() => {setEditingRevision({...r})} }
                      variant={'15/20'}
                      width="85%"
                    >
                      <Tag>
                        <Text>{r.name}</Text>
                      </Tag>
                    </Link>
                    <Button width="15%" rightIcon={<DeleteIcon height={7} width={7} />} onClick={() => setNewRevisions(newRevisions.filter(rr => rr.id !== r.id))}>Remove</Button>
                  </HStack>
                ))
              }
              <Button variant="Header" onClick={() => {setEditingRevision({id:0, name:"", target:"", description:"", parameters:{}})} }>Add new revision</Button>
            </VStack>
          </HStack>
          <Divider />
          <HStack flexDirection="row-reverse" width="100%" padding="20px 0">
            <Button variant="Header" disabled={!isValidProposal()} onClick={() => createProposal()}>Create proposal</Button>
          </HStack>
        </VStack>
      </Box>
      {openRevisionModal}
    </Box>
  );
};

export default CreateProposal;
