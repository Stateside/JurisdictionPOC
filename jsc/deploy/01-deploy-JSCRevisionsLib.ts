import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCRevisionsLib: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying JSCRevisionsLib and waiting for confirmations...")
  const jscRevisionsLib = await deploy("JSCRevisionsLib", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`JSCRevisionsLib at ${jscRevisionsLib.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscRevisionsLib.address, [])
  }
}

export default deployJSCRevisionsLib
deployJSCRevisionsLib.tags = ["all", "production", "jscRevisionsLib"]
