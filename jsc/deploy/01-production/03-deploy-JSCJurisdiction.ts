import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

const deployJSCJurisdiction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")

  log("----------------------------------------------------")
  log("Deploying production_JSCJurisdiction and waiting for confirmations...")
  const jscJurisdiction = await deploy("production_JSCJurisdiction", {
    from: deployer,
    contract: "JSCJurisdiction",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`production_JSCJurisdiction deployed at ${jscJurisdiction.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscJurisdiction.address, [])
  }
}

export default deployJSCJurisdiction
deployJSCJurisdiction.tags = ["all", "production", "production_JSCJurisdiction"]
