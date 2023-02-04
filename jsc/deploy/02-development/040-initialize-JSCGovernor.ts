import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 
import { createSampleProposals } from "../../utils/sample-proposals"
import { PreparedProposal } from "../../utils/proposals"
import { accountsByAddress, buildWallets } from "../../utils/accounts"

const initializeJSCGovernor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("development_JSCJurisdiction")
  const jscGovernorContract = await get("development_JSCGovernor")
  const jscCabinetContract = await get("development_JSCCabinet")
  const jscTitleTokenContract = await get("development_JSCTitleTokenTest")

  log(`----------------------------------------------------`)
  log("Initializing development_JSCGovernor...")
  const jscTitleToken:tc.IJSCTitleToken = await ethers.getContractAt("JSCTitleTokenTest", jscTitleTokenContract.address)
  const jscGovernor:tc.IJSCGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
  const jscCabinet:tc.IJSCCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)
  await jscGovernor.init(jscJurisdiction.address, true,
    {
      votingPeriod: 50,
      approvals: 1,
      majority: 0,
      quorum: 0,
      role: ethers.constants.HashZero,
    })

  const proposalMap:{[hash:string]: PreparedProposal} = {}
  try {
    const wallets = buildWallets(ethers)
    
    const sampleProposals = await createSampleProposals(ethers, jscGovernor, jscCabinet, jscTitleToken)
    for (let i = 0; i < sampleProposals.length; i++) {
      const p = sampleProposals[i];
      console.log(`Proposing ${p.description}...`)
      await jscGovernor.propose(p.revs, p.description, p.version)
      proposalMap[p.proposalHash.toHexString().toLowerCase()] = p
      
      console.log(`Voting on ${p.description}...`)
      const voters = Object.keys(p.whoHasVoted)
      for (let j = 0; j < voters.length; j++) {
        const voter = voters[j]
        await jscGovernor.connect(wallets[accountsByAddress[voter].name]).castVote(p.proposalHash, p.whoHasVoted[voter])
      }
    }
  } catch (error) {
    console.log(error)
  }

  log(`development_JSCGovernor Initialized with the following tokens:`)
  log("/------------------------------------------------------------\\")
  const pCount = await (await jscGovernor.proposalCount()).toNumber();
  for (let pi = 0; pi < pCount; pi++) {
    const p = await (await jscGovernor.proposalAtIndex(pi)).toHexString().toLowerCase();
    log(`Proposal: ${proposalMap[p].description} (${p})`)
  }
  log("\\------------------------------------------------------------/")
}

export default initializeJSCGovernor
initializeJSCGovernor.tags = ["all", "development"]
