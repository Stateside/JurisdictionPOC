import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscTitleToken = await get("JSCTitleToken")

  log(`Initializing JSCTitleToken...`)
  await init(jscTitleToken.address, "Test", "TST", "http://stateside.agency/jsc/tokens/"); 
}

const init = async (jscTitleTokenAddress:string, name: string, symbol:string, uri:string) => {
  const jscTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenAddress)
  await jscTitleToken.init(
    name,
    symbol,
    uri
  )
}

export default deployJSCTitleTokenInit
deployJSCTitleTokenInit.tags = ["all", "jscTitleTokenInit"]
