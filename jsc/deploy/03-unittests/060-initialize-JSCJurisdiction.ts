import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCJurisdictionInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdictionContract = await get("unittests_JSCJurisdiction")
  
  log("----------------------------------------------------")
  log(`Initializing unittests_JSCJurisdiction...`)
  const jscJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)
  await jscJurisdiction.init(
    "TestJurisdiction",
    ["jsc.contracts.mycontract"],
    [jscJurisdiction.address],
    ["This is a test contract address"]
  )
}

export default deployJSCJurisdictionInit
deployJSCJurisdictionInit.tags = ["all", "unittests"]
