import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import * as tc from "../../typechain-types"
import {accountsByName, accountsByAddress} from "../../utils/accounts"
import { buildRoles } from "../../utils/roles"

// @ts-ignore
import { ethers } from "hardhat" 

const initializeJSCCabinet: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("development_JSCJurisdiction")
  const jscGovernorContract = await get("development_JSCGovernor")
  const jscCabinetContract = await get("development_JSCCabinet")

  const roles = buildRoles(ethers)
  log(`----------------------------------------------------`)
  log("Initializing development_JSCCabinet...")
  const jscCabinet:tc.IJSCCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)
  const tx = await jscCabinet.init(jscJurisdiction.address,
    [accountsByName["Bob"].address,  accountsByName["Jane"].address, accountsByName["Sara"].address],
    [roles.JUDICIAL_ROLE.id,         roles.LEGISLATIVE_ROLE.id,      roles.EXECUTIVE_ROLE.id],
    jscGovernorContract.address,
    {
      votingPeriod: 50,
      approvals: 1,
      majority: 0,
      quorum: 0,
      role: ethers.constants.HashZero,
    }
  )
  await tx.wait()
}

export default initializeJSCCabinet
initializeJSCCabinet.tags = ["all", "development"]
