import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { blocksPerWeek } from "../../utils/constants"
import { buildRoles } from "../../utils/roles"

const deployJSCCabinetInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, ethers } = hre
  const { log, get } = deployments
  const jscCabinetContract = await get("unittests_JSCCabinet")
  const jscJurisdictionContract = await get("unittests_JSCJurisdiction")
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log("----------------------------------------------------")
  log(`Initializing unittests_JSCCabinet...`)
  const [owner, bob, jane, sara, bryan, paul, alex, ...otherAccounts] = await ethers.getSigners();
  const r = buildRoles(ethers)
  const J = r.JUDICIAL_ROLE.id
  const L = r.LEGISLATIVE_ROLE.id
  const E = r.EXECUTIVE_ROLE.id

  const jscCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)
  await jscCabinet.init(jscJurisdictionContract.address,
    [bob.address,  jane.address, sara.address, bryan.address,  paul.address, alex.address],
    [J,            L,            L,            E,              E,            E],
    zeroAddress,
    {
      votingPeriod: blocksPerWeek,
      approvals: 0,
      majority: 51,
      quorum: 51,
      role: E,
    })
  }

export default deployJSCCabinetInit
deployJSCCabinetInit.tags = ["all", "unittests", "unittests_JSCCabinet"]
