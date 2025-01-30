
// src/providers/counter-store-provider.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createUserStore, type UserStore } from '~/stores/user-store'
import { api } from '~/trpc/react'


export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
)

export interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({
  children,
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createUserStore()
  }

  const { user } = useUser();
  const { data: vtuber } = api.vtuber.findOne.useQuery({ login: user?.username ?? "" })
  storeRef.current.setState({ current_vtuber: vtuber });

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = <T,>(
  selector: (store: UserStore) => T,
): T => {
  const counterStoreContext = useContext(UserStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
