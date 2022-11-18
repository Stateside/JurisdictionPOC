import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCRevisionedTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")

  log("----------------------------------------------------")
  log("Deploying unittests_JSCRevisionedTest and waiting for confirmations...")
  const jscRevisionedTest = await deploy("unittests_JSCRevisionedTest", {
    from: deployer,
    contract: "JSCRevisionedTest",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`unittests_JSCRevisionedTest deployed at ${jscRevisionedTest.address}`)
}

export default deployJSCRevisionedTest
deployJSCRevisionedTest.tags = ["all", "unittests", "unittests_JSCRevisionedTest"]
