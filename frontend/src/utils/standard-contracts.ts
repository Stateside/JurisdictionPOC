/*
    Provides a list of available contracts and their ABIs. Eventually we will pull this data from a database, but for now we will pull it from our deployed artifacts.
 */
export type HardhatArtifact = {
    abi: any
    bytecode: string
    contactName: string
}

export type ContractDefinition = {
    id: string
    name: string
    version: string
    description: string
    loadArtifact: () => Promise<HardhatArtifact>
    type: "contract"|"library"
    solidityType: string 
    solidityInterface: string 
    link?: string
    key?: string
    dependencies?: string[]
}

export const supportedContracts:ContractDefinition[] = [
    {
        id: "JSCRevisionsLib v0.5",
        name: "JSCRevisionsLib",
        version: "0.5",
        description: "A library containing code for use by the JSCRevisioned contract",
        loadArtifact: async () => await import("../../artifacts/libraries/JSCRevisionsLib.sol/JSCRevisionsLib.json") as unknown as HardhatArtifact,
        type: "library",
        solidityType: "JSCRevisionsLib", 
        solidityInterface: "JSCRevisionsLib", 
        link: "libraries/JSCRevisionsLib.sol:JSCRevisionsLib"
    },
    {
        id: "JSCConfigurableLib v0.5",
        name: "JSCConfigurableLib",
        version: "0.5",
        description: "A library containing code for use by the JSCConfigurable contract",
        loadArtifact: async () => await import("../../artifacts/libraries/JSCConfigurableLib.sol/JSCConfigurableLib.json") as unknown as HardhatArtifact,
        type: "library",
        solidityType: "JSCConfigurableLib", 
        solidityInterface: "JSCConfigurableLib", 
        link: "libraries/JSCConfigurableLib.sol:JSCConfigurableLib",
        dependencies: ["JSCRevisionsLib v0.5"]
    },
    {
        id: "JSCTitleTokenLib v0.5",
        name: "JSCTitleTokenLib",
        version: "0.5",
        description: "A library containing code for use by the JSCTitleTokenLib contract",
        loadArtifact: async () => await import("../../artifacts/libraries/JSCTitleTokenLib.sol/JSCTitleTokenLib.json") as unknown as HardhatArtifact,
        type: "library",
        solidityType: "JSCTitleTokenLib", 
        solidityInterface: "JSCTitleTokenLib", 
        link: "libraries/JSCTitleTokenLib.sol:JSCTitleTokenLib"
    },
    {
        id: "JSCGovernor v0.5",
        name: "JSCGovernor",
        version: "0.5",
        description: "Manages proposed changes to the operation of the jurisdiction contracts",
        loadArtifact: async () => await import("../../artifacts/contracts/production/JSCGovernor.sol/JSCGovernor.json") as unknown as HardhatArtifact,
        type: "contract",
        solidityType: "JSCGovernor", 
        solidityInterface: "IJSCGovernor", 
        key: "jsc.contracts.governor",
        dependencies: ["JSCRevisionsLib v0.5", "JSCConfigurableLib v0.5"]
    },
    {
        id: "JSCCabinet v0.5",
        name: "JSCCabinet",
        version: "0.5",
        description: "Keeps track of the members of the jurisdiction cabinet and their roles",
        loadArtifact: async () => await import("../../artifacts/contracts/production/JSCCabinet.sol/JSCCabinet.json") as unknown as HardhatArtifact,
        type: "contract",
        solidityType: "JSCCabinet", 
        solidityInterface: "IJSCCabinet", 
        key: "jsc.contracts.cabinet",
        dependencies: ["JSCRevisionsLib v0.5", "JSCConfigurableLib v0.5"]
    },
    {
        id: "JSCTitleToken v0.5",
        name: "JSCTitleToken",
        version: "0.5",
        description: "Manages the issuance and transfer of title tokens",
        loadArtifact: async () => await import("../../artifacts/contracts/production/JSCTitleToken.sol/JSCTitleToken.json") as unknown as HardhatArtifact,
        type: "contract",
        solidityType: "JSCTitleToken", 
        solidityInterface: "IJSCTitleToken", 
        key: "jsc.contracts.tokens",
        dependencies: ["JSCRevisionsLib v0.5", "JSCConfigurableLib v0.5", "JSCTitleTokenLib v0.5"]
    },
    {
        id: "JSCJurisdiction v0.5",
        name: "JSCJurisdiction",
        version: "0.5",
        description: "Top level container for all other smart contracts in the jurisdiction",
        loadArtifact: async () => await import("../../artifacts/contracts/production/JSCJurisdiction.sol/JSCJurisdiction.json") as unknown as HardhatArtifact,
        type: "contract",
        solidityType: "JSCJurisdiction", 
        solidityInterface: "IJSCJurisdiction", 
        dependencies: ["JSCRevisionsLib v0.5", "JSCConfigurableLib v0.5"]
    }
]

export const contractDefinitionsById:{[name:string]: ContractDefinition} = {}
export const contractDefinitionsByName:{[name:string]: ContractDefinition} = {}
export const contractDefinitionsBySolidityType:{[name:string]: ContractDefinition} = {}
export const contractDefinitionsBySolidityInterface:{[name:string]: ContractDefinition} = {}
supportedContracts.forEach((cd) => {
    contractDefinitionsById[cd.id] = cd
    contractDefinitionsByName[cd.name] = cd
    contractDefinitionsBySolidityType[cd.solidityType] = cd
    contractDefinitionsBySolidityInterface[cd.solidityInterface] = cd
})