import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface LeavingSchool {
  address: string;
  approved: string;
  birthDay: string;
  citizenId: string;
  class: string;
  createdAt: string;
  dateCitizenId: string;
  dateLeave: string;
  endYear: number;
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
  semester: number;
  startYear: number;
  status: StatusLetter;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type LeavingSchoolRequest = Omit<
  LeavingSchool,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
