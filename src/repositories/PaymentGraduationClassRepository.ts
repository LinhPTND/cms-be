import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  PaymentGraduationClass,
  PaymentGraduationClassRequest,
} from "@/models/PaymentGraduationClass";

class PaymentGraduationClassRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: PaymentGraduationClassRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/paymentGraduationClass`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: PaymentGraduationClassRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/paymentGraduationClass/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: PaymentGraduationClass;
    }>({
      method: "Delete",
      url: `/paymentGraduationClass/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/paymentGraduationClass/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/paymentGraduationClass/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new PaymentGraduationClassRepository();
