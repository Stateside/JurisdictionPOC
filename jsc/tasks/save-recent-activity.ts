import axios from 'axios';
import { task } from "hardhat/config"
import { createSampleProposals } from "../utils/sample-proposals"
import * as tc from "../typechain-types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { sampleTokensAndOffers } from '../utils/sample-offers';
import accounts, { accountsByAddress, accountsByName } from "../utils/accounts"
import { VoteType } from "../utils/types";
import random from "../utils/random";

declare global {
  const ethers: any
}

export enum ActivitiesItem {
  OfferToBuy = "Offer to buy",
  OfferToSell = "Offer to sell",
  CreateProposal = "Create Proposal",
  Vote = "Vote",
  ExecuteProposal = "Execute Proposal"
}

export interface IRecentActivities {
  url: string
  text: string
  itemType: ActivitiesItem
  account: string
  frontend: string
  chainId: number
}

const saveActivitiesToDatabase = async (activities:IRecentActivities[], website:string) => {
  return await axios.post(website+"/api/recent_activities/save", activities)
}

task("save-recent-activity", "Write activity records for sample data to the database for the given website")
  .addParam("frontend", "The frontend for the activities", "paul")
  .addParam("website", "The website to save proposals for", "http://localhost:3000")
  .addParam("prefix", "The prefix the contract names to save the proposals for", "development")
  .setAction(async (taskArgs:any, hre: HardhatRuntimeEnvironment) => {
    // @ts-ignore
    const { deployments, network } = hre
    const { get } = deployments

    const { website, prefix, frontend } = taskArgs;
    const chainId = network.config.chainId || 0;

    const jscJurisdictionContract = await get(prefix+"_JSCJurisdiction")
    const jscGovernorContract = await get(prefix+"_JSCGovernor")
    const jscCabinetContract = await get(prefix+"_JSCCabinet")
    const jscTitleTokenContract = await get(prefix+"_JSCTitleTokenTest")

    const jscTitleToken:tc.IJSCTitleToken = await ethers.getContractAt("JSCTitleTokenTest", jscTitleTokenContract.address)
    const jscGovernor:tc.IJSCGovernor = await ethers.getContractAt("JSCGovernor", jscGovernorContract.address)
    const jscCabinet:tc.IJSCCabinet = await ethers.getContractAt("JSCCabinet", jscCabinetContract.address)

    // randomly sort the activities but keep some activities before others
    const firstActivities:IRecentActivities[] = []
    const secondActivities:IRecentActivities[] = []

    // Recent activity for offers
    for (const name in sampleTokensAndOffers) {
      const titles = sampleTokensAndOffers[name];
      for (let i = 0; i < titles.length; i++) {
        const activities = random(2) < 1 ? firstActivities : secondActivities;
        const t = titles[i];
        for (let b = 0; b < t.offersToBuy.length; b++) {
          const o = t.offersToBuy[b];
          activities.push({
            account: o.buyer.address,
            url: `/jurisdiction/${jscJurisdictionContract.address}/token/${t.titleId}`,
            text: `${o.buyer.name} sent an offer to buy ${t.titleId} from ${t.owner.name} for ${o.amt/1000} ETH`,
            itemType: ActivitiesItem.OfferToBuy,
            frontend: frontend,
            chainId: chainId
          })
        }

        for (let s = 0; s < t.offersToSell.length; s++) {
          const o = t.offersToSell[s];
          activities.push({
            account: t.owner.address,
            url: `/jurisdiction/${jscJurisdictionContract.address}/token/${t.titleId}`,
            text: `${t.owner.name} sent an offer to sell ${t.titleId} to ${o.buyer.name} for ${o.amt/1000} ETH`,
            itemType: ActivitiesItem.OfferToSell,
            frontend: frontend,
            chainId: chainId
          })
        }
      }
    }

    // Recent activity for proposals and votes
    const proposals = await createSampleProposals(ethers, jscGovernor, jscCabinet, jscTitleToken);
    for (let i = 0; i < proposals.length; i++) {
      const p = proposals[i];
      firstActivities.push({
        account: accounts[0].address,
        url: `/jurisdiction/${jscJurisdictionContract.address}/proposal/${p.proposalHash.toHexString()}`,
        text: `Proposal created by ${accounts[0].name}: ${p.description}`,
        itemType: ActivitiesItem.CreateProposal,
        frontend: frontend,
        chainId: chainId
      })
      for (let acc in p.whoHasVoted) {
        const v = p.whoHasVoted[acc];
        secondActivities.push({
          account: acc,
          url: `/jurisdiction/${jscJurisdictionContract.address}/proposal/${p.proposalHash.toHexString()}`,
          text: `${accountsByAddress[acc].name} voted "${VoteType[v]}" on proposal "${p.description}"`,
          itemType: ActivitiesItem.Vote,
          frontend: frontend,
          chainId: chainId
        })
      }
    }

    // randomly sort both arrays
    randomize(firstActivities);
    randomize(secondActivities);
    
    await saveActivitiesToDatabase([...firstActivities, ...secondActivities], website);
});

function randomize(arr: any[]) {
  for (let i = 0; i < arr.length-1; i++) {
    const j = random(arr.length-1);
    if (i !== j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}