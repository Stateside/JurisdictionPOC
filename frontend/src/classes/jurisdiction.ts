import { ethers } from 'ethers'
import accounts, { Account } from '@/utils/accounts'
import * as roles from "@/utils/roles"
import { accountsByAddress } from '@/utils/accounts'
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
  onError: (jurisdiction:Jurisdiction, msg:string) => Promise<void>
  onCancelled: (jurisdiction:Jurisdiction, deployments:Deployments) => Promise<void>
}

export type InitializationResult = {
  contract: ethers.Contract
  definition: ContractDefinition
}
  
type InitializationMethod = (signer:ethers.Signer, deployments:Deployments)=>Promise<InitializationResult>

export interface IMember {
  name: string
  address: string
  role: roles.Role
}

export interface IJurisdiction {
  name: string
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
  name: string
  contractId: string
  members: IMember[]
  contracts: ContractDefinition[]
  continueDeployment: boolean = false

  constructor(name:string, contractId:string, members:IMember[], contracts:ContractDefinition[]) {
    this.name = name
    this.contractId = contractId
    this.members = members
    this.contracts = contracts
  }

  setName(name:string) {
    this.name = name
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
    return this.name.length > 0 && this.contractId !== "" && this.contracts.length >= 3
  }

  static createDefaultJurisdiciton():Jurisdiction {
    return new Jurisdiction(
      "My Jurisdiction",
      JurisdictionId,
      accounts.slice(0,5).map((a:Account, i:number) => ({
        name: accountsByAddress[a.address].name,
        address: a.address,
        role: roles.JUDICIAL_ROLE
      })),
      supportedContracts.filter((c:ContractDefinition) => c.key !== undefined),
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
    const { contract, definition } = deployments["JSCCabinet"]
    const instance = await tc.JSCCabinet__factory.connect(contract.address, signer)
    await instance.init(
      deployments["JSCJurisdiction"].contract.address,
      this.members.map((m:IMember) => m.address),
      this.members.map((m:IMember) => ethers.utils.arrayify(m.role.id)),
      deployments["JSCJurisdiction"].contract.address,
      {gasLimit: 5000000})

    return {
      contract,
      definition 
    }
  }

  async initTitleToken(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Title Token")
    const { contract, definition } = deployments["JSCTitleToken"]
    const instance = await tc.IJSCTitleToken__factory.connect(contract.address, signer)

    await instance.init(
      "JSCTitleToken",
      "JSCT",
      "https://jurisdictions.stateside.agency/title-token",
      deployments["JSCJurisdiction"].contract.address,
      ethers.constants.AddressZero,
      0,
      ethers.constants.AddressZero,
      0,
      deployments["JSCGovernor"].contract.address)
  
    return {
      contract, 
      definition 
    }
  }

  async initGovernor(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Governor")
    const { contract, definition } = deployments["JSCGovernor"]
    const instance = await tc.IJSCGovernor__factory.connect(contract.address, signer)

    await instance.init(
      deployments["JSCJurisdiction"].contract.address,
      true)
  
    return {
      contract, 
      definition 
    }
  }

  async initJurisdiction(signer:ethers.Signer, deployments:Deployments):Promise<InitializationResult> {
    console.log("Initializing Jurisdiction")
    const { contract, definition } = deployments["JSCJurisdiction"]
    const instance = await tc.IJSCJurisdiction__factory.connect(contract.address, signer)
    const childContracts = this.contracts.filter((c:ContractDefinition) => c.key !== undefined)

    await instance.init(
      this.name,
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
  searchDependencies(c:ContractDefinition, deploymentOrder:ContractDefinition[]) {
    if (c.dependencies && c.dependencies.length > 0)
      c.dependencies.forEach((d:string) => this.searchDependencies(contractDefinitionsById[d], deploymentOrder))
    if (!deploymentOrder.includes(c))
      deploymentOrder.push(c)
  }

  /** Deploys and initializes all contracts for this jurisdiction */
  async deploy(signer:ethers.Signer, l:DeploymentListener):Promise<Deployments> {
    // Deployment results will be stored here     
    let deploymentsByType:Deployments = {}
    let deploymentAddressesByLink: DeploymentAddresses = {}
    this.continueDeployment = true
      
    try {
      // Build a list of contracts in the correct deployment order
      const deploySteps:ContractDefinition[] = []

      // Add the contracts required for this jurisdiction plus their dependencies
      this.contracts.forEach((c:ContractDefinition) => this.searchDependencies(c, deploySteps))

      // Add the jurisdiction itself
      this.searchDependencies(contractDefinitionsById[this.contractId], deploySteps)

      // Build a list of methods for initializing the contracts
      const initSteps:InitializationMethod[] = [
        this.initCabinet,
        this.initTitleToken,
        this.initGovernor,
        this.initJurisdiction
      ]

      const totalSteps = deploySteps.length + initSteps.length
      let stepCounter = 0;

      // Deploy the required contracts
      for (let s = 0; s < deploySteps.length && this.continueDeployment; s++) {
        stepCounter++;
        const step = deploySteps[s];
        console.log("Deploying", step.solidityType)
        const result = await this.deployContract(signer, step, deploymentAddressesByLink)
        l.onDeployed(this, stepCounter/totalSteps, result.definition.solidityType, result.definition.key||"", result.contract.address)
        deploymentsByType[result.definition.solidityType] = result
        if (result.definition.link)
          deploymentAddressesByLink[result.definition.link] = result.contract.address
      }

      // Initialize the contracts
      for (let s = 0; s < initSteps.length && this.continueDeployment; s++) {
        stepCounter++;
        const step = initSteps[s];
        const result = await step.bind(this)(signer, deploymentsByType)
        l.onInitialized(this, stepCounter/totalSteps, result.definition.solidityType, result.definition.key||"", result.contract.address)
      }
    } catch (e) {
      if (this.continueDeployment) {
        console.log("Error deploying contracts", e)
        let msg = (e as any).message ?? (e as any).toString()
        if (msg.includes("rejected"))
          msg = "Transaction rejected by user"
        l.onError(this, msg)
      }
      else
        l.onCancelled(this, deploymentsByType)
    }

    return deploymentsByType
  }

  cancelDeployment() {
    this.continueDeployment = false
  }
}