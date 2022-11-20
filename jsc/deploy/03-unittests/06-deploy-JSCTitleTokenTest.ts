import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../../helper-hardhat-config"

const deployJSCTitleTokenTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")
  const jscTitleTokenLib = await get("production_JSCTitleTokenLib")

  log("----------------------------------------------------")
  log("Deploying unittests_JSCTitleTokenTest...")
  const jscTitleTokenTest = await deploy("unittests_JSCTitleTokenTest", {
    from: deployer,
    contract: "JSCTitleTokenTest",
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
  log(`unittests_JSCTitleTokenTest deployed at ${jscTitleTokenTest.address}`)
}

export default deployJSCTitleTokenTest
deployJSCTitleTokenTest.tags = ["all", "unittests", "unittests_JSCTitleTokenTest"]
