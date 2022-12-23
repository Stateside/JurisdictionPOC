import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenTestInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, network } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("unittests_JSCJurisdiction")
  const jscTitleTokenTestContract = await get("unittests_JSCTitleTokenTest")
  const jscTitleTokenTest = await ethers.getContractAt("JSCTitleToken", jscTitleTokenTestContract.address)
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log(`Initializing unittests_JSCTitleTokenTest...`)
  await jscTitleTokenTest.init(
    "Test", 
    "TST", 
    "https://stateside.agency/jsc/tokens/", 
    jscJurisdiction.address,
    zeroAddress,
    0,
    zeroAddress,
    0,
    zeroAddress
  ); 
}

export default deployJSCTitleTokenTestInit
deployJSCTitleTokenTestInit.tags = ["all", "unittests", "unittests_JSCTitleTokenTest"]
