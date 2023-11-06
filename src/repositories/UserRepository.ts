import env from "@/core/env";
import { Repository } from "@/core/Repository";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreateUserResponse,
  DeleteRequest,
  GetInfoRequest,
  ListLetterResponse,
  ListUserRequest,
  ListUserResponse,
  UpdateInfoRequest,
  UpdateInfoResponse,
} from "@/models/User";
import { CreateUserRequest } from "./../models/User";

class UserRepository extends Repository {
  constructor() {
    super(env.API_URL);
  }

  addUser(payload: CreateUserRequest) {
    return this.request<CreateUserResponse>({
      url: "/users",
      method: "post",
      data: payload,
    });
  }

  getInfo(msv: string) {
    return this.request<GetInfoRequest>({
      url: `/user/${msv}`,
      method: "get",
      showLoading: true,
    });
  }

  updateInfo(msv: string, data: UpdateInfoRequest) {
    return this.request<UpdateInfoResponse>({
      url: `/users/${msv}`,
      method: "put",
      showLoading: true,
      data: data,
    });
  }

  deleteUser(msv: string) {
    return this.request<DeleteRequest>({
      url: `/users/${msv}`,
      method: "DELETE",
    });
  }

  changePassword(data: ChangePasswordRequest) {
    return this.request<ChangePasswordResponse>({
      url: `/users/changePassword`,
      method: "put",
      showLoading: true,
      data: data,
    });
  }

  getListUser(params: ListUserRequest) {
    return this.request<ListUserResponse>({
      url: `/users`,
      method: "get",
      params: params,
    });
  }

  getAllLetter(msv: string) {
    return this.request<ListLetterResponse>({
      url: `/users/${msv}/allLetter`,
      method: "get",
    });
  }
}

export default new UserRepository();
