import create from 'zustand'
import { LikableItem, Like } from "../db/entities/Like";

export type LikeMap = { [itemId: string]: Like };
export type JurisdictionMap = { [jurisdicition: string]: LikeMap };

export type LikeAction = {
  jurisdiction: string
  itemId: string
  name: string
}

/** Convenience function to update Zustand state with a new like */
const addToLikedProposals = (state:ILikesState, like:Like, set:any) => {
  const likedProposals = {...state.likedProposals}
  if (!likedProposals[like.jurisdiction])
    likedProposals[like.jurisdiction] = {}
  likedProposals[like.jurisdiction][like.itemId] = like
  set({likedProposals})
}

/** Convenience function to update Zustand state removing an existing like */
const removeFromLikedProposals = (state:ILikesState, like:Like, set:any) => {
  const likedProposals = {...state.likedProposals}
  if (likedProposals[like.jurisdiction])
    delete likedProposals[like.jurisdiction][like.itemId]
  set({likedProposals})
}

/** Convenience function to update Zustand state with a new like */
const addToLikedTokens = (state:ILikesState, like:Like, set:any) => {
  const likedTokens = {...state.likedTokens}
  if (!likedTokens[like.jurisdiction])
    likedTokens[like.jurisdiction] = {}
  likedTokens[like.jurisdiction][like.itemId] = like
  set({likedTokens})
}

/** Convenience function to update Zustand state removing an existing like */
const removeFromLikedTokens = (state:ILikesState, like:Like, set:any) => {
  const likedTokens = {...state.likedTokens}
  if (likedTokens[like.jurisdiction])
    delete likedTokens[like.jurisdiction][like.itemId]
  set({likedTokens})
}

/*
 * Zustand state for likes
 *
 * Zustand is a React state management library that is similar to Redux but much simpler.
 * Zustand state is created with a function that returns an object with the state properties and functions to modify the state.
 * Zustand state is accessed with the useLikes() hook. But it must be initialized with the load() function before it can be used.
 * (In our case in the Layout component.)
 * 
 * Likes are created with the likeProposal() and likeToken() functions and passing in a Like entity object. They can be removed by
 * calling the unlikeProposal() and unlikeToken() functions.
 */
interface ILikesState {
  likedProposals:JurisdictionMap,
  likedTokens:JurisdictionMap,
  owner:string
  frontend:string
  chainId:number
  loaded:boolean

  /** Loads existing likes from the database. Must be called at once when React app loads */
  load: (owner:string, frontend:string, chainId:number) => void,

  /** Returns Like object if the given proposal is liked by the current user or null otherwise */
  likesProposal: (like:LikeAction) => Like|null,

  /** Saves the given like to the database */
  likeProposal: (like:LikeAction) => void,

  /** Removes the given like from the database */
  unlikeProposal: (like:LikeAction) => void,

  /** Returns Like object if the given token is liked by the current user or null otherwise */
  likesToken: (like:LikeAction) => Like|null,

  /** Saves the given like to the database */
  likeToken: (like:LikeAction) => void,

  /** Removes the given like from the database */
  unlikeToken: (like:LikeAction) => void,
}

const saveLikeToDatabase = async (like:Like) => {
  const response = await fetch('/api/likes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(like),
    })
  return new Like(await response.json())
}  

const removeLikeFromDatabase = async (id:number) => {
  await fetch('/api/likes/remove?id='+id)
    .catch((err) => {
      console.error("Error saving like", err)
    })
}

/** Create Zustand state with collection of all likes for current user */
export const useLikes = create<ILikesState>((set, get) => ({
  likedProposals: {} as JurisdictionMap,  
  likedTokens: {} as JurisdictionMap,
  owner:'',
  frontend:'',
  chainId:0,
  loaded: false,

  load: async (owner:string, frontend:string, chainId:number) => {
    const res = await fetch('/api/likes/get' +
      '?owner='+owner +
      '&frontend='+frontend +
      '&chainId='+chainId)
    const likes:Like[] = await res.json()

    const likedProposals:JurisdictionMap = {}
    const likedTokens:JurisdictionMap = {}
    likes.forEach(like => {
      if (like.itemType === LikableItem.Proposal) {
        if (!likedProposals[like.jurisdiction])
          likedProposals[like.jurisdiction] = {}
        likedProposals[like.jurisdiction][like.itemId] = like
      }
      else if (like.itemType === LikableItem.Token) {
        if (!likedTokens[like.jurisdiction])
          likedTokens[like.jurisdiction] = {}
        likedTokens[like.jurisdiction][like.itemId] = like
      }
    })
    set({
      likedProposals, 
      likedTokens, 
      owner,
      frontend,
      chainId,
      loaded:true})
  },

  likesProposal: (like:LikeAction) => {
    return get().likedProposals[like.jurisdiction]?.[like.itemId] || null
  },

  likeProposal: (like:LikeAction) => {
    if (!get().loaded) 
      return // Do nothing, still loading likes

    if (get().likesProposal(like))
      throw new Error("Proposal already liked")

    const state = get()
    const likeObject = new Like({
        name: like.name,
        owner: state.owner,
        jurisdiction: like.jurisdiction,
        itemType: LikableItem.Proposal,
        itemId: like.itemId,
        frontend: state.frontend,
        chainId: state.chainId
      })

    // Update state so UI is updated immediately
    addToLikedProposals(state, likeObject, set)

    // Save to DB and then update state again with correct id
    saveLikeToDatabase(likeObject).then((newLike) => addToLikedProposals(get(), newLike, set))
  },
  
  unlikeProposal: (like:LikeAction) => {
    if (!get().loaded) return // Do nothing, still loading likes
    
    const state = get()
    const dbLike = state.likesProposal(like)
    if (!dbLike)
      throw new Error("Proposal not liked")

    removeFromLikedProposals(state, dbLike, set)
    removeLikeFromDatabase(dbLike.id)
  },

  likesToken: (like:LikeAction) => {
    return get().likedTokens[like.jurisdiction]?.[like.itemId] || null
  },

  likeToken: (like:LikeAction) => {
    if (!get().loaded) 
      return // Do nothing, still loading likes

    if (get().likesToken(like))
      throw new Error("Token already liked")

    const state = get()
    const likeObject = new Like({
        name: like.name,
        owner: state.owner,
        jurisdiction: like.jurisdiction,
        itemType: LikableItem.Token,
        itemId: like.itemId,
        frontend: state.frontend,
        chainId: state.chainId
      })

    // Update state so UI is updated immediately
    addToLikedTokens(state, likeObject, set)

    // Save to DB and then update state again with correct id
    saveLikeToDatabase(likeObject).then((newLike) => addToLikedTokens(get(), newLike, set))
  },
  
  unlikeToken: (like:LikeAction) => {
    if (!get().loaded) return // Do nothing, still loading likes
    
    const state = get()
    const dbLike = state.likesToken(like)
    if (!dbLike)
      throw new Error("Token not liked")

    removeFromLikedTokens(state, dbLike, set)
    removeLikeFromDatabase(dbLike.id)
  },
}))