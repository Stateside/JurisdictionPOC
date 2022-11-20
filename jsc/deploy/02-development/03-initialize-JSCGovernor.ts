import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 
import { createSampleProposals } from "../../utils/sample-proposals"
import { PreparedProposal } from "../../utils/proposals"
import { BigNumber } from "ethers"

const initializeJSCGovernor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("development_JSCJurisdiction")
  const jscGovernorContract = await get("development_JSCGovernor")
  const jscCabinet = await get("production_JSCCabinet")
  const jscTitleTokenContract = await get("development_JSCTitleToken")

  log("Initializing development_JSCGovernor...")
  const jscTitleToken:tc.IJSCTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenContract.address)
  const jscGovernor:tc.IJSCGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
  await jscGovernor.init(jscJurisdiction.address)

  const sampleProposals = await createSampleProposals(jscGovernor, jscCabinet, jscTitleToken)
  const proposalMap:{[hash:string]: PreparedProposal} = {}
  for (let i = 0; i < sampleProposals.length; i++) {
    const p = sampleProposals[i];
    await jscGovernor.propose(p.revs, p.description, p.version)
    proposalMap[p.proposalHash.toHexString().toLowerCase()] = p
  }

  log(`development_JSCGovernor Initialized with the following tokens:`)
  log("/------------------------------------------------------------\\")
  const pCount = await (await jscGovernor.proposalCount()).toNumber();
  log(`pCount: ${pCount}`)
  for (let pi = 0; pi < pCount; pi++) {
    const p = await (await jscGovernor.proposalAtIndex(pi)).toHexString().toLowerCase();
    log(`Proposal: ${proposalMap[p].description}`)
  }

  log("\\------------------------------------------------------------/")
}

export default initializeJSCGovernor
initializeJSCGovernor.tags = ["all", "development"]
