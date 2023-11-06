import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { EnjoyPolicy, EnjoyPolicyRequest } from "@/models/EnjoyPolicy";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";

class EnjoyPolicyRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: EnjoyPolicyRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/enjoyPolicy`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: EnjoyPolicyRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/enjoyPolicy/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: EnjoyPolicy;
    }>({
      method: "Delete",
      url: `/enjoyPolicy/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/enjoyPolicy/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/enjoyPolicy/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new EnjoyPolicyRepository();
