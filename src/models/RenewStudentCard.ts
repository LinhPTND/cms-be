import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface RenewStudentCard {
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
  permanentResidence: string;
  phone: string;
  placeCitizenId: string;
  status: StatusLetter;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type RenewStudentCardRequest = Omit<
  RenewStudentCard,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
