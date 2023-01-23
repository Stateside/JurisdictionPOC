import axios from 'axios';
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import fs from "fs";
import * as tc from "../typechain-types"

declare global {
  const ethers: any
}

type DeployedContract = {
  name: string
  version: string
  interface: string
  address: string
  jurisdiction: string
  frontend: string
  description: string
  chainId: number
}

const saveContracts = async (website: string, contracts:DeployedContract[]) => {
  for (let i = 0; i < contracts.length; i++) {
    const c = contracts[i];
    try {
      console.log("Saving contract", c.name, c.address)
      const res = await axios.post(website+"/api/contracts/save", c)
    } catch (err) {
      console.error(err.toString())
    }    
  }
}

/** Loads the contracts that have been deployed by Hardhat on the "localhost" blockchain */
const getContracts = async (jurisdictionAddress: string, jurisdictionName: string, network:string, prefix:string, chainId:number) => {
  const folder = `../jsc/deployments/${network}/`
  const prefix2 = prefix+"_"
  const hhDeployedContracts = fs.readdirSync(folder);
  const contracts:DeployedContract[] = hhDeployedContracts
    .filter(f => f.startsWith(prefix2))
    .filter(f => f.endsWith(".json"))
    .map(f => {
      const json = JSON.parse(fs.readFileSync(folder + f, "utf8"))
      const name = f.substring(prefix2.length, f.length-".json".length)
      const interfaceName = name.endsWith("Lib") ? name : "I" + name
      return {
        name: interfaceName === "IJSCJurisdiction" ? jurisdictionName : name,
        version: "0.2",
        interface: interfaceName,
        address: json.address,
        frontend: "staging",
        description: json.devdoc.details,
        jurisdiction: jurisdictionAddress,
        chainId
      }
    })

  return contracts;
}


task("save-contracts", "Write details of deployed contracts to the database for the given website and chain")
  .addParam("website", "The website to save proposals for", "http://localhost:3000")
  .addParam("prefix", "The prefix the contract names to save the proposals for", "development")
  .setAction(async (taskArgs:any, hre: HardhatRuntimeEnvironment) => {
    // @ts-ignore
    const { deployments, network } = hre
    const { get } = deployments

    const { website, prefix } = taskArgs;
    const chainId = network.config.chainId || 0;

    const jscJurisdictionContract = await get(prefix+"_JSCJurisdiction")

    const jscJurisdiction:tc.IJSCJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)

    const contracts = await getContracts(jscJurisdiction.address, await jscJurisdiction.getJurisdictionName(), network.name, prefix, chainId)

    await saveContracts(website, contracts)
});