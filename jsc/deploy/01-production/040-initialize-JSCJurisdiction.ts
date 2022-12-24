import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCJurisdictionInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdictionContract = await get("production_JSCJurisdiction")
  const jscCabinetContract = await get("production_JSCCabinet")
  const jscTitleTokenContract = await get("production_JSCTitleToken")
  const jscGovernorContract = await get("production_JSCGovernor")

  log("----------------------------------------------------")
  log(`Initializing production_JSCJurisdiction...`)
  const jscJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)
  await jscJurisdiction.init(
    "DemoJurisdiction",
    ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
    [jscCabinetContract.address,  jscGovernorContract.address,  jscTitleTokenContract.address],
    [
      "Manage the members of the jurisdiction and their roles",
      "Track proposals and votes",
      "Manage tokens, their owners, and the transfer of ownership"
    ],
    true
  )
}

export default deployJSCJurisdictionInit
deployJSCJurisdictionInit.tags = ["all", "production", "production_JSCJurisdiction"]
