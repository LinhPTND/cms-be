import env from "@/core/env";
import { Repository } from "@/core/Repository";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from "@/models/Auth";

class AuthRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  login(payload: LoginRequest) {
    return this.request<LoginResponse>({
      url: "/login",
      method: "post",
      showLoading: true,
      data: payload,
    });
  }

  refreshToken(refreshToken: string) {
    return this.api.post<RefreshTokenResponse>("/refreshToken", {
      refreshToken,
    });
  }

  logout() {
    return this.request({
      url: "/logout",
      method: "delete",
      showLoading: true,
    });
  }
}

export default new AuthRepository();
