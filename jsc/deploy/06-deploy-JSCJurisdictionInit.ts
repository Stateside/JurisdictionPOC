import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCJurisdictionInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscJurisdiction = await get("JSCJurisdiction")

  log(`Initializing JSCJurisdiction...`)
  await init(jscJurisdiction.address); 
}

const init = async (jscJurisdictionAddress: string) => {
  const jscJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionAddress)
  await jscJurisdiction.init(
    "TestJurisdiction",
    ["jsc.contract.mycontract"],
    [jscJurisdiction.address],
    ["This is a test contract address"]
  )
}

export default deployJSCJurisdictionInit
deployJSCJurisdictionInit.tags = ["all", "jscJurisdictionInit"]
