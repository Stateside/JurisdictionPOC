import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"

const deployJSCTitleTokenLib: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("----------------------------------------------------")
  log("Deploying production_JSCTitleTokenLib and waiting for confirmations...")
  const jscTitleTokenLib = await deploy("production_JSCTitleTokenLib", {
    from: deployer,
    contract: "JSCTitleTokenLib",
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`production_JSCTitleTokenLib deployed at ${jscTitleTokenLib.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscTitleTokenLib.address, [])
  }
}

export default deployJSCTitleTokenLib
deployJSCTitleTokenLib.tags = ["all", "production", "production_JSCTitleTokenLib"]
