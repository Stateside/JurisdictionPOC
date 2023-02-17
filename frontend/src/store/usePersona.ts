import { NextRouter } from 'next/router'
import create from 'zustand'

export enum PersonaType {
    Owner,
    Member
}

export interface IPersonaState {
    type: PersonaType,
    set: (router: NextRouter, persona: PersonaType) => void
    isMemberPersona: () => boolean
    isOwnerPersona: () => boolean
    goHome: (router: NextRouter) => void
  }

/** Provides access to a sitewide setting which is either Member or Owner. Owners do not see Jurisdiciton details by default. */
const usePersona = create<IPersonaState>((set, get) => ({
  type: PersonaType.Member,

  set: (router: NextRouter, newType: PersonaType) => {
    set({ type: newType })
    get().goHome(router)
  },

  isMemberPersona: () => get().type === PersonaType.Member,

  isOwnerPersona: () => get().type === PersonaType.Owner,

  goHome: (router: NextRouter) => {
    router.push('/')
  }
}))

export default usePersona