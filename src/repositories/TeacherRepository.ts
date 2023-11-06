import env from "@/core/env";
import { Repository } from "@/core/Repository";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetInfoResponse,
  ListTeacherRequest,
  ListTeacherResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
} from "@/models/Teacher";
import { ListLetterResponse } from "@/models/User";
import { StatusLetter } from "./../models/Letter";

class TeacherRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  getInfo(id: string) {
    return this.request<GetInfoResponse>({
      url: `/teachers/${id}`,
      method: "get",
    });
  }

  addTeacher(data: UpdateInfoRequest) {
    return this.request<UpdateInfoResponse>({
      url: "/teachers",
      method: "POST",
      data,
    });
  }

  updateInfo(id: string, data: UpdateInfoRequest) {
    return this.request<UpdateInfoResponse>({
      url: `/teachers/${id}`,
      method: "put",
      showLoading: true,
      data: data,
    });
  }

  changePassword(data: ChangePasswordRequest) {
    return this.request<ChangePasswordResponse>({
      url: `/teachers/changePassword`,
      method: "put",
      showLoading: true,
      data: data,
    });
  }

  getListTeacher(params: ListTeacherRequest) {
    return this.request<ListTeacherResponse>({
      url: `/teachers`,
      method: "get",
      params: params,
    });
  }

  deleteTeacher(id: string) {
    return this.request({
      url: `/teachers/${id}`,
      method: "delete",
    });
  }

  getAllLetterApply(
    id: string,
    payload: { status?: StatusLetter; name?: string; msv?: string }
  ) {
    return this.request<ListLetterResponse>({
      url: `/teachers/${id}/allLetter`,
      method: "get",
      params: payload,
    });
  }
}

export default new TeacherRepository();
