import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface LeaveAbsenceMore {
  address: string;
  approved: string;
  birthDay: string;
  citizenId: string;
  class: string;
  createdAt: string;
  dateCitizenId: string;
  gender: Gender;
  majors: Major;
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

export type LeaveAbsenceMoreRequest = Omit<
  LeaveAbsenceMore,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
