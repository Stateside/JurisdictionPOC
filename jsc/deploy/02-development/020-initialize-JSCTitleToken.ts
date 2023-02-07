import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { Account, accountsByName, accountsByAddress, buildWallets } from "../../utils/accounts"
import * as tc from "../../typechain-types"

// @ts-ignore
import { ethers } from "hardhat" 

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
  
  try {
	  await jscTitleToken.init(
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
  } catch (error) {
    console.log(error)
  }
  const { Bob, Sara, Jane, Bryan, Rich, Alex, Peter } = accountsByName

  type Offer = { buyer: Account, amt: number }
  type TitleToken = {titleId: string, offersToBuy: Offer[], offersToSell: Offer[]}
  const tokens:{[name: string]: TitleToken[]} = {
    "Bob": [
      {
        titleId: "title-1", 
        offersToBuy: [{buyer: Sara, amt: 1000}], 
        offersToSell: [{buyer: Jane, amt: 2000}]
      }
    ],
    "Sara": [
      {
        titleId: "title-2", 
        offersToBuy: [{buyer: Jane, amt: 2500}], 
        offersToSell: [{buyer: Bryan, amt: 3000}]
      },
      {
        titleId: "title-3", 
        offersToBuy: [{buyer: Bryan, amt: 3500}], 
        offersToSell: [{buyer: Peter, amt: 4000}]
      }
    ],
    "Jane":  [
      {
        titleId: "title-4", 
        offersToBuy: [{buyer: Peter, amt: 4500}], 
        offersToSell: [{buyer: Alex, amt: 5000}]
      },
      {
        titleId: "title-5", 
        offersToBuy: [{buyer: Alex, amt: 5500}], 
        offersToSell: [{buyer: Bryan, amt: 6000}]
      }
    ],
    "Bryan": [{
        titleId: "title-6", 
        offersToBuy: [{buyer: Rich, amt: 6500}], 
        offersToSell: [{buyer: Peter, amt: 7000}]
      },
      {
        titleId: "title-7", 
        offersToBuy: [{buyer: Peter, amt: 7500}], 
        offersToSell: [{buyer: Bob, amt: 8000}]
      },
      {
        titleId: "title-8", 
        offersToBuy: [{buyer: Bob, amt: 8500}], 
        offersToSell: [{buyer: Sara, amt: 9000}]}
    ],
    "Rich":  [
      {
        titleId: "title-9", 
        offersToBuy: [{buyer: Jane, amt: 1010}], 
        offersToSell: [{buyer: Bryan, amt: 2010}]
      },
      {
        titleId: "title-10", 
        offersToBuy: [{buyer: Bryan, amt: 3010}], 
        offersToSell: [{buyer: Alex, amt: 4010}]
      },
      {
        titleId: "title-11", 
        offersToBuy: [{buyer: Alex, amt: 5010}], 
        offersToSell: [{buyer: Bob, amt: 6010}]
      },
      {
        titleId: "title-12", 
        offersToBuy: [{buyer: Bob, amt: 7010}], 
        offersToSell: [{buyer: Peter, amt: 8010}]
      }
    ],
    "Alex":  [
      {
        titleId: "title-13", 
        offersToBuy: [{buyer: Peter, amt: 1100}], 
        offersToSell: [{buyer: Jane, amt: 2100}]
      },
      {
        titleId: "title-14", 
        offersToBuy: [{buyer: Jane, amt: 1200}], 
        offersToSell: [{buyer: Bryan, amt: 2200}]
      },
      {
        titleId: "title-15", 
        offersToBuy: [{buyer: Bryan, amt: 1300}], 
        offersToSell: [{buyer: Bob, amt: 2300}]
      },
      {
        titleId: "title-16", 
        offersToBuy: [{buyer: Bob, amt: 1400}], 
        offersToSell: [{buyer: Sara, amt: 2400}]
      },
      {
        titleId: "title-17", 
        offersToBuy: [{buyer: Sara, amt: 1500}], 
        offersToSell: [{buyer: Jane, amt: 2500}]
      },
      {
        titleId: "title-18", 
        offersToBuy: [{buyer: Jane, amt: 1600}], 
        offersToSell: [{buyer: Bryan, amt: 2600}]
      },
      {
        titleId: "title-19", 
        offersToBuy: [{buyer: Bryan, amt: 1700}], 
        offersToSell: [{buyer: Bob, amt: 2700}]
      },
      {
        titleId: "title-20", 
        offersToBuy: [{buyer: Bob, amt: 1800}], 
        offersToSell: [{buyer: Sara, amt: 2800}]
      }
    ],
    "Peter": [
      {
        titleId: "title-21", 
        offersToBuy: [{buyer: Sara, amt: 1000}], 
        offersToSell: [{buyer: Jane, amt: 2000}]
      }
    ],
  }

  try {
	  const wallets = buildWallets(ethers)
	  for (const name in tokens) {
	      const titles = tokens[name];
	      for (let i = 0; i < titles.length; i++) {
	        const t = titles[i];
	        const owner = accountsByName[name]
	        await jscTitleToken.mint(owner.address, t.titleId)
	        const tokenId = await jscTitleToken.titleToTokenId(t.titleId);
	        for (let b = 0; b < t.offersToBuy.length; b++) {
	          const o = t.offersToBuy[b];
	          await jscTitleToken.connect(wallets[o.buyer.name]).offerToBuy(tokenId, eth2WEI(o.amt/1000), payETH(o.amt/1000))
	        }
	        for (let s = 0; s < t.offersToSell.length; s++) {
	          const o = t.offersToSell[s];
	          await jscTitleToken.connect(wallets[owner.name]).offerToSell(tokenId, o.buyer.address, eth2WEI(o.amt/1000))
	        }
	      }
	  }
	
  } catch (error) {
    console.log(error)
  }
  // In development we will freeze Peters account for testing
  await jscTitleToken.setFrozenOwner(Peter.address, true);
  const tokenId = await jscTitleToken.titleToTokenId("title-14")
  await jscTitleToken.setFrozenToken(tokenId, true);

  log(`development_JSCTitleToken Initialized with the following tokens:`)
  log("/--------------------------------------------------------------\\")
  const cnt = await (await jscTitleToken.totalSupply()).toNumber();
  for (let i = 0; i < cnt; i++) {
    const tokenId = await jscTitleToken.tokenAtIndex(i)
    const titleId = await jscTitleToken.tokenToTitleId(tokenId);
    const owner = await jscTitleToken.ownerOf(tokenId);
    log(`${titleId} owned by ${owner} (${accountsByAddress[owner.toLowerCase()].name})`)

    log(`  Offers to Buy:`)
    const obCnt = (await jscTitleToken.countOffersToBuy(tokenId)).toNumber()
    for (let b = 0; b < obCnt; b++) {
      const ob = await jscTitleToken.offerToBuyAtIndex(tokenId, b);
      log(`    Offer to Buy: From ${ob.buyer} (${accountsByAddress[ob.buyer.toLowerCase()].name}) for ${ob.amount}`)
    }

    log(`  Offers to Sell:`)
    const osCnt = (await jscTitleToken.countOffersToSell(tokenId)).toNumber()
    for (let s = 0; s < osCnt; s++) {
      const os = await jscTitleToken.offerToSellAtIndex(tokenId, s);
      log(`    Offer to Sell: From ${os.buyer} (${accountsByAddress[os.buyer.toLowerCase()].name}) for ${os.amount}`)
    }
  }
  log("\\--------------------------------------------------------------/")

  jscTitleToken.transferOwnership(jscGovernorContract.address)
}

export default initializeJSCTitleToken
initializeJSCTitleToken.tags = ["all", "development"]
