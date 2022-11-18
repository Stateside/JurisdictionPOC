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
  const jscJurisdiction = await get("production_JSCJurisdiction")
  const jscTitleToken = await get("production_JSCTitleToken")

  log("----------------------------------------------------")
  log(`Initializing production_JSCTitleToken...`)
  await init(jscTitleToken.address, "Demo", "DEMO", "http://stateside.agency/jsc/tokens/", jscJurisdiction.address); 
}

const init = async (jscTitleTokenAddress:string, name: string, symbol:string, uri:string, jscJurisdictionAddress:string) => {
  const jscTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenAddress)
  await jscTitleToken.init(
    name,
    symbol,
    uri,
    jscJurisdictionAddress
  )
}

export default deployJSCTitleTokenInit
deployJSCTitleTokenInit.tags = ["all", "production", "production_JSCTitleToken"]
