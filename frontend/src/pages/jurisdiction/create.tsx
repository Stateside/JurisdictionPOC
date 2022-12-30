import type { NextPage } from 'next'
import Head from 'next/head'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, CircularProgress, CircularProgressLabel, Divider, HStack, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as roles from "../../utils/roles"
import DeleteIcon from '@/components/icons/deleteIcon';
import { Deployments, IMember, Jurisdiction, JurisdictionId } from 'classes/jurisdiction';
import create from 'zustand'
import shallow from 'zustand/shallow'
import useBlockchain from 'hooks/useBlockchain';
import { ContractDefinition } from '@/utils/standard-contracts';
import { AliasData, reloadAliases } from '@/utils/aliases';
import { useRouter } from 'next/router';

// Use Zustand for managing state changes to Jurisdiction

interface IJurisdictionState {
  jurisdiction:Jurisdiction,
  modified: boolean,
  reset: () => void,
  setJurisdictionName: (name:string) => void,
  setTitleTokenName: (name:string) => void,
  setTitleTokenSymbol: (symbol:string) => void,
  setTitleTokenURI: (uri:string) => void,
  addMember: (member:IMember) => void,
  removeMember: (index:number) => void,
  replaceMember: (index:number, member:IMember) => void,
  addContract: (contract:ContractDefinition) => void,
  removeContract: (index:number) => void,
  replaceContract: (index:number, contract:ContractDefinition) => void
}

/** Create Zustand state with instance of Jurisdiction class and methods to update it. This lets us optimize the rendering */
const useJurisdiction = create<IJurisdictionState>((set) => ({
  jurisdiction: Jurisdiction.createDefaultJurisdiction(),
  modified: false,
  reset: () => set(state => ({jurisdiction: Jurisdiction.createDefaultJurisdiction(), modified: false})),
  setJurisdictionName: (name:string) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, jurisdictionName: name}), modified: true})),
  setTitleTokenName: (name:string) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, titleTokenName: name}), modified: true})),
  setTitleTokenSymbol: (symbol:string) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, titleTokenSymbol: symbol}), modified: true})),
  setTitleTokenURI: (uri:string) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, titleTokenURI: uri}), modified: true})),
  addMember: (member:IMember) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, members: [...state.jurisdiction.members, member]}), modified: true})),
  removeMember: (index:number) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, members: state.jurisdiction.members.filter((_:IMember, i:number) => i !== index)}), modified: true})),
  replaceMember: (index:number, member:IMember) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, members: state.jurisdiction.members.map((m, i) => i === index ? member : m)}), modified: true})),
  addContract: (contract:ContractDefinition) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, contracts: [...state.jurisdiction.contracts, contract]}), modified: true})),
  removeContract: (index:number) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, contracts: state.jurisdiction.contracts.filter((_, i) => i !== index)}), modified: true})),
  replaceContract: (index:number, contract:ContractDefinition) => set(state => ({jurisdiction: Jurisdiction.copy({...state.jurisdiction, contracts: state.jurisdiction.contracts.map((c, i) => i === index ? contract : c)}), modified: true}))
}))

const greenButtonProps = {_hover: { background: "brand.javaHover" }, variant: 'Header'}
const invalidMemberAddressProps = { borderColor:"red", color:"red" }

/** Props for RoleSelector component */
type RoleSelectorProps = {
  required:boolean
  value:string
  isValid:boolean
  width:string
  onChange:ChangeEventHandler<HTMLSelectElement>
}

/** Select component for selecting a role */
const RoleSelector = (props:RoleSelectorProps) => 
  <Select
    placeholder="Role?"
    bg="white"
    {...(props.isValid ? {} : invalidMemberAddressProps)}
    borderWidth={1}
    required={props.required}
    value={props.value}
    width={props.width}
    onChange={props.onChange}
  >
    {roles.rolesArray.map((r:roles.Role) => (<option key={r.id} value={r.friendlyName}>{r.friendlyName}</option>))}
  </Select>

/** Component for creating a new jurisdiction */
const CreateJurisdiction: NextPage = () => {
  const router = useRouter()
  const { chainId, web3Provider } = useBlockchain();
  const jurisdiction = useJurisdiction(state => state.jurisdiction, shallow)
  const isJurisdictionModified = useJurisdiction(state => state.modified)
  const resetJurisdiction = useJurisdiction(state => state.reset)
  const setJurisdictionName = useJurisdiction(state => state.setJurisdictionName)
  const setTitleTokenName = useJurisdiction(state => state.setTitleTokenName)
  const setTitleTokenSymbol = useJurisdiction(state => state.setTitleTokenSymbol)
  const setTitleTokenURI = useJurisdiction(state => state.setTitleTokenURI)
  const addMember = useJurisdiction(state => state.addMember)
  const removeMember = useJurisdiction(state => state.removeMember)
  const replaceMember = useJurisdiction(state => state.replaceMember)

  const { isOpen: isErrorAlertOpen, onOpen: onErrorAlertOpen, onClose: onCloseErrorAlert } = useDisclosure()
  const cancelErrorRef = useRef<HTMLButtonElement | null>(null)
  const [deployError, setDeployError] = useState<string>()
  
  const { isOpen: isProgressAlertOpen, onOpen: onProgressAlertOpen, onClose: onCloseProgressAlert } = useDisclosure()
  const cancelProgressRef = useRef<HTMLButtonElement | null>(null)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [progressLabel, setProgressLabel] = useState<string>("")

  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberAddress, setNewMemberAddress] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<roles.Role>()

  const [ aliasData, setAliasData ] = useState<AliasData|undefined>()
  const [ successfulDeployments, setSuccessfulDeployments ] = useState<Deployments|undefined>()

  const [ selectedTab, setSelectedTab ] = useState(0)

  console.log("Selected tab: ", selectedTab)
  useEffect(() => {
    reloadAliases().then((data) => {
        setAliasData(data)
        // Add some sample members to the new jurisdictions
        if (jurisdiction.members.length === 0 && !isJurisdictionModified)
          data.aliases.slice(0,5).forEach(a => {
            addMember({name: a.alias, address: a.address, role: roles.EXECUTIVE_ROLE})
          })
    })
  }, [addMember, jurisdiction.members])

  // Memoized callbacks

  const getNameForAddress = useCallback((address:string) => {
    const address_lc = address.toLowerCase()
    const acc = aliasData?.aliasesByAddress.get(address_lc)
    return acc ? acc : ""
  }, [aliasData])
  
  const updateMemberAddress = useCallback((index: number, m:IMember, value: string): void => {
    let expectedName:string = getNameForAddress(m.address)
    let newName:string = getNameForAddress(value)
    if (m.name !== "" && m.name !== expectedName)
      newName = m.name
    replaceMember(index, {...m, address: value, name:newName})
  }, [replaceMember, getNameForAddress])

  const updateNewMemberAddress = useCallback((value: string): void => {
    let expectedName:string = getNameForAddress(newMemberAddress)
    let newName:string = getNameForAddress(value)
    if (newMemberName !== "" && newMemberName !== expectedName)
      newName = newMemberName
    setNewMemberName(newName)
    setNewMemberAddress(value)
  }, [newMemberAddress, newMemberName, getNameForAddress])

  const isEmptyNewMember = useCallback(():boolean => {
    return newMemberName === "" && newMemberAddress === "" && newMemberRole === undefined
  }, [newMemberName, newMemberAddress, newMemberRole])

  const isValidNewMember = useCallback(():boolean => {
    return newMemberAddress !== "" && 
      newMemberRole !== undefined &&
      jurisdiction.isValidAddress(newMemberAddress) && 
      !jurisdiction.existsMemberAddress(newMemberAddress)
  }, [newMemberAddress, newMemberRole, jurisdiction.members, jurisdiction.isValidAddress, jurisdiction.existsMemberAddress])

  const addNewMember = useCallback(():void => {
    if (isValidNewMember() && newMemberRole !== undefined) {
      addMember({name: newMemberName, address: newMemberAddress, role: newMemberRole})
      setNewMemberName("")
      setNewMemberAddress("")
      setNewMemberRole(undefined)
    }
  }, [addMember, newMemberName, newMemberAddress, newMemberRole, isValidNewMember])

  const isValidForm = useCallback(():boolean => {
    return jurisdiction.isValid() && (isValidNewMember() || isEmptyNewMember()) && web3Provider
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

  const startingStep = useCallback(async (jurisdiction:Jurisdiction, progress:number, name:string) => {
    setProgressLabel(name)
  }, [])

  const onDeployed = useCallback(async (jurisdiction:Jurisdiction, progress:number, type:string, key:string, address:string) => {
    setProgressValue(progress)
    console.log(`deployed: ${key} ${type} at ${address} - progress = ${progress}`)
  }, [])

  const onInitialized = useCallback(async (jurisdiction:Jurisdiction, progress:number, type:string, key:string, address:string) => {
    setProgressValue(progress)
    console.log(`initialized: ${key} ${type} at ${address} - progress = ${progress}`)
  }, [])

  const onError = useCallback(async (jurisdiction:Jurisdiction, msg:string, successfulDeployments:Deployments) => {
    onCloseProgressAlert()
    setDeployError(msg)
    onErrorAlertOpen()
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
  }, [onCloseProgressAlert, onErrorAlertOpen])

  const onCancelled = useCallback(async (jurisdiction:Jurisdiction, successfulDeployments:Deployments) => {
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
  }, [onCloseProgressAlert])

  const onCompleted = useCallback(async (jurisdiction:Jurisdiction, successfulDeployments:Deployments) => {
    setProgressValue(1)
    setSuccessfulDeployments(successfulDeployments)
    console.log("Successful deployments:", successfulDeployments)
  }, [])

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
                <CircularProgress value={progressValue*100 || 5} color='green.400'>
                  <CircularProgressLabel>{Math.round(progressValue*100) || 5}%</CircularProgressLabel>
                </CircularProgress>
                <Text>{ progressValue < 1 ? progressLabel + "..." : "Deployment complete!" }</Text>
              </HStack>
              <Text>Please check MetaMask for new transactions.</Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelProgressRef} onClick={progressValue === 1 ? onClickCloseDeployment : onClickCancelDeployment}>
              {progressValue == 1 ? "Close": "Cancel"}
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
            {deployError||"Deployment failed"}
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
        onChange={() => {}}
      >
        <option key={JurisdictionId} value={JurisdictionId}>{JurisdictionId}</option>
      </Select>
    </HStack>
  ), [JurisdictionId])

  const titleTokenNameRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Title Token Name:</Text>
      <Input width="80%" value={jurisdiction.titleTokenName} onChange={(e) => setTitleTokenName(e.target.value)} />
    </HStack>
  ), [jurisdiction.titleTokenName])

  const titleTokenSymbolRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Title Token Symbol:</Text>
      <Input width="80%" value={jurisdiction.titleTokenSymbol} onChange={(e) => setTitleTokenSymbol(e.target.value)} />
    </HStack>
  ), [jurisdiction.titleTokenSymbol])

  const titleTokenURIRow = useMemo(() => (
    <HStack width="100%">
      <Text width="20%" fontSize='md'>Title Token URI:</Text>
      <Input width="80%" value={jurisdiction.titleTokenURI} onChange={(e) => setTitleTokenURI(e.target.value)} />
    </HStack>
  ), [jurisdiction.titleTokenURI])

  const newMemberRow = useMemo(() => (
    <HStack width="100%">
      <Input width="15%" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)}/>
      <Input width="55%" value={newMemberAddress} onChange={(e) => updateNewMemberAddress(e.target.value)} {...(isValidNewMember()||isEmptyNewMember())?{}:invalidMemberAddressProps} />
      <RoleSelector isValid={newMemberRole!==undefined||isEmptyNewMember()} width="15%" required={true} value={newMemberRole?.friendlyName||""} onChange={(e) => setNewMemberRole(roles.rolesByFriendlyName[e.target.value])} />
      <Button width="15%" {...isValidNewMember()?greenButtonProps:""} onClick={() => addNewMember()}>Add</Button>
    </HStack>
    ), [newMemberName, newMemberAddress, newMemberRole, jurisdiction.members])

  const membersRows= useMemo(() => (
    <VStack spacing={4}>
      {jurisdiction.members.map((m:IMember, i:number) => (
        <HStack width="100%" key={i}>
          <Input width="15%" value={m.name} onChange={(e) => replaceMember(i, {...m, name: e.target.value})}/>
          <Input width="55%" value={m.address} onChange={(e) => updateMemberAddress(i, m, e.target.value)}  {...(jurisdiction.isValidAddress(m.address) && !jurisdiction.existsMemberAddress(m.address, 2))?{}:invalidMemberAddressProps} />
          <RoleSelector width="15%" isValid={m.role!==undefined} required={true} value={m.role.friendlyName||""} onChange={(e) => replaceMember(i, {...m, role: roles.rolesByFriendlyName[e.target.value]})} />
          <Button width="15%" rightIcon={<DeleteIcon height={7} width={7} />} onClick={() => removeMember(i)}>Remove</Button>
        </HStack>
      ))}
      {newMemberRow}
    </VStack>
  ), [jurisdiction.members, newMemberRow])
  
  const contractsRows = useMemo(() => (
    <VStack spacing={4}>
      {jurisdiction.contracts.map((c:ContractDefinition) => (
        <HStack width="100%" key={c.key}>
          <Text width="20%" fontSize='md'>{c.key}</Text>
          <Select
            bg="white"
            borderWidth={1}
            value={c.id}
            width="80%"
            onChange={() => {}}
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

  const configTab = useMemo(() => (
    <VStack alignItems="flex-start" spacing={4}>        
      {jurisdictionNameRow}
      {jurisdictionContractRow}
      {titleTokenNameRow}
      {titleTokenSymbolRow}
      {titleTokenURIRow}
    </VStack>
  ), [jurisdictionNameRow, jurisdictionContractRow, titleTokenNameRow, titleTokenSymbolRow, titleTokenURIRow])

  const membersTab = useMemo(() => membersRows, [membersRows])

  const contractsTab = useMemo(() => contractsRows, [contractsRows])

  const tabs = [
    { name: "Configuration", content: configTab },
    { name: "Members", content: membersTab },
    { name: "Contracts", content: contractsTab },
  ]

  const submitButtons = useMemo(() => {
    const isFirstTab = selectedTab===0
    const isLastTab = selectedTab===tabs.length-1
    return (
      <HStack width="100%" justifyContent="flex-end">
        <Button onClick={() => reset()}>Reset All</Button>
        <Button {...(!isFirstTab?greenButtonProps:"")} onClick={() => setSelectedTab(selectedTab-1)} disabled={isFirstTab}>Previous</Button>
        <Button {...(!isLastTab?greenButtonProps:"")} onClick={() => setSelectedTab(selectedTab+1)} disabled={isLastTab}>Next</Button>
        <Button {...(isLastTab&&isValidForm()?greenButtonProps:"")} onClick={() => isValidForm()&&deploy()} disabled={!isLastTab}>Create Jurisdiction</Button>
      </HStack>)
  }, [isValidForm, deploy, selectedTab])

  const page = useMemo(() => (
    <Box width="100%">
      <Head>
        <title>Create a Jurisdiction</title>
      </Head>
      <Tabs variant="enclosed" onChange={i => setSelectedTab(i)} index={selectedTab}>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.name}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Divider width="100%" marginBottom="1em"/>
      {submitButtons}
      {errorDialog}
      {progressDialog}
    </Box>
  ), [tabs, submitButtons, errorDialog, progressDialog, selectedTab])

  return page
}

export default CreateJurisdiction;