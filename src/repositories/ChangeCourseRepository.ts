import env from "@/core/env";
import { Repository } from "@/core/Repository";
import { ChangeCourse, ChangeCourseRequest } from "@/models/ChangeCourse";
import { GetCodeRequest, OtpResponse, VerifyCodeRequest } from "@/models/Otp";

class ChangeCourseRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  create(payload: ChangeCourseRequest) {
    return this.request<{
      success: boolean;
    }>({
      url: `/changeCourse`,
      method: "post",
      data: payload,
    });
  }

  updateLetter(id: string, data: ChangeCourseRequest) {
    return this.request<{
      success: boolean;
      data: string;
    }>({
      method: "PUT",
      url: `/changeCourse/${id}`,
      data: data,
    });
  }

  deleteLetter(id: string) {
    return this.request<{
      success: boolean;
      data: ChangeCourse;
    }>({
      method: "Delete",
      url: `/changeCourse/${id}`,
    });
  }

  getCodeLetter(id: string, data: GetCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/changeCourse/getCode/${id}`,
      data: data,
    });
  }

  verifyCodeRequest(id: string, data: VerifyCodeRequest) {
    return this.request<OtpResponse>({
      method: "POST",
      url: `/changeCourse/verifyCodeLetter/${id}`,
      data: data,
    });
  }
}

export default new ChangeCourseRepository();
