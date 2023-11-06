import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  LeaveAbsenceLess,
  LeaveAbsenceLessRequest,
} from "./../models/LeaveAbsenceLess";

class LeaveAbsenceLessRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: LeaveAbsenceLessRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/leaveAbsenceLess`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: LeaveAbsenceLessRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/leaveAbsenceLess/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: LeaveAbsenceLess;
    }>({
      method: "Delete",
      url: `/leaveAbsenceLess/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leaveAbsenceLess/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/leaveAbsenceLess/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new LeaveAbsenceLessRepository();
