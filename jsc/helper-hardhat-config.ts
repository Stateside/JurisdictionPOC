export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  staging: {},
  kovan: {
    blockConfirmations: 6,
  },
}

export const developmentChains = ["hardhat", "localhost"]
