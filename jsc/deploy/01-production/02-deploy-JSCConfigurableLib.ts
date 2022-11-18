import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

const deployJSCConfigurableLib: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  log("looking for production_JSCRevisionsLib")
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  log(`jscRevisionsLib=${jscRevisionsLib}`)
  log("----------------------------------------------------")
  log("Deploying production_JSCConfigurableLib and waiting for confirmations...")
  const jscConfigurableLib = await deploy("production_JSCConfigurableLib", {
    from: deployer,
    contract: "JSCConfigurableLib",
    args: [],
    log: true,
    libraries: {
      "JSCRevisionsLib": jscRevisionsLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`production_JSCConfigurableLib deployed at ${jscConfigurableLib.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscConfigurableLib.address, [])
  }
}

export default deployJSCConfigurableLib
deployJSCConfigurableLib.tags = ["all", "production", "production_JSCConfigurableLib"]
