import { IContract } from '@/store/useJurisdictions';
import { IRevision, useRevisions } from '@/store/useRevisions';
import { ParamType } from '@/utils/types';
import { capitalizeString } from '@/utils/util';
import { Button, Divider, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Text, Textarea, VStack, Code, CircularProgress } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useMemo } from 'react';
import { IJSCConfigurable__factory } from '../../../../../../typechain-types';
import Parameter from './Parameter';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

export type ParameterValues = {
  [name: string]: string
}

export type NewRevision = {
  id: number
  target: string
  name: string
  description: string
  parameters: ParameterValues
  paramNames?: string[]
  paramTypes?: ParamType[]
  paramHints?: string[]
}

export type Props = {
  jurisdictionName: string
  revision: NewRevision
  contracts: IContract[]
  isOpen: boolean
  setRevision: (r: NewRevision) => void
  onOkAddRevision: () => void
  onOkUpdateRevision: () => void
  onCancelAddRevision: () => void
}

const AddRevisionModal = ({ jurisdictionName, revision, setRevision, contracts, isOpen, onOkAddRevision, onOkUpdateRevision, onCancelAddRevision }: Props) => {
  const { library } = useWeb3React();
  const isRevisionsHookInitialized = useRevisions(state => state.isInitialized)
  const getRevisions = useRevisions(state => state.get)
  const selectedContract = revision.target ? contracts?.find(c => c.address === revision.target) : undefined
  const loadRevisions = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.loadRevisions)
  const revisionsLoading = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.revisionsLoading)
  const revisions = useRevisions(state => state.revisions?.[selectedContract?.address as any]?.revisions)
  const selectedRevision = revision.name ? revisions?.find(r => r.name === revision.name) : undefined

  // Load revisions from selected contract
  useEffect(() => {
    if (isRevisionsHookInitialized()) {
      if (revisions === undefined && !revisionsLoading && selectedContract && library)
        getRevisions(selectedContract?.address, library)
      else if (revisions !== undefined && revisions.length === 0 && !revisionsLoading && loadRevisions)
        loadRevisions()
    }
  }, [selectedContract, revisions, revisionsLoading, loadRevisions, library])

  const areParameterValuesValid = useCallback(() => {
    if (!selectedContract || !selectedRevision)
      return false

    for (let i = 0; i < selectedRevision.paramNames.length; i++) {
      if (!revision.parameters[selectedRevision.paramNames[i]])
        return false
    }

    return true
  }, [selectedContract, selectedRevision, revision.parameters])

  const updateRevision = useCallback((paramName:string, value: string, rev: IRevision) => {
    setRevision({
      ...revision,
      parameters: {
        ...revision.parameters,
        [paramName]: value
      },
      paramNames: rev.paramNames,
      paramTypes: rev.paramTypes,
      paramHints: rev.paramHints
    })
  }, [revision, setRevision])

  /** Updated the selected contract and revision */
  const updateSelection = useCallback((contract: string, revName: string) => {
    let params = revision.parameters
    if (contract !== revision.target || revName !== revision.name)
      params = {}
    setRevision({
      ...revision,
      target: contract,
      name: revName,
      description: selectedRevision?.description||"",
      parameters: params,
      paramNames: selectedRevision?.paramNames,
      paramTypes: selectedRevision?.paramTypes,
      paramHints: selectedRevision?.paramHints
    })
  }, [revision, selectedRevision, setRevision])

  useEffect(() => {
    // If the selected revision is a config paramater update, and new values have not been specified, then insert current values 
    const loadCurrentValue = async () => {
      if (selectedContract && selectedRevision && selectedRevision.paramTypes && selectedRevision.name.startsWith("ChangeConfig:") && revision.parameters.value === undefined) {
        const configParamName = selectedRevision.name.split(":")[1]
        const instance = IJSCConfigurable__factory.connect(selectedContract?.address, library)
        let value = undefined 
        switch(selectedRevision.paramTypes[1]) {
          case ParamType.t_account:
            value = await instance.getAccountParameter(configParamName)
            break;
          case ParamType.t_contract:
            value = await instance.getContractParameter(configParamName)
            break;
          case ParamType.t_bool:
            value = await instance.getBoolParameter(configParamName) ? "1" : "0"
            break;
          case ParamType.t_number:
            value = await (await instance.getNumberParameter(configParamName)).toHexString()
            break;
          case ParamType.t_role:
            value = await (await instance.getRoleParameter(configParamName)).toHexString()
            break;
          case ParamType.t_string:
            value = await instance.getStringParameter(configParamName)
            break;
        }

        if (value !== undefined)
          setRevision({
            ...revision,
            parameters: {...revision.parameters, value},
          })
      }
    }

    loadCurrentValue()
  }, [selectedContract?.address, selectedRevision?.name, library, setRevision])

  useEffect(() => {
    if (selectedRevision && selectedRevision.name.startsWith("ChangeConfig:")) {
      const name = selectedRevision?.name?.split(":")[1]
      if (name !== revision.parameters.name)
        setRevision({
          ...revision,
          parameters: {...revision.parameters, name }
        })
    }
  }, [selectedRevision?.name, revision.parameters.name, setRevision])

  useEffect(() => {
    // This is called the first time the modal is displayed with URL parameters
    // and then when the user selects a new revision or contract from the dropdowns
    if (!revision.description && selectedRevision?.description)
      updateSelection(selectedContract?.address || "", selectedRevision?.name || "")
  }, [selectedRevision?.description, selectedContract?.address, selectedRevision?.name, revision, updateSelection])

  const parameterComponents = useMemo(() => {
    return selectedRevision?.paramNames.map((p, i) => (
      <HStack alignItems="flex-start" padding="20px 0" width="100%" key={p}>
        <Text width="5rem">{capitalizeString(p)}:</Text>
        <Parameter 
          name={p}
          hint={selectedRevision.paramHints[i]}
          type={selectedRevision.paramTypes[i]}
          value={revision.parameters[p] || ""}
          onChange={value => updateRevision(p, value, selectedRevision) }
        />
      </HStack>
    ))
  }, [selectedRevision, updateRevision, revision])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancelAddRevision} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Revision</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="15%">Jurisdiction Name:</Text>
              <Text>{jurisdictionName}</Text>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="15%">Contract Name:</Text>
              <Select width="65%" placeholder="Choose a contract" value={selectedContract?.address || ""} onChange={o => updateSelection(o.target.value, "")}>
                {
                  contracts?.map(c => (<option value={c.address} key={c.address}>{c.name}</option>))
                }
              </Select>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="15%">Revision Name:</Text>
              {
                revisions === undefined || revisionsLoading
                  ? <LoadingIcon/> 
                  : <Select width="65%" placeholder="Choose a revision" value={selectedRevision?.name || ""} onChange={o => updateSelection(selectedContract?.address || "", o.target.value)}>
                      {
                        revisions?.sort((a, b) => a.name.localeCompare(b.name)).map(r => (<option value={r.name} key={r.name}>{r.name}</option>))
                      }
                    </Select>
              }
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="15%">Description:</Text>
              <Textarea width="65%" value={selectedRevision?.description || ""} readOnly={true} />
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="15%">Parameters:</Text>
              <VStack alignItems="flex-start" width="65%">
                {parameterComponents}
              </VStack>
            </HStack>
            <Divider />
          </ModalBody>

          <ModalFooter>
            <Button variant="Header"
              onClick={onCancelAddRevision}>Cancel</Button>
            <Button ml="2rem" variant="Header"
              onClick={() => {
                if (revision.id === 0)
                  onOkAddRevision()
                else
                  onOkUpdateRevision()
              }
              }
              disabled={!areParameterValuesValid()}>{revision.id === 0 ? "Create" : "Save"} Revision</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRevisionModal;