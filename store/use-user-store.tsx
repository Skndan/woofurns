import { create } from "zustand";
import { persist } from "zustand/middleware"

export type Profile = {
    userId: string; 
    profileId: string; 
    name: string; 
    email?: any; 
    mobile?: any;
    roles: string[]
  };

interface userStoreInterface {
    profile: Profile | any;
    set: (profile: any) => void;
}

export const useUserStore = create(persist<userStoreInterface>((set, get) => ({
    profile: {},
    set: (profile: any) => set({ profile }),
}), { name: 'profile_tag' }))

 
