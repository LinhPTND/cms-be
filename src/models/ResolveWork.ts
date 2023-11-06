import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface ResolveWork {
  approved: string;
  birthDay: string;
  citizenId: string;
  class: string;
  contentResolve: string;
  createdAt: string;
  dateCitizenId: string;
  gender: Gender;
  majors: Major;
  msv: string;
  name: string;
  phone: string;
  placeCitizenId: string;
  reason: string;
  status: StatusLetter;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type ResolveWorkRequest = Omit<
  ResolveWork,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
