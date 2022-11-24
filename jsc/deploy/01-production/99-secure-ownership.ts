import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 

const secureOwnership: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments } = hre
  const { log, get } = deployments
  const jscCabinetContract = await get("production_JSCCabinet")
  const jscTitleTokenContract = await get("production_JSCTitleToken")
  const jscJurisdictionContract = await get("production_JSCJurisdiction")
  const jscGovernorContract = await get("production_JSCGovernor")

  const jscJurisdiction:tc.JSCJurisdiction = await ethers.getContractAt("JSCJurisdiction", jscJurisdictionContract.address)
  const jscTitleToken:tc.JSCTitleToken = await ethers.getContractAt("JSCTitleToken", jscTitleTokenContract.address)
  const jscGovernor:tc.JSCGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
  const jscCabinet:tc.JSCCabinet = await ethers.getContractAt("JSCJurisdiction", jscCabinetContract.address)

  log("Changing ownership of all contracts -> production_JSCGovernor")
  jscJurisdiction.transferOwnership(jscGovernor.address);
  jscTitleToken.transferOwnership(jscGovernor.address);
  jscGovernor.transferOwnership(jscGovernor.address);
  jscCabinet.transferOwnership(jscGovernor.address);
  log("Done!")
}

export default secureOwnership
secureOwnership.tags = ["all", "production"]
