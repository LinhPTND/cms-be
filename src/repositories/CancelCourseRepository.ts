import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";
import { CancelCourse, CancelCourseRequest } from "./../models/CancelCourse";

class CancelCourseRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: CancelCourseRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/cancelCourse`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: CancelCourseRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/cancelCourse/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: CancelCourse;
    }>({
      method: "Delete",
      url: `/cancelCourse/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/cancelCourse/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/cancelCourse/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new CancelCourseRepository();
