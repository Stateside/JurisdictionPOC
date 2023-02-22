export enum ActivitiesItem {
  OfferToBuy = "Offer to buy",
  OfferToSell = "Offer to sell",
  AcceptOfferToBuy = "Accept offer to buy",
  AcceptOfferToSell = "Accept offer to sell",
  RetractOfferToBuy = "Retract offer to buy",
  RetractOfferToSell = "Retract offer to sell",
  Vote = "Vote",
  ExecuteProposal = "Execute Proposal"
}

export interface IRecentActivities {
  id: number
  url: string
  text: string
  itemType: ActivitiesItem
  account: string
  frontend: string
  chainId: number
  createdAt: Date
}