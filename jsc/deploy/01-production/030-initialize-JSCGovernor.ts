import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCGovernorInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscGovernorContract = await get("production_JSCGovernor")
  const jscJurisdictionContract = await get("production_JSCJurisdiction")

  log("----------------------------------------------------")
  log(`Initializing production_JSCGovernor...`)
  const jscGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
  await jscGovernor.init(jscJurisdictionContract.address, true)
}

export default deployJSCGovernorInit
deployJSCGovernorInit.tags = ["all", "production", "production_JSCGovernor"]
