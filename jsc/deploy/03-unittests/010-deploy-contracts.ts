import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployAllContracts from '../utils/deploy-all-contracts'
import deploy from '../utils/deploy'

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    jscRevisionsLib,
    jscConfigurableLib,
    jscTitleTokenLib
  } = await deployAllContracts(hre, "unittests_")

  const jscRevisionedTest = await deploy(hre, `unittests_JSCRevisionedTest`, "JSCRevisionedTest", {
    JSCRevisionsLib: jscRevisionsLib.address
  })

  const jscConfigurableTest = await deploy(hre, `unittests_JSCConfigurableTest`, "JSCConfigurableTest", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address
  })

  const jscTitleTokenReceiverTest = await deploy(hre, `unittests_JSCTitleTokenReceiverTest`, "JSCTitleTokenReceiverTest", {})

  const jscTitleTokenTest = await deploy(hre, `unittests_JSCTitleTokenTest`, "JSCTitleTokenTest", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address,
    JSCTitleTokenLib: jscTitleTokenLib.address
  })
}

export default deployContracts
deployContracts.tags = ["all", "unittests"]
