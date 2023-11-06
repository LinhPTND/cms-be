import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import { LeavingSchool, LeavingSchoolRequest } from "../models/LeavingSchool";

class LeavingSchoolRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: LeavingSchoolRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/leavingSchool`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: LeavingSchoolRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/leavingSchool/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: LeavingSchool;
    }>({
      method: "Delete",
      url: `/leavingSchool/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leavingSchool/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leavingSchool/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new LeavingSchoolRepository();
