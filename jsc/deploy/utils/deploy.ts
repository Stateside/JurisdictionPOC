import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, developmentChains } from "../../helper-hardhat-config"
import verify from "../../helper-functions"

/** Deploys the given smart contract or library. The 'name' parameter is an alias that we can use to identify the instance from Hardhat */

const deploy = async (hre: HardhatRuntimeEnvironment, name:string, contract:string, libraries:any) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log(`----------------------------------------------------`)
  log(`Deploying ${name}...`)
  const deployedContract = await deploy(`${name}`, {
    from: deployer,
    contract: `${contract}`,
    args: [],
    log: true,
    libraries,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(deployedContract.address, [])
  }
  log(`${name} deployed at ${deployedContract.address}`)

  return deployedContract
}

export default deploy