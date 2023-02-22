import create from 'zustand'
import { ActivitiesItem, IRecentActivities } from "../db/interfaces/IRecentActivities";

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
  owner:string
  chainId:number
  loaded:boolean

  /** Loads existing Recent Activities from the database. Must be called at least once when React app loads */
  init: (owner:string, chainId:number) => void,

  /** Saves the given Recent Acytivity to the database */
  activityToken: (msg:string, action:string, account: string, jurisdiction:string, title:string) => void,

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
  owner:'',
  chainId:0,
  loaded: false,

  // TO DO - GET
  init: async (owner:string, chainId:number) => {
    if (get().loaded && owner===get().owner && chainId === get().chainId)
      return

    const res = await fetch('/api/recet_activities/get' +
      '?owner='+owner +
      ('&frontend='+process.env.NEXT_PUBLIC_FRONTEND||"") +
      '&chainId='+chainId)
    const jsonLikes = await res.json()
    
    //change date string to Date objects
    const likes:IRecentActivities[] = jsonLikes.map((l:any) => {
      l.createdAt = new Date(l.createdAt)
      return l
    })

    set({
      owner,
      chainId,
      loaded:true})
  },
  
  // TO DO - GET - END

  activityToken: (msg, action, account, jurisdiction, title) => {
    let url_property: string = '/jurisdiction/' + jurisdiction + '/token/' + title;
    const state = get()
    console.log(state)
    const activityObject = {
        url:url_property,
        text: msg,
        account: account,
        itemType: action,
        frontend: process.env.NEXT_PUBLIC_FRONTEND||"",
        chainId: state.chainId
      } as IRecentActivities


    // Save to DB
    saveActivityToDatabase(activityObject)
  },
}))