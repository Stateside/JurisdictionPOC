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
  log("Initializing development_JSCCabinet...")
  const jscCabinet:tc.IJSCCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)
  await jscCabinet.init(jscJurisdiction.address,
    [accountsByName["Bob"].address,  accountsByName["Jane"].address, accountsByName["Sara"].address],
    [roles.JUDICIAL_ROLE.id,         roles.LEGISLATIVE_ROLE.id,      roles.EXECUTIVE_ROLE.id],
    jscGovernorContract.address)
  
  log(`development_JSCCabinet Initialized with the following roles:`)
  log("/----------------------------------------------------------\\")
  const roleCount = await (await jscCabinet.getRoleCount()).toNumber();
  for (let r = 0; r < roleCount; r++) {
    const roleId = await jscCabinet.getRoleAt(r);
    log(`Role: ${roleId} (${roles.rolesById[roleId.toLowerCase()].name})`)
    const roleMemberCount = await (await jscCabinet.getRoleMemberCount(roleId)).toNumber();
    for (let rm = 0; rm < roleMemberCount; rm++) {
      const acc = await jscCabinet.getRoleMember(roleId, rm);
      log(`    ${acc} (${accountsByAddress[acc.toLowerCase()].name})`)
    }    
  }
  log("\\----------------------------------------------------------/")
}

export default initializeJSCCabinet
initializeJSCCabinet.tags = ["all", "development"]
