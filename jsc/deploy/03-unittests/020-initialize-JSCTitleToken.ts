import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 
import { blocksPerWeek } from "../../utils/constants"
import { buildRoles } from "../../utils/roles"

const deployJSCTitleTokenInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscJurisdiction = await get("unittests_JSCJurisdiction")
  const jscTitleTokenContract = await get("unittests_JSCTitleToken")
  const jscTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenContract.address)
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log("----------------------------------------------------")
  log(`Initializing unittests_JSCTitleToken...`)
  await jscTitleToken.init(
    "Demo", 
    "DEMO", 
    "https://stateside.agency/jsc/tokens/", 
    jscJurisdiction.address,
    zeroAddress,
    0,
    zeroAddress,
    0,
    true,
    zeroAddress,
    {
      votingPeriod: blocksPerWeek,
      approvals: 0,
      majority: 51,
      quorum: 51,
      role: buildRoles(ethers).EXECUTIVE_ROLE.id,
    }
  ); 
}

export default deployJSCTitleTokenInit
deployJSCTitleTokenInit.tags = ["all", "unittests", "unittests_JSCTitleToken"]
