import { ethers } from 'ethers'
import * as roles from "@/utils/roles"
import * as tc from "../../typechain-types"
import { ContractDefinition, contractDefinitionsById, supportedContracts } from '@/utils/standard-contracts'

export type DeploymentResult = {
  contract: ethers.Contract
  definition: ContractDefinition
}

export type Deployments = {
  [key: string]: DeploymentResult
}

export type DeploymentAddresses = {
  [key: string]: string
}

export type DeploymentListener = {
  onDeployed: (jurisdiction:Jurisdiction, progress:number, type:string, key:string, address:string) => Promise<void>
  onInitialized: (jurisdiction:Jurisdiction, progress:number, type:string, key:string, address:string) => Promise<void>
  onError: (jurisdiction:Jurisdiction, msg:string, deployments:Deployments) => Promise<void>
  onCancelled: (jurisdiction:Jurisdiction, deployments:Deployments) => Promise<void>
  onCompleted: (jurisdiction:Jurisdiction, deployments:Deployments) => Promise<void>
  startingStep: (jurisdiction:Jurisdiction, progress:number, step:string) => Promise<void>
}

export type InitializationResult = {
  contract: ethers.Contract
  definition: ContractDefinition
}
  
type InitializationMethod = (signer:ethers.Signer, deployments:Deployments)=>Promise<InitializationResult>
type ConfirmationHandler = (address:string) => Promise<void>

export interface IMember {
  name: string
  address: string
  role: roles.Role
}

export interface IJurisdiction {
  jurisdictionName: string
  titleTokenName: string
  titleTokenSymbol: string
  titleTokenURI: string
  contractId: string
  members: IMember[]
  contracts: ContractDefinition[]
}

export interface Jurisdictions {
  jurisdictions: IJurisdiction[]
}

export const JurisdictionId = "JSCJurisdiction v0.5"

/** 
 * This class describes the content of a Jurisdiction being created in the frontend plus the code needed to deploy it
 */
export class Jurisdiction implements IJurisdiction {
  jurisdictionName: string
  contractId: string
  members: IMember[]
  contracts: ContractDefinition[]
  titleTokenName: string
  titleTokenSymbol: string
  titleTokenURI: string
  continueDeployment: boolean = false

  constructor(name:string, contractId:string, members:IMember[], contracts:ContractDefinition[], titleTokenName:string, titleTokenSymbol:string, titleTokenURI:string) {
    this.jurisdictionName = name
    this.contractId = contractId
    this.members = members
    this.contracts = contracts
    this.titleTokenName = titleTokenName
    this.titleTokenSymbol = titleTokenSymbol
    this.titleTokenURI = titleTokenURI
  }

  static copy(other:IJurisdiction) {
    return new Jurisdiction(other.jurisdictionName, other.contractId, other.members, other.contracts, other.titleTokenName, other.titleTokenSymbol, other.titleTokenURI)
  }

  setName(name:string) {
    this.jurisdictionName = name
  }
  
  addMember(m:IMember) {
    if (!this.isValidNewMember(m))
      throw new Error("Invalid member")
    this.members.push(m)
  }
  
  removeMember(address:string) {
    this.members = this.members.filter((m:IMember) => m.address !== address)
  }

  replaceMember(index:number, newMember:IMember) {
    if (!this.isValidNewMember(newMember))
      throw new Error("Invalid member")
    this.members[index] = newMember
  }

  existsMemberAddress(value:string, min:number = 1):boolean {
    return this.members.filter((m:IMember) => m.address === value).length >= min
  }

  isValidAddress(value:string):boolean {
    return value.length === 42
  }

  isValidMemberName(value:string):boolean {
    return value.length > 0
  }

  isValidNewMember(m:IMember):boolean {
    return this.isValidAddress(m.address) && this.isValidMemberName(m.name) && !this.existsMemberAddress(m.address)
  }

  addContract(name:string, version:string) {
    const c = supportedContracts.find((c:ContractDefinition) => c.name === name && c.version === version)
    if (!c)
      throw new Error("Invalid contract")
    this.contracts.push(c)
  }

  removeContract(key:string) {
    this.contracts = this.contracts.filter((c:ContractDefinition) => c.key !== key)
  }

  existsContractKey(value:string):boolean {
    return this.contracts.find((c:ContractDefinition) => c.key === value) !== undefined
  }
  
  isValidNewContract(name:string, version:string):boolean {
    return supportedContracts.find((c:ContractDefinition) => c.name === name && c.version === version) !== undefined
  }

  isValid():boolean {
    return this.jurisdictionName.length > 0 && this.contractId !== "" && this.contracts.length >= 3
  }

  static createDefaultJurisdiction():Jurisdiction {
    return new Jurisdiction(
      "Our Jurisdiction",
      JurisdictionId,
      [],
      supportedContracts.filter((c:ContractDefinition) => c.key !== undefined),
      "Our Title Token",
      "OTT",
      "https://jurisdictions.stateside.agency/api/tokens/"
    )
  }
    
  async deployContract(signer:ethers.Signer, cd:ContractDefinition, deploymentAddresses:DeploymentAddresses):Promise<DeploymentResult> {
    const artifact = await cd.loadArtifact() // Lazy load JSON 
    const linkedByteCode = this.linkLibrary(artifact.bytecode, deploymentAddresses)
    const contractFactory = new ethers.ContractFactory(artifact.abi, linkedByteCode, signer);
    return {
      contract: await contractFactory.deploy(),
      definition: cd
    }
  }

  linkLibrary(bytecode: string, libraries: {
    [name: string]: string
  } = {}): string {
    let linkedBytecode = bytecode
    for (const [name, address] of Object.entries(libraries)) {
      const placeholder = `__\$${ethers.utils.solidityKeccak256(['string'], [name]).slice(2, 36)}\$__`
      const formattedAddress = ethers.utils.getAddress(address).toLowerCase().replace('0x', '')
      while (linkedBytecode.indexOf(placeholder) !== -1) {
        linkedBytecode = linkedBytecode.replace(placeholder, formattedAddress)
      }
    }
    return linkedBytecode
  }

  async initCabinet(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Cabinet")
    const { contract, definition } = deployments["IJSCCabinet"]
    const instance = await tc.JSCCabinet__factory.connect(contract.address, signer)
    await instance.init(
      deployments["IJSCJurisdiction"].contract.address,
      this.members.map((m:IMember) => m.address),
      this.members.map((m:IMember) => ethers.utils.arrayify(m.role.id)),
      deployments["IJSCGovernor"].contract.address,
      {gasLimit: 5000000})

    return {
      contract,
      definition 
    }
  }

  async initTitleToken(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Title Token")
    const { contract, definition } = deployments["IJSCTitleToken"]
    const instance = await tc.IJSCTitleToken__factory.connect(contract.address, signer)

    await instance.init(
      "JSCTitleToken",
      "JSCT",
      "https://jurisdictions.stateside.agency/title-token",
      deployments["IJSCJurisdiction"].contract.address,
      ethers.constants.AddressZero,
      0,
      ethers.constants.AddressZero,
      0,
      deployments["IJSCGovernor"].contract.address)
  
    return {
      contract, 
      definition 
    }
  }

  async initGovernor(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Governor")
    const { contract, definition } = deployments["IJSCGovernor"]
    const instance = await tc.IJSCGovernor__factory.connect(contract.address, signer)

    await instance.init(
      deployments["IJSCJurisdiction"].contract.address,
      true)
  
    return {
      contract, 
      definition 
    }
  }

  async initJurisdiction(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Jurisdiction")
    const { contract, definition } = deployments["IJSCJurisdiction"]
    const instance = await tc.IJSCJurisdiction__factory.connect(contract.address, signer)
    const childContracts = this.contracts.filter((c:ContractDefinition) => c.key !== undefined)

    await instance.init(
      this.jurisdictionName,
      childContracts.map((c:ContractDefinition) => c.key||""),
      childContracts.map((c:ContractDefinition) => Object.values(deployments).find((d:DeploymentResult) => d.definition.key === c.key)?.contract.address || ""),
      childContracts.map((c:ContractDefinition) => c.description),
      true)
  
    return {
      contract, 
      definition 
    }
  }

  /** Builds a list of contracts in the correct deployment order */
  searchDependencies(c:ContractDefinition, deploymentOrder:ContractDefinition[], ) {
    if (c.dependencies && c.dependencies.length > 0)
      c.dependencies.forEach((d:string) => this.searchDependencies(contractDefinitionsById[d], deploymentOrder))
    if (!deploymentOrder.includes(c))
      deploymentOrder.push(c)
  }

  /** Deploys and initializes all contracts for this jurisdiction */
  async deploy(signer:ethers.Signer, l:DeploymentListener):Promise<Deployments> {
    // Deployment results will be stored here     
    let deploymentsByInterface:Deployments = {}
    let deploymentAddressesByLink: DeploymentAddresses = {}
    this.continueDeployment = true
      
    try {
      l.startingStep(this, 0, "Preparing deployment")
      // Build a list of contracts in the correct deployment order
      const deploySteps:ContractDefinition[] = []

      // Add the contracts required for this jurisdiction plus their dependencies
      this.contracts.forEach((c:ContractDefinition) => this.searchDependencies(c, deploySteps))

      // Add the jurisdiction itself. This will be the last contract deployed. 
      // Note: We are assuming here that the jurisdiction was not already included in the list of contracts.
      // If it was then it will be deployed twice because we are using a copy of the Jurisdiction ContractDefinition
      this.searchDependencies({...contractDefinitionsById[this.contractId], name: this.jurisdictionName}, deploySteps)

      // Build a list of methods for initializing the contracts
      const initSteps:{name:string, func:InitializationMethod}[] = [
        { name: "IJSCCabinet", func:this.initCabinet },
        { name: "IJSCTitleToken", func:this.initTitleToken },
        { name: "IJSCGovernor", func:this.initGovernor },
        { name: "IJSCJurisdiction", func:this.initJurisdiction }
      ]

      const totalSteps = deploySteps.length + initSteps.length
      let stepCounter = 0;

      // Deploy the required contracts
      for (let s = 0; s < deploySteps.length && this.continueDeployment; s++) {
        stepCounter++;
        const step = deploySteps[s];
        l.startingStep(this, 0, `Deploying ${step.solidityType}`)
        const result = await this.deployContract(signer, step, deploymentAddressesByLink)
        l.onDeployed(this, stepCounter/totalSteps, result.definition.solidityType, result.definition.key||"", result.contract.address)
        await Jurisdiction.saveContractInfo(result.definition.name, result.definition.version, result.definition.solidityInterface, result.contract.address, result.definition.description, await signer.getChainId())
        deploymentsByInterface[result.definition.solidityInterface] = result
        if (result.definition.link)
          deploymentAddressesByLink[result.definition.link] = result.contract.address
      }

      // Initialize the contracts
      for (let s = 0; s < initSteps.length && this.continueDeployment; s++) {
        stepCounter++;
        const step = initSteps[s];
        l.startingStep(this, 0, `Initializing ${step.name}`)
        const result = await step.func.bind(this)(signer, deploymentsByInterface)
        l.onInitialized(this, stepCounter/totalSteps, result.definition.solidityType, result.definition.key||"", result.contract.address)
      }
      
      l.startingStep(this, 0, `Finalizing deployment`)
      await Jurisdiction.saveMemberInfo(this.members)
      await Jurisdiction.addToJurisdiction(deploymentsByInterface["IJSCJurisdiction"].contract.address, Object.values(deploymentsByInterface).map(d => d.contract.address))
      l.onCompleted(this, deploymentsByInterface)
    } catch (e) {
      if (this.continueDeployment) {
        console.log("Error deploying contracts", e)
        let msg = (e as any).message ?? (e as any).toString()
        if (msg.includes("rejected"))
          msg = "Transaction rejected by user"
        l.onError(this, msg, deploymentsByInterface)
      }
      else
        l.onCancelled(this, deploymentsByInterface)
    }

    return deploymentsByInterface
  }

  cancelDeployment() {
    this.continueDeployment = false
  }

  static async saveContractInfo(name:string, version:string, type:string, address:string, description:string, chainId:number) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        version,
        interface:type,
        address,
        description,
        frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
        chainId
      })
    }
    await fetch("/api/contracts/save", request)
      .then((r) => {
        if (r.status === 200)
          console.log(`Saved ${type} at ${address}`)
      },
      (e) => {
        console.log("Error saving", e)
      })
  }

  static async saveMemberInfo(members:IMember[]) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        aliases: members.map((m:IMember) => ({alias:m.name, address:m.address}))
      })
    }
    console.log("Saving member aliases")
    const savedAliases = await fetch("/api/aliases/save", request)
      .then((r) => {
        if (r.status === 200)
          console.log("Saved")
        else
          console.log("Error saving")
        return r.json()
      },
      (e) => {
        console.log("Error saving", e)
      })
  }

  /** Remove the given jurisdiction from the list of contracts in the database */
  static async removeJurisdiction(address: string) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({address})
    }
    fetch("/api/contracts/remove-jurisdiction", request)
      .then((r) => {
        if (r.status === 200)
          console.log("Removed jurisdiction: ", address)
      },
      (e) => {
        console.log("Error removing jurisdiction", e)
      })
  }

  /** Add all the given contracts to the given jurisdiction in the database */
  static async addToJurisdiction(jurisdiction: string, contracts: string[]) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jurisdiction,
        contracts
      })
    }
    fetch("/api/contracts/add-to-jurisdiction", request)
      .then((r) => {
        if (r.status === 200)
          console.log("Added contracts to jurisdiction in db")
      },
      (e) => {
        console.log("Error adding contracts to jurisdiction", e)
      })
  }
}