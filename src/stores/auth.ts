import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";

interface AuthStoreState {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  user?: {
    username: string;
    type: "user" | "admin" | "teacher" | null;
    id: string;
    userId: string;
  };
}

interface JwtAccessToken {
  exp: number;
  iat: number;
  type: "user" | "admin" | "teacher";
  username: string;
  userId: string;
  _id: string;
}

export const useAuth = defineStore({
  id: "auth",
  state: (): AuthStoreState => ({
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
    user: {
      username: "",
      type: null,
      id: "",
      userId: "",
    },
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.accessToken;
    },
  },
  actions: {
    login(data: AuthStoreState) {
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;

      if (data.accessToken) {
        const jwtData: JwtAccessToken = jwtDecode(data.accessToken) as any;

        this.user = {
          username: jwtData.username,
          type: jwtData.type,
          id: jwtData._id,
          userId: jwtData.userId,
        };
        this.expiresIn = jwtData.exp;
      }
    },
    logout() {
      this.accessToken = "";
      this.refreshToken = "";
      this.expiresIn = 0;
      this.user = undefined;
    },
  },

  persist: {
    enabled: true,
  },
});
