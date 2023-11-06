import UserRepository from "@/repositories/UserRepository";
import { defineStore } from "pinia";
import { InfoResponse as User } from "./../models/User";

export interface UserStoreState {
  user: Omit<User, "__v" | "updatedAt" | "createdAt">;
}

export const useUser = defineStore({
  id: "user",
  state: (): UserStoreState => ({
    user: {
      _id: "",
      name: "",
      birthDay: undefined,
      class: "",
      gender: "",
      majors: undefined,
      msv: "",
    },
  }),

  actions: {
    getInfoAccount(msv: string) {
      return UserRepository.getInfo(msv).subscribe(({ data }) => {
        this.user = data.data;
      });
    },
  },

  persist: {
    enabled: true,
  },
});
