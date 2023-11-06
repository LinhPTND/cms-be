import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  RenewStudentCard,
  RenewStudentCardRequest,
} from "@/models/RenewStudentCard";

class RenewStudentCardRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: RenewStudentCardRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/renewStudentCard`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: RenewStudentCardRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/renewStudentCard/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: RenewStudentCard;
    }>({
      method: "Delete",
      url: `/renewStudentCard/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/renewStudentCard/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/renewStudentCard/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new RenewStudentCardRepository();
