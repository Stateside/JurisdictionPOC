import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCJurisdiction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("JSCRevisionsLib")
  const jscConfigurableLib = await get("JSCConfigurableLib")

  log("----------------------------------------------------")
  log("Deploying JSCJurisdiction and waiting for confirmations...")
  const jscJurisdiction = await deploy("JSCJurisdiction", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`JSCJurisdiction at ${jscJurisdiction.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscJurisdiction.address, [])
  }
}

export default deployJSCJurisdiction
deployJSCJurisdiction.tags = ["all", "production", "jscJurisdiction"]
