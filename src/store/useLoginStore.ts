import { User } from "@/models/User";
import { create } from "zustand";

interface LoginStore {
  token: string;
  setToken: (token: string) => void;
  user?: User;
  setUser: (user: User) => void;
}

const useUserStore = create<LoginStore>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
  user: undefined,
  setUser: (user: User) => { set({ user }); console.log(user) },
}));

export default useUserStore;
