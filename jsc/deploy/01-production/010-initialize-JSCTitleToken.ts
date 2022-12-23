import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("production_JSCJurisdiction")
  const jscGovernor = await get("production_JSCGovernor")
  const jscTitleTokenContract = await get("production_JSCTitleToken")
  const jscTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenContract.address)
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log("----------------------------------------------------")
  log(`Initializing production_JSCTitleToken...`)
  await jscTitleToken.init(
    "Demo", 
    "DEMO", 
    "https://stateside.agency/jsc/tokens/",
    jscJurisdiction.address,
    zeroAddress,
    0,
    zeroAddress,
    0,
    jscGovernor.address
  )
}

export default deployJSCTitleTokenInit
deployJSCTitleTokenInit.tags = ["all", "production", "production_JSCTitleToken"]
