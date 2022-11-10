import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCGovernorInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscGovernor = await get("JSCGovernor")
  const jscJurisdiction = await get("JSCJurisdiction")

  log(`Initializing JSCGovernor...`)
  await init(jscGovernor.address, jscJurisdiction.address)
}

const init = async (jscGovernorAddress:string, jscJurisdictionAddress: string) => {
  const jscGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorAddress)
  await jscGovernor.init(jscJurisdictionAddress)
}

export default deployJSCGovernorInit
deployJSCGovernorInit.tags = ["all", "jscGovernorInit"]
