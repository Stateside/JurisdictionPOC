import { IContract, useJurisdictions } from '@/store/useJurisdictions';
import { IRevision, useRevisions } from '@/store/useRevisions';
import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import router from 'next/router';
import { useEffect, useState } from 'react';

const AddRevisionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const { library } = useWeb3React();
  const { loaded, loadContracts } = useJurisdictions();
  const jurisdictionAddress = router.query.id as string;
  const [ selectedContract, setSelectedContract ] = useState<IContract|undefined>()
  const [ selectedRevision, setSelectedRevision ] = useState<IRevision|undefined>()
  const name = useJurisdictions(state => state.infos[jurisdictionAddress]?.name);
  const isRevisionsHookInitialized = useRevisions(state => state.isInitialized)
  const getRevisions = useRevisions(state => state.get)
  const loadRevisions = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.loadRevisions)
  const revisionsLoading = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.revisionsLoading)
  const revisions = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.revisions)
  
  const params = router.query.p as string
  const [defaultContract, defaultRevision] = params?.split("/") || []	

  // Get list of contracts
  let contracts = useJurisdictions(state => state.contracts[jurisdictionAddress])?.list
  if (contracts)
    contracts = [...contracts, {
      name: "jsc.contracts.jurisdiction",
      address: jurisdictionAddress,
      description: "Jurisdiction Contract"
    }].sort((a,b) => a.name.localeCompare(b.name))

  // Load contracts from jurisdiciton
  useEffect(() => { loaded && contracts === undefined && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, loaded, library]);

  // Load revisions from selected contract
  useEffect(() => {
    if (isRevisionsHookInitialized()) {
      if (revisions === undefined && !revisionsLoading && selectedContract && library)
        getRevisions(selectedContract?.address, library)
      else if (revisions !== undefined && revisions.length === 0 && !revisionsLoading && loadRevisions)
        loadRevisions()
  }}, [selectedContract, revisions, revisionsLoading, loadRevisions, library])

  // Set default contract and revision if provided
  if (!selectedContract && defaultContract && contracts) { 
    const c = contracts.find(c => c.name === defaultContract)
    if (c)
      setSelectedContract(c)
  }
  if (!selectedRevision && defaultRevision && revisions) { 
    const r = revisions.find(r => r.name === defaultRevision)
    if (r)
      setSelectedRevision(r)
  }

  const updateSelection = (contract:string, revision:string) => {
    setSelectedContract(contracts?.find(c => c.address === contract) || undefined)
    setSelectedRevision(revisions?.find(r => r.name === revision) || undefined)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Jurisdiction Name:</Text>
              <Text>{name}</Text>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Contract Name:</Text>
              <Select width="75%" placeholder="Choose a contract" value={selectedContract?.address||""} onChange={o => updateSelection(o.target.value, "")}>
                {
                  contracts?.map(c => (<option value={c.address} key={c.address}>{c.name}</option>))
                }
              </Select>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Revision Name:</Text>
              <Select width="75%" placeholder="Choose a revision" value={selectedRevision?.name||""} onChange={o => updateSelection(selectedContract?.address||"", o.target.value)}>
                {
                  revisions?.sort((a,b) => a.name.localeCompare(b.name)).map(r => (<option value={r.name} key={r.name}>{r.name}</option>))
                }
              </Select>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Description:</Text>
              <Textarea width="75%" value={selectedRevision?.description || ""} readOnly={true}/>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Parameters:</Text>
            </HStack>
            <Divider />
          </ModalBody>

          <ModalFooter>
            <Button variant="Header" onClick={onClose}>Create Revision</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRevisionModal;