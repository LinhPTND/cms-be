import { AccountResponse } from "@/models/Account";
import { Major } from "./Auth";
import { BankLoan } from "./BankLoan";
import { CancelCourse } from "./CancelCourse";
import { ChangeCourse } from "./ChangeCourse";
import { ConfirmStudying } from "./ConfirmStudying";
import { EnjoyPolicy } from "./EnjoyPolicy";
import { LeaveAbsenceLess } from "./LeaveAbsenceLess";
import { LeaveAbsenceMore } from "./LeaveAbsenceMore";
import { LeavingSchool } from "./LeavingSchool";
import { PaymentGraduationClass } from "./PaymentGraduationClass";
import { PaymentGraduationPerson } from "./PaymentGraduationPerson";
import { RenewStudentCard } from "./RenewStudentCard";
import { ReservationAcademic } from "./ReservationAcademic";
import { ResolveWork } from "./ResolveWork";

export interface InfoResponse {
  _id: string;
  name: string;
  msv: string;
  email?: string;
  gender: string;
  birthDay: string | undefined;
  class: string;
  age?: number;
  majors: Major | undefined;
  phone?: string;
  timeCourse?: string;
  citizenId?: string;
  placeCitizenId?: string;
  dateCitizenId?: string | undefined;
  address?: string;
  hometown?: string;
  permanentResidence?: string;
  parentName?: string;
  parentPhone?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetInfoResponse {
  success: boolean;
  data: InfoResponse;
}

export interface CreateUserRequest {
  msv: string;
  name: string;
  email?: string;
  gender: string;
  birthDay: string;
  class: string;
  age?: number;
  majors: Major;
  phone?: string;
  timeCourse: string;
  citizenId?: string;
  placeCitizenId?: string;
  dateCitizenId?: string;
  address?: string;
  hometown?: string;
  permanentResidence?: string;
  parentName?: string;
  parentPhone?: string;
}

export interface CreateUserResponse {
  success: boolean;
  data: {
    user: InfoResponse;
    account: AccountResponse;
  };
}

export interface GetInfoRequest {
  success: boolean;
  data: InfoResponse;
}

export interface UpdateInfoRequest {
  name: string;
  email: string;
  gender: string;
  birthDay: string;
  class: string;
  age: number;
  majors: Major;
  phone: string;
  timeCourse: string;
  citizenId: string;
  placeCitizenId: string;
  dateCitizenId: string;
  address: string;
  hometown: string;
  permanentResidence: string;
  parentName: string;
  parentPhone: string;
}

export interface UpdateInfoResponse {
  success: boolean;
  data: InfoResponse;
}

export interface ChangePasswordRequest {
  msv: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  data: {
    _id: string;
    username: string;
    password: string;
    type: "user";
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
}

export type ListUserRequest = {
  page?: number;
  limit?: number;
  msv?: string;
  name?: string;
  majors?: string;
  class?: string;
};

export interface ListUserResponse {
  success: boolean;
  data: Array<InfoResponse>;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface DeleteRequest {
  success: boolean;
  message: string;
}

export interface ListLetter {
  confirmStudying: ConfirmStudying[];
  bankLoan: BankLoan[];
  cancelCourse: CancelCourse[];
  changeCourse: ChangeCourse[];
  continueStudying: any[];
  enjoyPolicy: EnjoyPolicy[];
  leaveAbsenceLess: LeaveAbsenceLess[];
  leaveAbsenceMore: LeaveAbsenceMore[];
  leavingSchool: LeavingSchool[];
  paymentGraduationClass: PaymentGraduationClass[];
  paymentGraduationPerson: PaymentGraduationPerson[];
  renewStudentCard: RenewStudentCard[];
  reservationAcademic: ReservationAcademic[];
  resolveWork: ResolveWork[];
}

export interface DataListLetterResponse extends ListLetter {
  createdAt: string;
  updatedAt: string;
  user: string;
  __v: string;
  _id: string;
}

export interface ListLetterResponse {
  success: boolean;
  data: DataListLetterResponse;
}
