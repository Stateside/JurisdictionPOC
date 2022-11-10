// @ts-ignore
import { ethers } from "hardhat"

/** This script changes the owners of all the jurisdiciton contrats to be the JSCGovernor contract. After that, 
  * all changes must be made using proposals in the JSCGovernor contract
  */
export async function setJSCGovernorOwned() {
  const jscJurisdiction = await ethers.getContract("JSCJurisdiction")
  const jscTitleToken = await ethers.getContract("JSCTitleToken")
  const jscGovernor = await ethers.getContract("JSCGovernor")

  console.log(`Applying governor ownership...`)
  const j = await ethers.getContractAt("JSCJurisdiction", jscJurisdiction.address)
  await j.transferOwnership(jscGovernor.address)

  const t = await ethers.getContractAt("JSCTitleToken", jscTitleToken.address)
  await t.transferOwnership(jscGovernor.address)

  const g = await ethers.getContractAt("JSCGovernor", jscGovernor.address)
  await g.transferOwnership(jscGovernor.address)
}

setJSCGovernorOwned()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })