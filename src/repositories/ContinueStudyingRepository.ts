import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  ContinueStudying,
  ContinueStudyingRequest,
} from "./../models/ContinueStudying";

class ConfirmStudyingRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: ContinueStudyingRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/continueStudying`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: ContinueStudyingRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/continueStudying/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: ContinueStudying;
    }>({
      method: "Delete",
      url: `/continueStudying/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/continueStudying/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/continueStudying/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new ConfirmStudyingRepository();
