/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createStore } from "zustand/vanilla";
import { type Vtuber } from "~/server/api/schemas/vtuber";

export type UserState = {
  current_vtuber: Vtuber | null;
};

export type UserActions = {
  setVtuber: (vtuber: Vtuber) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  current_vtuber: null,
};

export const createUserStore = (
  props: { current_vtuber: Vtuber | null },
  initState: UserState = defaultInitState,
) => {
  let current_vtuber = null;

  if (props.current_vtuber)
    current_vtuber = {
      ...props.current_vtuber,
      id: JSON.stringify(props.current_vtuber.id),
    };

  return createStore<UserStore>()((set) => ({
    ...initState,
    current_vtuber,
    setVtuber: (vtuber: Vtuber) => set(() => ({ current_vtuber: vtuber })),
  }));
};
