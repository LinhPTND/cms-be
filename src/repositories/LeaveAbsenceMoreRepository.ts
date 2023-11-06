import env from "@/core/env";
import { Repository } from "@/core/Repository";
import {
  LeaveAbsenceMore,
  LeaveAbsenceMoreRequest,
} from "@/models/LeaveAbsenceMore";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";

class LeaveAbsenceMoreRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: LeaveAbsenceMoreRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/leaveAbsenceMore`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: LeaveAbsenceMoreRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/leaveAbsenceMore/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: LeaveAbsenceMore;
    }>({
      method: "Delete",
      url: `/leaveAbsenceMore/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leaveAbsenceMore/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leaveAbsenceMore/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new LeaveAbsenceMoreRepository();
