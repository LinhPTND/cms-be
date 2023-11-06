import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import { BankLoan, BankLoanRequest } from "./../models/BankLoan";

class BankLoanRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: BankLoanRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/bankLoan`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: BankLoanRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/bankLoan/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: BankLoan;
    }>({
      method: "Delete",
      url: `/bankLoan/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/bankLoan/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/bankLoan/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new BankLoanRepository();
