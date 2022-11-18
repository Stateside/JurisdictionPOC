import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

const deployJSCGovernor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")

  log("----------------------------------------------------")
  log("Deploying production_JSCGovernor and waiting for confirmations...")
  const jscGovernor = await deploy("production_JSCGovernor", {
    from: deployer,
    contract: "JSCGovernor",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`production_JSCGovernor deployed at ${jscGovernor.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscGovernor.address, [])
  }
}

export default deployJSCGovernor
deployJSCGovernor.tags = ["all", "production", "production_JSCGovernor"]
