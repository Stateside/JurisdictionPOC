import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCProposableTest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("JSCRevisionsLib")

  log("----------------------------------------------------")
  log("Deploying JSCProposableTest and waiting for confirmations...")
  const jscProposableTest = await deploy("JSCProposableTest", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`JSCProposableTest at ${jscProposableTest.address}`)
}

export default deployJSCProposableTest
deployJSCProposableTest.tags = ["all", "jscProposableTest"]
