import { VoteType } from '@/utils/types';
import create from 'zustand'
import { ActivitiesItem, IRecentActivities } from "../db/interfaces/IRecentActivities";

export type RecentActivityPage = IRecentActivities[]
export type RecentActivityPages = { [pageNo: number]: RecentActivityPage }
export type RecentActivityPromises = { [pageNo: number]: Promise<RecentActivityPage> }

/*
 * Zustand state for Recent Activities
 *
 * Zustand is a React state management library that is similar to Redux but much simpler.
 * Zustand state is created with a function that returns an object with the state properties and functions to modify the state.
 * Zustand state is accessed with the useRecentActivities() hook. But it must be initialized with the init() function before it can be used.
 * (In our case in the Layout component.)
 * 
 * Recent Activities are created with the saveTokenActivity() function and passing in a IRecentActivities entity object.
 */
interface IActivitiesState {
  pages: RecentActivityPages
  pageSize:number
  totalCount: number,
  loadingPages: RecentActivityPromises
  ownerView:boolean
  chainId:number

  /** Loads existing Recent Activities from the database. Must be called at least once when React app loads. If an ownerView is true then only activity related to title tokens. */
  init: (chainId:number, ownerView:boolean) => void,

  reload: () => void,

  isInitialized: () => boolean,

  /** Saves the given Recent Acytivity to the database */
  saveTokenActivity: (msg:string, action:string, account: string, jurisdiction:string, title:string) => void,

  /** Saves the given Recent Proposal Execution to the database */
  saveCreateProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string) => void

  /** Saves the given Recent Vote to the database */
  saveVoteOnProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string, vote:VoteType) => void,

  /** Saves the given Recent Proposal Execution to the database */
  saveExecuteProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string) => void

  loadPage: (page:number) => Promise<RecentActivityPage>
}

const saveActivityToDatabase = async (activity:IRecentActivities) => {
  const response = await fetch('/api/recent_activities/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    })
  const newActivity = await response.json() as IRecentActivities
  return {
    ...newActivity,
    createdAt: new Date(newActivity.createdAt)
  }
}

/** Create Zustand state with collection of all Recent Activities for current user */

export const useRecentActivities = create<IActivitiesState>((set, get) => ({
  loadingPages: {},
  pages: {},
  totalCount: -1,
  ownerView:false,
  chainId:0,
  pageSize:0,

  init: async (chainId:number, ownerView:boolean = false, pageSize:number = 12) => {
    if (get().chainId === chainId && ownerView === get().ownerView && pageSize === get().pageSize)
      return

    const loadCount = async () => {
      const res = await fetch('/api/recent_activities/count' +
        '?ownerView='+ownerView +
        ('&frontend='+process.env.NEXT_PUBLIC_FRONTEND||"") +
        '&chainId='+chainId)
      const { count } = await res.json()
      set({ totalCount: count })
      return count
    }
    loadCount() 

    set({
      loadingPages: {},
      pages: {},
      ownerView,
      chainId,
      pageSize
    })
  },

  isInitialized: () => get().chainId !== 0,

  reload: () => {
    set({
      loadingPages: {},
      pages: {},
    })
  },

  loadPage: async (page:number):Promise<RecentActivityPage> => {
    if (get().chainId === 0)
      throw new Error("Recent Activities not initialized")

    if (get().pages[page])
      return get().pages[page]

    const load = async (page:number) => {
      const pageSize = get().pageSize
      const ownerView = get().ownerView
      const chainId = get().chainId
      const res = await fetch('/api/recent_activities/get' +
        '?ownerView='+ownerView +
        '&offset='+(page*pageSize)+"&limit="+pageSize +
        ('&frontend='+process.env.NEXT_PUBLIC_FRONTEND||"") +
        '&chainId='+chainId)
      const jsonActivities = await res.json()
      
      // change date string to Date objects
      const activities:IRecentActivities[] = jsonActivities.map((a:any) => {
        a.createdAt = new Date(a.createdAt)
        return a
      })

      // Remove promise
      set((state) => {
        const lp = { ...state.loadingPages }
        delete lp[page]

        return {
          loadingPages: lp
        }
      })

      // Store new page
      set((state) => ({
        pages: {...state.pages,
          [page]: activities
        }
      }))

      return activities
    }
    const promise = load(page) 

    set((state) => ({ 
      loadingPages: {...state.loadingPages,
        [page]:promise
      } 
    }))

    return promise
  },

  saveTokenActivity: (msg, action, account, jurisdiction, title) => {
    let url_property: string = '/jurisdiction/' + jurisdiction + '/token/' + title;
    const state = get()
    console.log(state)
    let activity: ActivitiesItem = (<any>ActivitiesItem)[action];

    const activityObject = {
        url:url_property,
        text: msg,
        account: account,
        itemType:activity,
        frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
        chainId: state.chainId
      } as IRecentActivities

    saveActivityToDatabase(activityObject)
    get().reload()
  },

  saveCreateProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string) => {
    const chainId = get().chainId
    const activityObject = {
      url: `/jurisdiction/${jurisdiction}/proposal/${proposalId}`,
      text: `${accountName} created the proposal "${proposalDescription}"`,
      account: accountAddress,
      itemType: ActivitiesItem.CreateProposal,
      frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
      chainId: chainId
    } as IRecentActivities

    saveActivityToDatabase(activityObject)
    get().reload()
  },

  saveVoteOnProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string, vote:VoteType) => {
    const chainId = get().chainId
    let msg = `${accountName} voted "${VoteType[vote]}" the proposal "${proposalDescription}"`
    if (vote === VoteType.Abstain)
      msg = `${accountName} abstained from voting on the proposal "${proposalDescription}"`

    const activityObject = {
      url: `/jurisdiction/${jurisdiction}/proposal/${proposalId}`,
      text: msg,
      account: accountAddress,
      itemType: ActivitiesItem.Vote,
      frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
      chainId: chainId
    } as IRecentActivities

    saveActivityToDatabase(activityObject)
    get().reload()
  },

  saveExecuteProposalActivity: (accountAddress:string, accountName:string, jurisdiction:string, proposalId:string, proposalDescription:string) => {
    const chainId = get().chainId
    const activityObject = {
      url: `/jurisdiction/${jurisdiction}/proposal/${proposalId}`,
      text: `${accountName} executed the proposal "${proposalDescription}"`,
      account: accountAddress,
      itemType: ActivitiesItem.ExecuteProposal,
      frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
      chainId: chainId
    } as IRecentActivities

    saveActivityToDatabase(activityObject)
    get().reload()
  }
}))