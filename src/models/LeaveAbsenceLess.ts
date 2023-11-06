import { Gender } from "./Auth";
import { StatusLetter } from "./Letter";

export interface LeaveAbsenceLess {
  address: string;
  approved: string;
  birthDay: string;
  citizenId: string;
  class: string;
  classCourse: string;
  createdAt: string;
  dateCitizenId: string;
  gender: Gender;
  majors: string;
  msv: string;
  name: string;
  parentName: string;
  parentPhone: string;
  permanentResidence: string;
  phone: string;
  placeCitizenId: string;
  reason: string;
  status: StatusLetter;
  timeLeave: [string, string];
  updatedAt: string;
  __v: number;
  _id: string;
}

export type LeaveAbsenceLessRequest = Omit<
  LeaveAbsenceLess,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
