import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import accounts from "../../utils/accounts"
import { networkConfig } from "../../helper-hardhat-config"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")
  const jscTitleTokenLib = await get("production_JSCTitleTokenLib")

  log("----------------------------------------------------")
  log("Deploying development_JSCJurisdiction...")
  const jscJurisdictionContract = await deploy("development_JSCJurisdiction", {
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
  log(`development_JSCJurisdiction deployed at ${jscJurisdictionContract.address}`)

  log("Deploying development_JSCTitleToken...")
  const jscTitleTokenContract = await deploy("development_JSCTitleToken", {
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
  log(`development_JSCTitleToken deployed at ${jscTitleTokenContract.address}`)

  log("Deploying development_JSCGovernor...")
  const jscGovernorContract = await deploy("development_JSCGovernor", {
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
  log(`development_JSCGovernor deployed at ${jscGovernorContract.address}`)

  log("Deploying development_JSCCabinet...")
  const jscCabinetContract = await deploy("development_JSCCabinet", {
    from: deployer,
    contract: "JSCCabinet",
    args: [],
    log: true,
    libraries: {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    },
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`development_JSCCabinet deployed at ${jscCabinetContract.address}`)
}

export default deployContracts
deployContracts.tags = ["all", "development"]
