import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import "@nomicfoundation/hardhat-chai-matchers"
import { HardhatUserConfig } from "hardhat/config"
import "./tasks/save-proposals"
import "./tasks/save-contracts"
import { accountsByName } from "./utils/accounts"

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 40506,
    },
    localhost: {
      chainId: 40506,
    },
    staging: {
      chainId: 41506,
      url: "https://jurisdictions-geth.stateside.agency",
      accounts: [accountsByName["Oscar"].privateKey]
    },
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
}

export default config
