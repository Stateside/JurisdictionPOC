import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import * as tc from "../../typechain-types"
import { ParamType } from "../../utils/types"

// @ts-ignore
import { ethers } from "hardhat"

const initializeJSCJurisdiction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscCabinetContract = await get("development_JSCCabinet")
  const jscTitleTokenContract = await get("development_JSCTitleTokenTest")
  const jscGovernorContract = await get("development_JSCGovernor")
  const jscJurisdictionContract = await get("development_JSCJurisdiction")

  log(`----------------------------------------------------`)
  log("Initializing development_JSCJurisdiction...")
  const jscJurisdiction: tc.IJSCJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)

  const tx = await jscJurisdiction.init(
    "Our Jurisdiction",
    ["jsc.contracts.cabinet", "jsc.contracts.governor", "jsc.contracts.tokens"],
    [jscCabinetContract.address, jscGovernorContract.address, jscTitleTokenContract.address],
    [
      "Manage the members of the jurisdiction and their roles",
      "Track proposals and votes",
      "Manage tokens, their owners, and the transfer of ownership"
    ],
    true,
    {
      votingPeriod: 60, // 5 mins
      approvals: 1,
      majority: 0,
      quorum: 0,
      role: ethers.constants.HashZero,
    }
  )
  const receipt = await tx.wait()
  log('Transaction cost: ', ethers.utils.formatEther(ethers.BigNumber.from(receipt.gasUsed).mul(receipt.effectiveGasPrice)))

  log(`development_JSCJurisdiction Initialized with the following contracts:`)
  log("/-------------------------------------------------------------------\\")
  let i = await jscJurisdiction.iterateParameters()
  while (await jscJurisdiction.isValidParameterIterator(i)) {
    const p = await jscJurisdiction.parameterIteratorGet(i);
    if (p.ptype == ParamType.t_contract) {
      let a = await jscJurisdiction.getContractParameter(p.name);
      log(`  ${p.name}: ${a}`)
    }
    i = await jscJurisdiction.nextParameter(i)
  }
  log("\\-------------------------------------------------------------------/")
}
  export default initializeJSCJurisdiction
  initializeJSCJurisdiction.tags = ["all", "development"]
