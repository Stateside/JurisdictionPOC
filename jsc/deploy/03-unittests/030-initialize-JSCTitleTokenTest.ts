import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenTestInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, network } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("unittests_JSCJurisdiction")
  const jscTitleTokenTest = await get("unittests_JSCTitleTokenTest")

  log(`Initializing unittests_JSCTitleTokenTest...`)
  await init(jscTitleTokenTest.address, "Test", "TST", "http://stateside.agency/jsc/tokens/", jscJurisdiction.address); 
}

const init = async (jscTitleTokenTestAddress:string, name: string, symbol:string, uri:string, jscJurisdictionAddress:string) => {
  const jscTitleTokenTest = await ethers.getContractAt("JSCTitleToken", jscTitleTokenTestAddress)
  await jscTitleTokenTest.init(
    name,
    symbol,
    uri,
    jscJurisdictionAddress
  )
}

export default deployJSCTitleTokenTestInit
deployJSCTitleTokenTestInit.tags = ["all", "unittests", "unittests_JSCTitleTokenTest"]
