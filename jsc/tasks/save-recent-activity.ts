import axios from 'axios';
import { task } from "hardhat/config"
import { createSampleProposals } from "../utils/sample-proposals"
import * as tc from "../typechain-types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { sampleTokensAndOffers } from '../utils/sample-offers';
import accounts, { accountsByAddress } from "../utils/accounts"
import { VoteType } from "../utils/types";

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

    const activities:IRecentActivities[] = []

      // Recent activity for offers
      for (const name in sampleTokensAndOffers) {
      const titles = sampleTokensAndOffers[name];
      for (let i = 0; i < titles.length; i++) {
        const t = titles[i];
        for (let b = 0; b < t.offersToBuy.length; b++) {
          const o = t.offersToBuy[b];
          activities.push({
            account: o.buyer.address,
            url: `/jurisdiction/${jscJurisdictionContract.address}/token/${t.titleId}`,
            text: `Sent offer to buy ${t.titleId} from ${name} for ${o.amt/1000} ETH`,
            itemType: ActivitiesItem.OfferToBuy,
            frontend: frontend,
            chainId: chainId
          })
        }

        for (let s = 0; s < t.offersToSell.length; s++) {
          const o = t.offersToSell[s];
          activities.push({
            account: o.buyer.address,
            url: `/jurisdiction/${jscJurisdictionContract.address}/token/${t.titleId}`,
            text: `Sent offer to sell ${t.titleId} to ${name} for ${o.amt/1000} ETH`,
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
      activities.push({
        account: accounts[0].address,
        url: `/jurisdiction/${jscJurisdictionContract.address}/proposal/${p.proposalHash}`,
        text: `Proposal created by ${accounts[0].name}: ${p.description}`,
        itemType: ActivitiesItem.CreateProposal,
        frontend: frontend,
        chainId: chainId
      })
      for (let acc in p.whoHasVoted) {
        const v = p.whoHasVoted[acc];
        activities.push({
          account: acc,
          url: `/jurisdiction/${jscJurisdictionContract.address}/proposal/${p.proposalHash}`,
          text: `${accountsByAddress[acc].name} voted "${VoteType[v]}" on proposal "${p.description}"`,
          itemType: ActivitiesItem.Vote,
          frontend: frontend,
          chainId: chainId
        })
      }
    }

    await saveActivitiesToDatabase(activities, website);
});