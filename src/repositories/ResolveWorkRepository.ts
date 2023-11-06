import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import { ResolveWork, ResolveWorkRequest } from "./../models/ResolveWork";

class ResolveWorkRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: ResolveWorkRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/resolveWork`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: ResolveWorkRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/resolveWork/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: ResolveWork;
    }>({
      method: "Delete",
      url: `/resolveWork/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/resolveWork/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/resolveWork/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new ResolveWorkRepository();
