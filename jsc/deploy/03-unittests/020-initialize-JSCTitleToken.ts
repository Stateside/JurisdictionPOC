import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("unittests_JSCJurisdiction")
  const jscTitleTokenContract = await get("unittests_JSCTitleToken")
  const jscTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenContract.address)
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log("----------------------------------------------------")
  log(`Initializing unittests_JSCTitleToken...`)
  await jscTitleToken.init(
    "Demo", 
    "DEMO", 
    "https://stateside.agency/jsc/tokens/", 
    jscJurisdiction.address,
    zeroAddress,
    0,
    zeroAddress,
    0
  ); 
}

export default deployJSCTitleTokenInit
deployJSCTitleTokenInit.tags = ["all", "unittests", "unittests_JSCTitleToken"]
