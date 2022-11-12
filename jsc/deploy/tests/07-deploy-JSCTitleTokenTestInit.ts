import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenTestInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscJurisdiction = await get("JSCJurisdiction")
  const jscTitleTokenTest = await get("JSCTitleTokenTest")

  log(`Initializing JSCTitleTokenTest...`)
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
deployJSCTitleTokenTestInit.tags = ["all", "jscTitleTokenTestInit"]
