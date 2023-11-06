import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface ConfirmStudying {
  _id: string;
  msv: string;
  name: string;
  phone: string;
  class: string;
  majors: Major;
  birthDay: string;
  gender: Gender;
  citizenId: string;
  placeCitizenId: string;
  dateCitizenId: string;
  permanentResidence: string;
  address: string;
  semester: number;
  startYear: number;
  endYear: number;
  course: [string, string];
  status: StatusLetter;
  approved: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ConfirmStudyingRequest = Omit<
  ConfirmStudying,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
