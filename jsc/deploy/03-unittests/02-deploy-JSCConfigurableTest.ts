import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCConfigurableTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")

  log("----------------------------------------------------")
  log("Deploying unittests_JSCConfigurableTest...")
  const jscConfigurableTest = await deploy("unittests_JSCConfigurableTest", {
    from: deployer,
    contract: "JSCConfigurableTest",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`unittests_JSCConfigurableTest deployed at ${jscConfigurableTest.address}`)
}

export default deployJSCConfigurableTest
deployJSCConfigurableTest.tags = ["all", "unittests", "unittests_JSCConfigurableTest"]
