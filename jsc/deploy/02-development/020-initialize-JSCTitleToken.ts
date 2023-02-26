import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { accountsByName, buildWallets } from "../../utils/accounts"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 
import { sampleTokensAndOffers } from "../../utils/sample-offers"

const eth2WEI = (eth:number):ethers.BigNumber => ethers.utils.parseEther(eth.toString())
const payETH = (eth:number):ethers.PayableOverrides => ({ value: eth2WEI(eth) })

const initializeJSCTitleToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, network } = hre
  const chainId = network.config.chainId || 0;
  const { log, get } = deployments
  const jscJurisdictionContract = await get("development_JSCJurisdiction")
  const jscGovernorContract = await get("development_JSCGovernor")
  const jscTitleTokenContract = await get("development_JSCTitleTokenTest")
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  log(`----------------------------------------------------`)
  log("Initializing development_JSCTitleTokenTest...")
  const jscTitleToken:tc.JSCTitleTokenTest = await ethers.getContractAt("JSCTitleTokenTest", jscTitleTokenContract.address)
  let transactions: any[] = []
  
  try {
	  const tx = await jscTitleToken.init(
	    "Our Title Token",
	    "OTT",
	    chainId === 41506 ? "https://jurisdictions.stateside.agency/api/token/" : "http://localhost:3000/api/token/",
	    jscJurisdictionContract.address,
	    accountsByName["Mary"].address,
	    ethers.utils.parseUnits("0.1", "gwei"),
	    accountsByName["Sophia"].address,
	    ethers.utils.parseUnits("0.2", "gwei"),
	    true,
	    zeroAddress,
      {
        votingPeriod: 50,
        approvals: 1,
        majority: 0,
        quorum: 0,
        role: ethers.constants.HashZero,
      }
    )
    const receipt = await tx.wait()
    log('Transaction cost: ', ethers.utils.formatEther(ethers.BigNumber.from(receipt.gasUsed).mul(receipt.effectiveGasPrice)))
  } catch (error) {
    console.log(error)
  }

  const { Peter } = accountsByName

  // First mint the tokens and wait until they are all confirmed
  const wallets = buildWallets(ethers)
  for (const name in sampleTokensAndOffers) {
      const titles = sampleTokensAndOffers[name];
      for (let i = 0; i < titles.length; i++) {
        const t = titles[i];
        const owner = accountsByName[name]
        console.log(`Minting ${t.titleId} for ${name}`)
        transactions.push(await jscTitleToken.mint(owner.address, t.titleId))
      }
  }

  // Wait for all transactions to be confirmed
  console.log(`Waiting for tokens...`)
  for (let i = 0; i < transactions.length; i++) {
    const receipt = await transactions[i].wait();
    log('Transaction cost: ', ethers.utils.formatEther(ethers.BigNumber.from(receipt.gasUsed).mul(receipt.effectiveGasPrice)))
  }

  for (const name in sampleTokensAndOffers) {
    const titles = sampleTokensAndOffers[name];
    for (let i = 0; i < titles.length; i++) {
      const t = titles[i];
      const owner = accountsByName[name]
      const tokenId = await jscTitleToken.titleToTokenId(t.titleId);
      for (let b = 0; b < t.offersToBuy.length; b++) {
        const o = t.offersToBuy[b];
        console.log(`Offering to buy ${t.titleId} from ${name} for ${o.amt} by ${o.buyer.name}`)
        await jscTitleToken.connect(wallets[o.buyer.name]).offerToBuy(tokenId, eth2WEI(o.amt/1000), payETH(o.amt/1000))
      }
      for (let s = 0; s < t.offersToSell.length; s++) {
        const o = t.offersToSell[s];
        console.log(`Offering to sell ${t.titleId} from ${name} for ${o.amt} to ${o.buyer.name}`)
        await jscTitleToken.connect(wallets[owner.name]).offerToSell(tokenId, o.buyer.address, eth2WEI(o.amt/1000))
      }
    }
  }

  transactions = []

  // In development we will freeze Peters account for testing
  console.log(`Freezing Peter's account`)
  transactions.push(await jscTitleToken.setFrozenOwner(Peter.address, true))
  const tokenId = await jscTitleToken.titleToTokenId("title-14")
  console.log(`Freezing title-14`)
  transactions.push(await jscTitleToken.setFrozenToken(tokenId, true))
  transactions.push(await jscTitleToken.transferOwnership(jscGovernorContract.address))

  for (let i = 0; i < transactions.length; i++) {
    const receipt = await transactions[i].wait();
    log('Transaction cost: ', ethers.utils.formatEther(ethers.BigNumber.from(receipt.gasUsed).mul(receipt.effectiveGasPrice)))
  }
}

export default initializeJSCTitleToken
initializeJSCTitleToken.tags = ["all", "development"]
