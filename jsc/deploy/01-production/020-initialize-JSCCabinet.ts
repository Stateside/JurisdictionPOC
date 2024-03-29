import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat" 

const deployJSCCabinetInit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, ethers } = hre
  const { log, get } = deployments
  const jscGovernorContract = await get("production_JSCGovernor")
  const jscCabinetContract = await get("production_JSCCabinet")
  const jscJurisdictionContract = await get("production_JSCJurisdiction")

  log("----------------------------------------------------")
  log(`Initializing production_JSCCabinet...`)
  const [owner, bob, jane, sara, bryan, paul, alex, ...otherAccounts] = await ethers.getSigners();
  const J = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("JUDICIAL_ROLE"))
  const L = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGISLATIVE_ROLE"))
  const E = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("EXECUTIVE_ROLE"))

  const jscCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)
  await jscCabinet.init(jscJurisdictionContract.address,
    [bob.address,  jane.address, sara.address, bryan.address,  paul.address, alex.address],
    [J,            L,            L,            E,              E,            E], 
    jscGovernorContract.address)
  }

export default deployJSCCabinetInit
deployJSCCabinetInit.tags = ["all", "production", "production_JSCCabinet"]
