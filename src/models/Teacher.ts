import { Dayjs } from "dayjs";

export interface InfoResponse {
  _id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  birthDay: Dayjs;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ListTeacherRequest = {
  page?: number;
  limit?: number;
  msv?: string;
  name?: string;
  majors?: string;
  class?: string;
};

export interface UpdateInfoRequest {
  name: string;
  phone: string;
  birthDay: string;
  address: string;
  gender: string;
  email: string;
}

export type GetInfoResponse = UpdateInfoResponse;

export type UpdateInfoResponse = {
  success: boolean;
  data: InfoResponse;
};

export interface ChangePasswordRequest {
  phone: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  data: {
    _id: string;
    username: string;
    password: string;
    type: "teacher";
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
}

export interface ListTeacherResponse {
  success: boolean;
  data: Array<InfoResponse>;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
