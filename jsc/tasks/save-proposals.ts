import axios from 'axios';
import { task } from "hardhat/config"
import { createSampleProposals } from "../utils/sample-proposals"
import * as tc from "../typechain-types"
import { PreparedProposal } from "../utils/proposals"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ParamType } from '../utils/types';

declare global {
  const ethers: any
}

const saveProposals = async (website: string, chainId:string, governor:string, proposals:PreparedProposal[]) => {
  const deployer = await ethers.getSigners()[0]
  const blockNumber = await ethers.provider.getBlockNumber();
  const blocksPerWeek = 5*60*24*7
  const data = proposals.map(p => ({
    id: p.proposalHash.toHexString().toLowerCase(),
    startBlock: blockNumber-1,
    deadline: blockNumber+blocksPerWeek,
    proposer: deployer,
    version: p.version,
    description: p.description,
    chainId,
    governor: governor.toLowerCase(),
    revisions: p.revs.map(r => ({
      target: r.target.toLowerCase(),
      name: r.name,
      description: r.description,
      pdata: r.pdata,
      parameters: r.parameters.map(p => ({
        name: p.name,
        type: ParamType[p.type],
        hint: p.hint,
        value: p.value
      }))
    })),
  }))

  try {
    const res = await axios.post(website+"/api/proposals/save", data)
  } catch (err) {
    console.error(err.toString())
  }
}

task("save-proposals", "Write sample proposals to the database for the given website and governor contract")
  .addParam("website", "The website to save proposals for", "http://localhost:3000")
  .addParam("prefix", "The prefix the contract names to save the proposals for", "development")
  .setAction(async (taskArgs:any, hre: HardhatRuntimeEnvironment) => {
    // @ts-ignore
    const { deployments, network } = hre
    const { get } = deployments

    const { website, prefix } = taskArgs;
    const chainId = network.config.chainId || 0;

    const jscGovernorContract = await get(prefix+"_JSCGovernor")
    const jscCabinetContract = await get(prefix+"_JSCCabinet")
    const jscTitleTokenContract = await get(prefix+"_JSCTitleTokenTest")

    const jscTitleToken:tc.IJSCTitleToken = await ethers.getContractAt("JSCTitleTokenTest", jscTitleTokenContract.address)
    const jscGovernor:tc.IJSCGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
    const jscCabinet:tc.IJSCCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)

    const proposals = await createSampleProposals(ethers, jscGovernor, jscCabinet, jscTitleToken);

    await saveProposals(website, chainId.toString(), jscGovernor.address, proposals);
});