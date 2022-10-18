import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("JSCRevisionsLib")
  const jscConfigurableLib = await get("JSCConfigurableLib")
  const jscTitleTokenLib = await get("JSCTitleTokenLib")

  log("----------------------------------------------------")
  log("Deploying JSCTitleTokenTest and waiting for confirmations...")
  const jscTitleTokenTest = await deploy("JSCTitleTokenTest", {
    from: deployer,
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
  log(`JSCTitleTokenTest at ${jscTitleTokenTest.address}`)
}

export default deployJSCTitleTokenTest
deployJSCTitleTokenTest.tags = ["all", "jscTitleTokenTest"]
