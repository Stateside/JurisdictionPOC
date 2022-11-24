import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployAllContracts from '../utils/deploy-all-contracts'
import deploy from '../utils/deploy'

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    jscRevisionsLib,
    jscConfigurableLib,
    jscTitleTokenLib
  } = await deployAllContracts(hre, "development_")

  const jscTitleTokenTest = await deploy(hre, `development_JSCTitleTokenTest`, "JSCTitleTokenTest", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address,
    JSCTitleTokenLib: jscTitleTokenLib.address
  })
}

export default deployContracts
deployContracts.tags = ["all", "development"]
