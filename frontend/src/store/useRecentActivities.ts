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
 * Recent Activities are created with the activityToken() function and passing in a IRecentActivities entity object.
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

  isInitialized: () => boolean,

  /** Saves the given Recent Acytivity to the database */
  activityToken: (msg:string, action:string, account: string, jurisdiction:string, title:string) => void,

  loadPage: (page:number) => Promise<RecentActivityPage>
}

const saveActivityToDatabase = async (activity:IRecentActivities) => {
  console.log("Guarda a BD");
  console.log(activity);
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

  activityToken: (msg, action, account, jurisdiction, title) => {
    let url_property: string = '/jurisdiction/' + jurisdiction + '/token/' + title;
    const state = get()
    console.log(state)
    let activity = ""
    if (action === "OfferToBuy") 
      activity = ActivitiesItem.OfferToBuy
    if (action === "OfferToSell") 
      activity = ActivitiesItem.OfferToSell
    if (action === "AcceptOfferToBuy") 
      activity = ActivitiesItem.AcceptOfferToBuy
    if (action === "AcceptOfferToSell") 
      activity = ActivitiesItem.AcceptOfferToSell
    if (action === "RetractOfferToBuy") 
      activity = ActivitiesItem.RetractOfferToBuy
    if (action === "RetractOfferToSell") 
      activity = ActivitiesItem.RetractOfferToSell
    if (action === "Vote") 
      activity = ActivitiesItem.Vote
    if (action === "ExecuteProposal") 
      activity = ActivitiesItem.ExecuteProposal

    const activityObject = {
        url:url_property,
        text: msg,
        account: account,
        itemType:activity,
        frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
        chainId: state.chainId
      } as IRecentActivities


    // Save to DB
    saveActivityToDatabase(activityObject)
  },
}))