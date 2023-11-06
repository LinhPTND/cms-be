import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import {
  ReservationAcademic,
  ReservationAcademicRequest,
} from "./../models/ReservationAcademic";

class ReservationAcademicRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: ReservationAcademicRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/reservationAcademic`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: ReservationAcademicRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/reservationAcademic/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: ReservationAcademic;
    }>({
      method: "Delete",
      url: `/reservationAcademic/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/reservationAcademic/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/reservationAcademic/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new ReservationAcademicRepository();
