import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

const deployJSCTitleToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")
  const jscTitleTokenLib = await get("production_JSCTitleTokenLib")

  log("----------------------------------------------------")
  log("Deploying production_JSCTitleToken and waiting for confirmations...")
  const jscTitleToken = await deploy("production_JSCTitleToken", {
    from: deployer,
    contract: "JSCTitleToken",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address,
      JSCTitleTokenLib: jscTitleTokenLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`production_JSCTitleToken deployed at ${jscTitleToken.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscTitleToken.address, [])
  }
}

export default deployJSCTitleToken
deployJSCTitleToken.tags = ["all", "production", "production_JSCTitleToken"]
