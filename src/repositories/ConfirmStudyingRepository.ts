import env from "@/core/env";
import { Repository } from "@/core/Repository";
import {
  ConfirmStudying,
  ConfirmStudyingRequest,
} from "@/models/ConfirmStudying";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";

class ConfirmStudyingRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: ConfirmStudyingRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/confirmStudying`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: ConfirmStudyingRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/confirmStudying/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: ConfirmStudying;
    }>({
      method: "Delete",
      url: `/confirmStudying/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/confirmStudying/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/confirmStudying/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new ConfirmStudyingRepository();
