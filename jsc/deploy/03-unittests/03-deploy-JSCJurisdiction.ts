import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../../helper-functions"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCJurisdiction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const jscRevisionsLib = await get("production_JSCRevisionsLib")
  const jscConfigurableLib = await get("production_JSCConfigurableLib")

  log("----------------------------------------------------")
  log("Deploying unittests_JSCJurisdiction and waiting for confirmations...")
  const jscJurisdictionContract = await deploy("unittests_JSCJurisdiction", {
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

  const jscJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)
  await jscJurisdiction.init(
    "TestJurisdiction",
    ["jsc.contract.mycontract"],
    [jscJurisdiction.address],
    ["This is a test contract address"]
  )

  log(`unittests_JSCJurisdiction deployed at ${jscJurisdiction.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(jscJurisdiction.address, [])
  }
}

export default deployJSCJurisdiction
deployJSCJurisdiction.tags = ["all", "unittests", "unittests_JSCJurisdiction"]
