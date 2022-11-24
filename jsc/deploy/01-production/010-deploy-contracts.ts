import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployAllContracts from '../utils/deploy-all-contracts'

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await deployAllContracts(hre, "production_")
}

export default deployContracts
deployContracts.tags = ["all", "production"]
