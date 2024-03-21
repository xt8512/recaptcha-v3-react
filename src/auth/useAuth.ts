import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export type AuthState = {
  idClient: string | null;
  userAgent: string | null;
  channelCode: "BRK" | string;
};

export type AuthActions = {
  setIdClient: (idClient: string) => void;
  //
  getValidationData: () => AuthState;
};

export const useAuth = create<AuthState & AuthActions>((set,getState) => ({
  // state
  idClient: uuidv4(),
  userAgent: window.navigator.userAgent,
  channelCode: "BRK",
  // actions
  setIdClient(idClient) {
    set({ idClient });
  },
  getValidationData() {
    const { idClient, userAgent, channelCode } = getState();

    return {
      idClient,
      userAgent,
      channelCode,
    };
  },
}));
