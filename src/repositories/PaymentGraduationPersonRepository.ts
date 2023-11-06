import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  PaymentGraduationPerson,
  PaymentGraduationPersonRequest,
} from "@/models/PaymentGraduationPerson";

class PaymentGraduationPersonRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: PaymentGraduationPersonRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/paymentGraduationPerson`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: PaymentGraduationPersonRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/paymentGraduationPerson/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: PaymentGraduationPerson;
    }>({
      method: "Delete",
      url: `/paymentGraduationPerson/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/paymentGraduationPerson/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/paymentGraduationPerson/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new PaymentGraduationPersonRepository();
