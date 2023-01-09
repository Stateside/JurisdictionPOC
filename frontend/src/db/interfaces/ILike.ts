export enum LikableItem {
  Token = "token",
  Proposal = "proposal"
}

export interface ILike {
  id: number
  name: string
  itemType: LikableItem
  itemId: string
  jurisdiction: string
  owner: string
  frontend: string
  chainId: number
  createdAt: Date
  updatedAt: Date
}
