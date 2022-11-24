import { HardhatRuntimeEnvironment } from "hardhat/types"
import deploy from './deploy'

/** Deploys an instance of all the libraries and smart contracts.
 * The prefix parameter allows us to distinguish different instances 
 * of the smart contracts for production, development, and unit tests
 */

const deployAllContracts = async function (hre: HardhatRuntimeEnvironment, prefix:string) {
  const jscRevisionsLib = await deploy(hre, `${prefix}JSCRevisionsLib`, "JSCRevisionsLib", {})
  const jscConfigurableLib = await deploy(hre, `${prefix}JSCConfigurableLib`, "JSCConfigurableLib", { JSCRevisionsLib: jscRevisionsLib.address })
  const jscTitleTokenLib = await deploy(hre, `${prefix}JSCTitleTokenLib`, "JSCTitleTokenLib", {})

  const jscJurisdiction = await deploy(hre, `${prefix}JSCJurisdiction`, "JSCJurisdiction", {
      JSCRevisionsLib: jscRevisionsLib.address,
      JSCConfigurableLib: jscConfigurableLib.address
    })

  const jscTitleToken = await deploy(hre, `${prefix}JSCTitleToken`, "JSCTitleToken", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address,
    JSCTitleTokenLib: jscTitleTokenLib.address
  })

  const jscGovernor = await deploy(hre, `${prefix}JSCGovernor`, "JSCGovernor", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address,
  })

  const jscCabinet = await deploy(hre, `${prefix}JSCCabinet`, "JSCCabinet", {
    JSCRevisionsLib: jscRevisionsLib.address,
    JSCConfigurableLib: jscConfigurableLib.address,
  })

  return {
    jscRevisionsLib,
    jscConfigurableLib,
    jscTitleTokenLib,
    jscJurisdiction,
    jscCabinet,
    jscGovernor,
    jscTitleToken
  }
}

export default deployAllContracts
