// src/providers/user-store-provider.tsx
"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  createUserStore,
  type UserState,
  type UserStore,
} from "~/stores/user-store";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
);

type UserStoreProviderProps = React.PropsWithChildren<UserState>;

export const UserStoreProvider = ({
  children,
  ...props
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createUserStore(props);
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
