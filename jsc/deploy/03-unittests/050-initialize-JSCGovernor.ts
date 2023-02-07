import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 
import { blocksPerWeek } from "../../utils/constants"
import { buildRoles } from "../../utils/roles"

const deployJSCGovernorInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscGovernorContract = await get("unittests_JSCGovernor")
  const jscJurisdictionContract = await get("unittests_JSCJurisdiction")

  log("----------------------------------------------------")
  log(`Initializing unittests_JSCGovernor...`)
  const jscGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
  await jscGovernor.init(jscJurisdictionContract.address, false,
    {
      votingPeriod: blocksPerWeek,
      approvals: 0,
      majority: 51,
      quorum: 51,
      role: buildRoles(ethers).EXECUTIVE_ROLE.id,
    }
  )
}

export default deployJSCGovernorInit
deployJSCGovernorInit.tags = ["all", "unittests", "unittests_JSCGovernor"]
