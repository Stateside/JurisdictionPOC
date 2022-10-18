import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCTitleTokenReceiverTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  log("----------------------------------------------------")
  log("Deploying JSCTitleTokenReceiverTest and waiting for confirmations...")
  const jscTitleTokenReceiverTest = await deploy("JSCTitleTokenReceiverTest", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`JSCTitleTokenReceiverTest at ${jscTitleTokenReceiverTest.address}`)
}

export default deployJSCTitleTokenReceiverTest
deployJSCTitleTokenReceiverTest.tags = ["all", "jscTitleTokenReceiverTest"]
