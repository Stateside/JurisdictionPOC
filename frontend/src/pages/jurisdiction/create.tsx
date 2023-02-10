import type { NextPage } from 'next'
import Head from 'next/head'
import { Tooltip } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Checkbox, CircularProgress, CircularProgressLabel, Divider, Heading, HStack, Input, Select, Switch, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Role, buildRoles } from "../../utils/roles"
import DeleteIcon from '@/components/icons/deleteIcon';
import SpecialSelect from '@/components/SpecialSelect';
import { Deployments, IMember, Jurisdiction, JurisdictionId } from 'classes/jurisdiction';
import create from 'zustand'
import shallow from 'zustand/shallow'
import useBlockchain from 'hooks/useBlockchain';
import { ContractDefinition } from '@/utils/standard-contracts';
import { useRouter } from 'next/router';
import { JurisdictionStatus, useJurisdictions } from '@/store/useJurisdictions';
import { useAliases } from '@/store/useAliases';
import { ethers } from 'ethers';
import SelectRole from '@/components/SelectRole';

// Use Zustand for managing state changes to Jurisdiction

interface IJurisdictionState {
  jurisdiction: Jurisdiction,
  modified: boolean,
  reset: () => void,
  setJurisdictionName: (name: string) => void,
  setTitleTokenName: (name: string) => void,
  setTitleTokenSymbol: (symbol: string) => void,
  setTitleTokenURI: (uri: string) => void,
  setRegistryAddress: (address: string) => void,
  setRegistryFee: (fee: ethers.BigNumber) => void,
  setMaintainerAddress: (address: string) => void,
  setMaintainerFee: (fee: ethers.BigNumber) => void,
  setNFTSupport: (support: boolean) => void,
  setVotingPeriod: (blocks: number) => void,
  setVotingApprovals: (approvals: number) => void,
  setVotingMajority: (majority: number) => void,
  setVotingQuorum: (quorum: number) => void,
  setVotingRole: (role: string) => void,
  addMember: (member: IMember) => void,
  removeMember: (index: number) => void,
  replaceMember: (index: number, member: IMember) => void,
  addContract: (contract: ContractDefinition) => void,
  removeContract: (index: number) => void,
  replaceContract: (index: number, contract: ContractDefinition) => void
}

/** Create Zustand state with instance of Jurisdiction class and methods to update it. This lets us optimize the rendering */
const useNewJurisdiction = create<IJurisdictionState>((set) => ({
  jurisdiction: Jurisdiction.createDefaultJurisdiction(),
  modified: false,
  reset: () => set(state => ({ jurisdiction: Jurisdiction.createDefaultJurisdiction(), modified: false })),
  setJurisdictionName: (name: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, jurisdictionName: name }), modified: true })),
  setTitleTokenName: (name: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, titleTokenName: name }), modified: true })),
  setTitleTokenSymbol: (symbol: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, titleTokenSymbol: symbol }), modified: true })),
  setTitleTokenURI: (uri: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, titleTokenURI: uri }), modified: true })),
  setRegistryAddress: (address: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, registryAddress: address }), modified: true })),
  setRegistryFee: (fee: ethers.BigNumber) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, registryFee: fee }), modified: true })),
  setMaintainerAddress: (address: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, maintainerAddress: address }), modified: true })),
  setMaintainerFee: (fee: ethers.BigNumber) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, maintainerFee: fee }), modified: true })),
  setNFTSupport: (enabled: boolean) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, nftSupport: enabled }), modified: true })),
  setVotingPeriod: (blocks: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, votingPeriod: blocks }), modified: true })),
  setVotingApprovals: (approvals: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, votingApprovals: approvals }), modified: true })),
  setVotingMajority: (majority: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, votingMajority: majority }), modified: true })),
  setVotingQuorum: (quorum: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, votingQuorum: quorum }), modified: true })),
  setVotingRole: (role: string) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, votingRole: role }), modified: true })),
  addMember: (member: IMember) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, members: [...state.jurisdiction.members, member] }), modified: true })),
  removeMember: (index: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, members: state.jurisdiction.members.filter((_: IMember, i: number) => i !== index) }), modified: true })),
  replaceMember: (index: number, member: IMember) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, members: state.jurisdiction.members.map((m, i) => i === index ? member : m) }), modified: true })),
  addContract: (contract: ContractDefinition) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, contracts: [...state.jurisdiction.contracts, contract] }), modified: true })),
  removeContract: (index: number) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, contracts: state.jurisdiction.contracts.filter((_, i) => i !== index) }), modified: true })),
  replaceContract: (index: number, contract: ContractDefinition) => set(state => ({ jurisdiction: Jurisdiction.copy({ ...state.jurisdiction, contracts: state.jurisdiction.contracts.map((c, i) => i === index ? contract : c) }), modified: true }))
}))

const greenButtonProps = { _hover: { background: "brand.javaHover" }, variant: 'Header' }
const invalidProps = { borderColor: "red", color: "red" }

const roles = buildRoles(ethers)

/** Component for creating a new jurisdiction */
const CreateJurisdiction: NextPage = () => {
  const router = useRouter()
  const { chainId, web3Provider } = useBlockchain();
  const jurisdiction = useNewJurisdiction(state => state.jurisdiction, shallow)
  const isJurisdictionModified = useNewJurisdiction(state => state.modified)
  const resetJurisdiction = useNewJurisdiction(state => state.reset)
  const setJurisdictionName = useNewJurisdiction(state => state.setJurisdictionName)
  const setTitleTokenName = useNewJurisdiction(state => state.setTitleTokenName)
  const setTitleTokenSymbol = useNewJurisdiction(state => state.setTitleTokenSymbol)
  const setTitleTokenURI = useNewJurisdiction(state => state.setTitleTokenURI)
  const [registryAccountName, setRegistryAccountName] = useState("")
  const setRegistryAddress = useNewJurisdiction(state => state.setRegistryAddress)
  const [registryFeeUI, setRegistryFeeUI] = useState("0")
  const setRegistryFee = useNewJurisdiction(state => state.setRegistryFee)
  const [maintainerAccountName, setMaintainerAccountName] = useState("")
  const setMaintainerAddress = useNewJurisdiction(state => state.setMaintainerAddress)
  const [maintainerFeeUI, setMaintainerFeeUI] = useState("0")
  const setMaintainerFee = useNewJurisdiction(state => state.setMaintainerFee)
  const setNFTSupport = useNewJurisdiction(state => state.setNFTSupport)
  const [votingPeriodUI, setVotingPeriodUI] = useState("0")
  const setVotingPeriod = useNewJurisdiction(state => state.setVotingPeriod)
  const [votingApprovalsUI, setVotingApprovalsUI] = useState("0")
  const setVotingApprovals = useNewJurisdiction(state => state.setVotingApprovals)
  const [votingMajorityUI, setVotingMajorityUI] = useState("0")
  const setVotingMajority = useNewJurisdiction(state => state.setVotingMajority)
  const [votingQuorumUI, setVotingQuorumUI] = useState("0")
  const setVotingQuorum = useNewJurisdiction(state => state.setVotingQuorum)
  const setVotingRole = useNewJurisdiction(state => state.setVotingRole)
  const addMember = useNewJurisdiction(state => state.addMember)
  const removeMember = useNewJurisdiction(state => state.removeMember)
  const replaceMember = useNewJurisdiction(state => state.replaceMember)

  const { isOpen: isErrorAlertOpen, onOpen: onErrorAlertOpen, onClose: onCloseErrorAlert } = useDisclosure()
  const cancelErrorRef = useRef<HTMLButtonElement | null>(null)
  const [deployError, setDeployError] = useState<string>()

  const { isOpen: isProgressAlertOpen, onOpen: onProgressAlertOpen, onClose: onCloseProgressAlert } = useDisclosure()
  const cancelProgressRef = useRef<HTMLButtonElement | null>(null)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [progressLabel, setProgressLabel] = useState<string>("")

  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberAddress, setNewMemberAddress] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<Role>()

  const { aliases, aliasesByAddress, aliasesByName, addAliases, loaded: aliasesLoaded } = useAliases()
  const [successfulDeployments, setSuccessfulDeployments] = useState<Deployments | undefined>()

  const cacheJurisdiction = useJurisdictions(state => state.add)

  useEffect(() => {
    if (aliasesLoaded) {
      // Add some sample members to the new jurisdictions
      if (jurisdiction.members.length === 0 && !isJurisdictionModified)
        aliases.slice(0, 5).forEach(a => {
          addMember({ name: a.alias, address: a.address, role: roles.EXECUTIVE_ROLE })
        })
    }
  }, [addMember, jurisdiction.members, aliases, aliasesLoaded])

  // Memoized callbacks

  const getNameForAddress = useCallback((address: string) => {
    const address_lc = address.toLowerCase()
    const acc = aliasesByAddress[address_lc]?.alias
    return acc ? acc : ""
  }, [aliasesByAddress])

  const getAddressForName = useCallback((name: string) => {
    const name_lc = name.toLowerCase()
    const acc = aliasesByName[name_lc]?.address
    return acc ? acc : ""
  }, [aliasesByName])

  // Get default values for the jurisdiction
  useEffect(() => {
    if (maintainerAccountName === "" && jurisdiction.maintainerAddress !== "")
      setMaintainerAccountName(getNameForAddress(jurisdiction.maintainerAddress))
    if (registryAccountName === "" && jurisdiction.registryAddress !== "")
      setRegistryAccountName(getNameForAddress(jurisdiction.registryAddress))
    if (registryFeeUI === "0" && !jurisdiction.registryFee.eq(ethers.constants.Zero))
      setRegistryFeeUI(ethers.utils.formatUnits(jurisdiction.registryFee, "gwei"))
    if (maintainerFeeUI === "0" && !jurisdiction.maintainerFee.eq(ethers.constants.Zero))
      setMaintainerFeeUI(ethers.utils.formatUnits(jurisdiction.maintainerFee, "gwei"))
    if (votingPeriodUI === "0" && jurisdiction.votingPeriod !== 0)
      setVotingPeriodUI(jurisdiction.votingPeriod.toString())
    if (votingApprovalsUI === "0" && jurisdiction.votingApprovals !== 0)
      setVotingApprovalsUI(jurisdiction.votingApprovals.toString())
    if (votingMajorityUI === "0" && jurisdiction.votingMajority !== 0)
      setVotingMajorityUI(jurisdiction.votingMajority.toString())
    if (votingQuorumUI === "0" && jurisdiction.votingQuorum !== 0)
      setVotingQuorumUI(jurisdiction.votingQuorum.toString())
  }, [jurisdiction, getNameForAddress, maintainerAccountName, registryAccountName, registryFeeUI, maintainerFeeUI])

  const updateMemberAddress = useCallback((index: number, m: IMember, value: string): void => {
    // Update name if it is the default name, if it is a new name then leave it as is
    let expectedName: string = getNameForAddress(m.address)
    let newName: string = getNameForAddress(value)
    if (m.name !== "" && m.name !== expectedName)
      newName = m.name
    replaceMember(index, { ...m, address: value, name: newName })
  }, [replaceMember, getNameForAddress])

  const updateNewMemberAddress = useCallback((value: string): void => {
    // Update name if it is the default name, if it is a new name then leave it as is
    let expectedName: string = getNameForAddress(newMemberAddress)
    let newName: string = getNameForAddress(value)
    if (newMemberName !== "" && newMemberName !== expectedName)
      newName = newMemberName
    setNewMemberName(newName)
    setNewMemberAddress(value)
  }, [newMemberAddress, newMemberName, getNameForAddress])

  const updateNewMemberAccountName = useCallback((value: string): void => {
    // Update address if it is empty or if it matches the address for the previous value of the name
    let expectedAddress: string = getAddressForName(newMemberName)
    let newAddress: string = getAddressForName(value)
    if (newMemberAddress !== "" && newMemberAddress !== expectedAddress)
      newAddress = newMemberAddress
    setNewMemberName(value)
    setNewMemberAddress(newAddress)
  }, [jurisdiction.maintainerAddress, getAddressForName])

  const updateRegistryAddress = useCallback((value: string): void => {
    // Update name if it is the default name, if it is a new name then leave it as is
    let expectedName: string = getNameForAddress(jurisdiction.registryAddress)
    let newName: string = getNameForAddress(value)
    if (registryAccountName !== "" && registryAccountName !== expectedName)
      newName = registryAccountName
    setRegistryAccountName(newName)
    setRegistryAddress(value)
  }, [jurisdiction.registryAddress, registryAccountName, getNameForAddress])

  const updateRegistryAccountName = useCallback((value: string): void => {
    // Update address if it is empty or if it matches the address for the previous value of the name
    let expectedAddress: string = getAddressForName(registryAccountName)
    let newAddress: string = getAddressForName(value)
    if (jurisdiction.registryAddress !== "" && jurisdiction.registryAddress !== expectedAddress)
      newAddress = jurisdiction.registryAddress
    setRegistryAccountName(value)
    setRegistryAddress(newAddress)
  }, [jurisdiction.registryAddress, getAddressForName])

  // This is a function to ensure that the value has no spaces and contains at least a 0 
  const cleanNumber = useCallback((value: string) => {
    value = value === undefined ? "" : value.trim()
    value = value === "" ? "0" : value
    return value
  }, [])

  const isValidGwei = useCallback((value: string) => {
    try {
      value = cleanNumber(value)
      ethers.utils.parseUnits(value, "gwei")
      return true
    } catch (e) {
      return false
    }
  }, [])

  const isValidNumber = useCallback((value: string, min: number = 0, max?: number) => {
    value = cleanNumber(value)
    const n = Number(value)
    return !isNaN(n) && n >= min && (max === undefined || n <= max)
  }, [])

  const updateRegistryFee = useCallback((value: string) => {
    // The UI displays the fee in gwei and the contract stores the fee in wei
    // Set the value in the contract only if it is a valid number in the UI
    value = cleanNumber(value)
    try {
      const fee = ethers.utils.parseUnits(value, "gwei")
      setRegistryFee(fee)
    } catch (e) {
      console.log("Invalid fee value")
    }
    setRegistryFeeUI(value)
  }, [])

  const updateMaintainerAddress = useCallback((value: string): void => {
    // Update name if it is the default name, if it is a new name then leave it as is
    let expectedName: string = getNameForAddress(jurisdiction.maintainerAddress)
    let newName: string = getNameForAddress(value)
    if (maintainerAccountName !== "" && maintainerAccountName !== expectedName)
      newName = maintainerAccountName
    setMaintainerAccountName(newName)
    setMaintainerAddress(value)
  }, [jurisdiction.maintainerAddress, maintainerAccountName, getNameForAddress])

  const updateMaintainerAccountName = useCallback((value: string): void => {
    // Update address if it is empty or if it matches the address for the previous value of the name
    let expectedAddress: string = getAddressForName(maintainerAccountName)
    let newAddress: string = getAddressForName(value)
    if (jurisdiction.maintainerAddress !== "" && jurisdiction.maintainerAddress !== expectedAddress)
      newAddress = jurisdiction.maintainerAddress
    setMaintainerAccountName(value)
    setMaintainerAddress(newAddress)
  }, [jurisdiction.maintainerAddress, getAddressForName])

  const updateMaintainerFee = useCallback((value: string) => {
    // The UI displays the fee in gwei and the contract stores the fee in wei
    // Set the value in the contract only if it is a valid number in the UI
    value = cleanNumber(value)
    try {
      const fee = ethers.utils.parseUnits(value, "gwei")
      setMaintainerFee(fee)
    } catch (e) {
      console.log("Invalid fee value")
    }
    setMaintainerFeeUI(value)
  }, [])

  const updateVotingPeriod = useCallback((value: string) => {
    value = cleanNumber(value)
    if (isValidNumber(value))
      setVotingPeriod(parseInt(value))
    setVotingPeriodUI(value)
  }, [])

  const updateVotingApprovals = useCallback((value: string) => {
    value = cleanNumber(value)
    if (isValidNumber(value))
      setVotingApprovals(parseInt(value))
    setVotingApprovalsUI(value)
  }, [])

  const updateVotingMajority = useCallback((value: string) => {
    value = cleanNumber(value)
    if (isValidNumber(value, 0, 100))
      setVotingMajority(parseInt(value))
    setVotingMajorityUI(value)
  }, [])

  const updateVotingQuorum = useCallback((value: string) => {
    value = cleanNumber(value)
    if (isValidNumber(value, 0, 100))
      setVotingQuorum(parseInt(value))
    setVotingQuorumUI(value)
  }, [])

  const isEmptyRegistryAddress = useCallback((): boolean => {
    return registryAccountName === "" && jurisdiction.registryAddress === ""
  }, [registryAccountName, jurisdiction.registryAddress])

  const isValidRegistryAddress = useCallback((): boolean => {
    return jurisdiction.registryAddress !== "" &&
      jurisdiction.isValidAddress(jurisdiction.registryAddress)
  }, [jurisdiction.registryAddress, jurisdiction.isValidAddress])

  const isEmptyMaintainerAddress = useCallback((): boolean => {
    return maintainerAccountName === "" && jurisdiction.maintainerAddress === ""
  }, [maintainerAccountName, jurisdiction.maintainerAddress])

  const isValidMaintainerAddress = useCallback((): boolean => {
    return jurisdiction.maintainerAddress !== "" &&
      jurisdiction.isValidAddress(jurisdiction.maintainerAddress)
  }, [jurisdiction.maintainerAddress, jurisdiction.isValidAddress])

  const isEmptyNewMember = useCallback((): boolean => {
    return newMemberName === "" && newMemberAddress === "" && newMemberRole === undefined
  }, [newMemberName, newMemberAddress, newMemberRole])

  const isValidNewMember = useCallback((): boolean => {
    return newMemberAddress !== "" &&
      newMemberRole !== undefined &&
      jurisdiction.isValidAddress(newMemberAddress) &&
      !jurisdiction.existsMemberAddress(newMemberAddress)
  }, [newMemberAddress, newMemberRole, jurisdiction.members, jurisdiction.isValidAddress, jurisdiction.existsMemberAddress])

  const addNewMember = useCallback((): void => {
    if (isValidNewMember() && newMemberRole !== undefined) {
      addMember({ name: newMemberName, address: newMemberAddress, role: newMemberRole })
      setNewMemberName("")
      setNewMemberAddress("")
      setNewMemberRole(undefined)
    }
  }, [addMember, newMemberName, newMemberAddress, newMemberRole, isValidNewMember])

  const isValidForm = useCallback((): boolean => {
    return (
      jurisdiction.isValid()
      && (isValidNewMember() || isEmptyNewMember())
      && (isValidMaintainerAddress() || isEmptyMaintainerAddress())
      && (isValidRegistryAddress() || isEmptyRegistryAddress())
      && isValidGwei(registryFeeUI)
      && isValidGwei(maintainerFeeUI)
      && web3Provider
    )
  }, [jurisdiction, isValidNewMember, isEmptyNewMember, web3Provider])

  const onClickCancelDeployment = useCallback(() => {
    onCloseProgressAlert()
  }, [onCloseProgressAlert])

  const onClickCloseDeployment = useCallback(() => {
    onCloseProgressAlert()
    const jurisdictionAddress = successfulDeployments && successfulDeployments["IJSCJurisdiction"] && successfulDeployments["IJSCJurisdiction"].contract.address
    if (jurisdictionAddress)
      router.push(`/jurisdiction/${jurisdictionAddress}`)
  }, [onCloseProgressAlert, successfulDeployments, router])

  const startingStep = useCallback(async (jurisdiction: Jurisdiction, progress: number, name: string) => {
    setProgressLabel(name)
  }, [])

  const onDeployed = useCallback(async (jurisdiction: Jurisdiction, progress: number, type: string, key: string, address: string) => {
    setProgressValue(progress)
    console.log(`deployed: ${key} ${type} at ${address} - progress = ${progress}`)
  }, [])

  const onInitialized = useCallback(async (jurisdiction: Jurisdiction, progress: number, type: string, key: string, address: string) => {
    setProgressValue(progress)
    console.log(`initialized: ${key} ${type} at ${address} - progress = ${progress}`)
  }, [])

  const onError = useCallback(async (jurisdiction: Jurisdiction, msg: string, successfulDeployments: Deployments) => {
    onCloseProgressAlert()
    setDeployError(msg)
    onErrorAlertOpen()
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
  }, [onCloseProgressAlert, onErrorAlertOpen])

  const onCancelled = useCallback(async (jurisdiction: Jurisdiction, successfulDeployments: Deployments) => {
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
  }, [onCloseProgressAlert])

  const onCompleted = useCallback(async (jurisdiction: Jurisdiction, successfulDeployments: Deployments) => {
    setProgressValue(1)
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
    cacheJurisdiction({
      address: successfulDeployments["IJSCJurisdiction"].contract.address,
      name: jurisdiction.jurisdictionName,
      version: successfulDeployments["IJSCJurisdiction"].definition.version,
      description: successfulDeployments["IJSCJurisdiction"].definition.description,
      status: JurisdictionStatus.Exists,
      createdAt: new Date()
    })

    addAliases([
      {
        address: jurisdiction.registryAddress,
        alias: registryAccountName
      },
      {
        address: jurisdiction.maintainerAddress,
        alias: maintainerAccountName
      }])
  }, [jurisdiction.registryAddress, jurisdiction.maintainerAddress, registryAccountName, maintainerAccountName])

  const deploy = useCallback(async () => {
    setProgressValue(0)
    setSuccessfulDeployments(undefined)
    onProgressAlertOpen()
    jurisdiction.deploy(await web3Provider.getSigner(), { startingStep, onDeployed, onInitialized, onError, onCancelled, onCompleted })
  }, [jurisdiction, web3Provider, onProgressAlertOpen, onDeployed, onInitialized, onError, onCancelled, onCompleted])

  const reset = useCallback(async () => {
    resetJurisdiction()
    setNewMemberName("")
    setNewMemberAddress("")
    setNewMemberRole(undefined)
  }, [resetJurisdiction])

  // Memoized components

  const progressDialog = useMemo(() => (
    <AlertDialog
      motionPreset='slideInBottom'
      isOpen={isProgressAlertOpen}
      leastDestructiveRef={cancelProgressRef}
      onClose={onCloseProgressAlert}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {progressValue < 1 ? "Deployment in progress" : "Deployment complete!"}
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack>
              <HStack>
                <CircularProgress value={progressValue * 100 || 5} color='green.400'>
                  <CircularProgressLabel>{Math.round(progressValue * 100) || 5}%</CircularProgressLabel>
                </CircularProgress>
                <Text>{progressValue < 1 ? progressLabel + "..." : "Deployment complete!"}</Text>
              </HStack>
              <Text>Please check MetaMask for new transactions.</Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelProgressRef} onClick={progressValue === 1 ? onClickCloseDeployment : onClickCancelDeployment}>
              {progressValue == 1 ? "Close" : "Cancel"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  ), [isProgressAlertOpen, onClickCloseDeployment, onClickCancelDeployment, progressValue, progressLabel, onCloseProgressAlert])

  const errorDialog = useMemo(() => (
    <AlertDialog
      motionPreset='slideInBottom'
      isOpen={isErrorAlertOpen}
      leastDestructiveRef={cancelErrorRef}
      onClose={onCloseErrorAlert}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Deployment Error
          </AlertDialogHeader>

          <AlertDialogBody>
            {deployError || "Deployment failed"}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelErrorRef} onClick={onCloseErrorAlert}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  ), [isErrorAlertOpen, onCloseErrorAlert, deployError])

  const jurisdictionNameRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Jurisdiction Name:</Text>
      <Input width="80%" value={jurisdiction.jurisdictionName} onChange={(e) => setJurisdictionName(e.target.value)} />
    </HStack>
  ), [jurisdiction.jurisdictionName])

  const jurisdictionContractRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Jurisdiction Contract:</Text>
      <Select
        bg="white"
        borderWidth={1}
        value={JurisdictionId}
        width="40%"
        onChange={() => { }}
      >
        <option key={JurisdictionId} value={JurisdictionId}>{JurisdictionId}</option>
      </Select>
    </HStack>
  ), [JurisdictionId])

  const titleTokenRows = useMemo(() => (
    <VStack width="100%">
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Name:</Text>
        <Input width="80%" value={jurisdiction.titleTokenName} onChange={(e) => setTitleTokenName(e.target.value)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token Symbol:</Text>
        <Input width="80%" value={jurisdiction.titleTokenSymbol} onChange={(e) => setTitleTokenSymbol(e.target.value)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Title Token URI:</Text>
        <Input width="80%" value={jurisdiction.titleTokenURI} onChange={(e) => setTitleTokenURI(e.target.value)} />
      </HStack>
    </VStack>
  ), [jurisdiction.titleTokenName, jurisdiction.titleTokenSymbol, jurisdiction.titleTokenURI])

  const titleFeesRows = useMemo(() => (
    <VStack width="100%">
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Account:</Text>
        <SpecialSelect
          width='20%'
          value={(registryAccountName || jurisdiction.registryAddress) ? { label: registryAccountName, value: jurisdiction.registryAddress } : { label: '', value: '' }}
          options={aliasesByAddress}
          onChange={(selectedOption: any) => {
            if (selectedOption.label === selectedOption.value) {
              updateRegistryAccountName(selectedOption.label)
            } else {
              updateRegistryAccountName(selectedOption.label)
              updateRegistryAddress(selectedOption.value)
            }

          }}
        />
        <Input width="60%" value={jurisdiction.registryAddress} onChange={(e) => updateRegistryAddress(e.target.value)} {...(isValidRegistryAddress() || isEmptyRegistryAddress()) ? {} : invalidProps} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Registry Fee:</Text>
        <Input width="80%" value={registryFeeUI} onChange={(e) => updateRegistryFee(e.target.value)} {...(isValidGwei(registryFeeUI) ? {} : invalidProps)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Account:</Text>
        <SpecialSelect
          width='20%'
          value={(maintainerAccountName || jurisdiction.maintainerAddress) ? { label: maintainerAccountName, value: jurisdiction.maintainerAddress } : { label: '', value: '' }}
          options={aliasesByAddress}
          onChange={(selectedOption: any) => {
            if (selectedOption.label === selectedOption.value) {
              updateMaintainerAccountName(selectedOption.label)
            } else {
              updateMaintainerAccountName(selectedOption.label)
              updateMaintainerAddress(selectedOption.value)
            }

          }}
        />
        <Input width="60%" value={jurisdiction.maintainerAddress} onChange={(e) => updateMaintainerAddress(e.target.value)} {...(isEmptyMaintainerAddress() || isValidMaintainerAddress()) ? {} : invalidProps} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Maintainer Fee:</Text>
        <Input width="80%" value={maintainerFeeUI} onChange={(e) => updateMaintainerFee(e.target.value)} {...(isValidGwei(maintainerFeeUI) ? {} : invalidProps)} />
      </HStack>
    </VStack>
  ), [jurisdiction.registryAddress, jurisdiction.registryFee, jurisdiction.maintainerAddress, jurisdiction.maintainerFee, registryAccountName, maintainerAccountName, registryFeeUI, maintainerFeeUI])

  const nftSupporRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Enable NFT Support:</Text>
      <Switch size='lg' isChecked={jurisdiction.nftSupport} onChange={(e) => setNFTSupport(e.target.checked)} variant={jurisdiction.nftSupport ? "java" : ""} />
    </HStack>
  ), [jurisdiction.nftSupport])

  const votingRows = useMemo(() => (
    <>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Period:</Text>
        <Input width="80%" value={votingPeriodUI} onChange={(e) => updateVotingPeriod(e.target.value)} {...(isValidNumber(votingPeriodUI) ? {} : invalidProps)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Approvals:</Text>
        <Input width="80%" value={votingApprovalsUI} onChange={(e) => updateVotingApprovals(e.target.value)} {...(isValidNumber(votingApprovalsUI) ? {} : invalidProps)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Majority:</Text>
        <Input width="80%" value={votingMajorityUI} onChange={(e) => updateVotingMajority(e.target.value)} {...(isValidNumber(votingMajorityUI, 0, 100) ? {} : invalidProps)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Quorum:</Text>
        <Input width="80%" value={votingQuorumUI} onChange={(e) => updateVotingQuorum(e.target.value)} {...(isValidNumber(votingQuorumUI, 0, 100) ? {} : invalidProps)} />
      </HStack>
      <HStack width="100%">
        <Text width="20%" fontSize='md'>Voting Role:</Text>
        <SelectRole isValid={jurisdiction.votingRole !== undefined} value={jurisdiction.votingRole} onChange={role => setVotingRole(role)} />
      </HStack>
    </>
  ), [jurisdiction.votingPeriod, jurisdiction.votingApprovals, votingPeriodUI, votingApprovalsUI, votingMajorityUI, votingQuorumUI, jurisdiction.votingMajority, jurisdiction.votingQuorum, jurisdiction.votingRole])

  const newMemberRow = useMemo(() => (
    <HStack width="100%">
      <SpecialSelect
            width='20%'
            value={(newMemberName || newMemberAddress) ? { label: newMemberName, value: newMemberAddress } : { label: '', value: '' }}
            options={aliasesByAddress}
            onChange={(selectedOption: any) => {
              if (selectedOption.label === selectedOption.value) {
                updateNewMemberAccountName(selectedOption.label)
              } else {
                updateNewMemberAccountName(selectedOption.label)
                updateNewMemberAddress(selectedOption.value)
              }
            }}
          />
      <Input width="55%" value={newMemberAddress} onChange={(e) => updateNewMemberAddress(e.target.value)} {...(isValidNewMember() || isEmptyNewMember()) ? {} : invalidProps} />
      <SelectRole isValid={newMemberRole !== undefined || isEmptyNewMember()} width="15%" value={newMemberRole?.id || ""} onChange={setNewMemberRole} />
      <Button width="15%" {...isValidNewMember() ? greenButtonProps : ""} onClick={() => addNewMember()}>Add</Button>
    </HStack>
  ), [newMemberName, newMemberAddress, newMemberRole, jurisdiction.members])

  const newMemberMaxReached = useMemo(() => (
    <HStack width="100%">
      <Input disabled width="15%" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} />
      <Input disabled width="55%" value={newMemberAddress} onChange={(e) => updateNewMemberAddress(e.target.value)} {...(isValidNewMember() || isEmptyNewMember()) ? {} : invalidProps} />
      <SelectRole disabled isValid={newMemberRole !== undefined || isEmptyNewMember()} width="15%" value={newMemberRole?.id || ""} onChange={setNewMemberRole} />
      <Tooltip label={`You've reached maximum number of members`}>
        <Button disabled width="15%" {...isValidNewMember() ? greenButtonProps : ""} onClick={() => addNewMember()}>Add</Button>
      </Tooltip>
    </HStack>
  ), [newMemberName, newMemberAddress, newMemberRole, jurisdiction.members])

  const membersRows = useMemo(() => (
    <VStack spacing={4}>
      {jurisdiction.members.map((m: IMember, i: number) => (
        <HStack width="100%" key={i}>
          <SpecialSelect
            width='20%'
            value={(m.name || m.address) ? { label: m.name, value: m.address } : { label: '', value: '' }}
            options={aliasesByAddress}
            onChange={(selectedOption: any) => {
              if (selectedOption.label === selectedOption.value) {
                replaceMember(i, { ...m, name: selectedOption.label })
              } else {
                replaceMember(i, { ...m, name: selectedOption.label })
                updateMemberAddress(i, m, selectedOption.value)
              }

            }}
          />
          <Input width="55%" value={m.address} onChange={(e) => updateMemberAddress(i, m, e.target.value)}  {...(jurisdiction.isValidAddress(m.address) && !jurisdiction.existsMemberAddress(m.address, 2)) ? {} : invalidProps} />
          <SelectRole width="15%" isValid={m.role !== undefined} value={m.role.id || ""} onChange={role => replaceMember(i, { ...m, role })} />
          <Button width="15%" rightIcon={<DeleteIcon height={7} width={7} />} onClick={() => removeMember(i)}>Remove</Button>
        </HStack>
      ))}
      {jurisdiction.members.length <= 9 ? newMemberRow : newMemberMaxReached}
    </VStack>
  ), [jurisdiction.members, newMemberRow])

  const contractsRows = useMemo(() => (
    <VStack spacing={4}>
      {jurisdiction.contracts.map((c: ContractDefinition) => (
        <HStack width="100%" key={c.key}>
          <Text width="20%" fontSize='md'>{c.key}</Text>
          <Select
            bg="white"
            borderWidth={1}
            value={c.id}
            width="80%"
            onChange={() => { }}
          >
            <option key={c.id} value={c.id}>{c.id}</option>
          </Select>

        </HStack>
      ))}
      <HStack width="100%" justifyContent="flex-start">
        <Button onClick={async () => Jurisdiction.saveMemberInfo(jurisdiction.members)}>Add new contract</Button>
      </HStack>
    </VStack>
  ), [jurisdiction.contracts, deploy])

  const configSection = useMemo(() => (
    <VStack alignItems="flex-start" spacing={4}>
      {jurisdictionNameRow}
      {jurisdictionContractRow}
      {titleTokenRows}
      {titleFeesRows}
      {nftSupporRow}
      {votingRows}
    </VStack>
  ), [jurisdictionNameRow, jurisdictionContractRow, titleTokenRows, titleFeesRows, nftSupporRow, votingRows])

  const membersSection = useMemo(() => membersRows, [membersRows])

  const contractsSection = useMemo(() => contractsRows, [contractsRows])

  const sections = [
    { name: "Configuration", content: configSection },
    { name: "Members", content: membersSection },
    { name: "Contracts", content: contractsSection },
  ]

  const submitButtons = useMemo(() => {
    return (
      <HStack width="100%" justifyContent="flex-end">
        <Button {...greenButtonProps} onClick={() => reset()}>Reset All</Button>
        <Button {...(isValidForm() ? greenButtonProps : "")} onClick={() => isValidForm() && deploy()} >Create Jurisdiction</Button>
      </HStack>)
  }, [isValidForm, deploy, reset])

  const page = useMemo(() => (
    <Box width="100%">
      <Head>
        <title>Create a Jurisdiction</title>
      </Head>

      <Divider width="100%" marginBottom="1em" />
      <VStack>
        {
          sections.map((section, i) => {
            return (
              <Box key={section.name} width="100%">
                {i > 0 && <Divider width="100%" margin="2em 0" border="1px" />}
                <Heading as='h2' size='md' marginBottom="1em">{i + 1}. {section.name}</Heading>
                <Box width="100%">{section.content}</Box>
              </Box>
            )
          })
        }
      </VStack>
      <Divider width="100%" margin="2em 0" />
      {submitButtons}
      {errorDialog}
      {progressDialog}
    </Box>
  ), [sections, submitButtons, errorDialog, progressDialog])

  return page
}

export default CreateJurisdiction;