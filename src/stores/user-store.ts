/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createStore } from 'zustand/vanilla'
import { type Vtuber } from '~/server/api/schemas/vtuber'

export type UserState = {
  current_vtuber: Vtuber | null
}

export type UserActions = {
  setVtuber: (vtuber: Vtuber) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  current_vtuber: null
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setVtuber: (vtuber: Vtuber) => set(() => ({ current_vtuber: vtuber }))
  }))
}
