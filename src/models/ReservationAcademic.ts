import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface ReservationAcademic {
  address: string;
  approved: string;
  birthDay: string;
  citizenId: string;
  class: string;
  createdAt: string;
  dateCitizenId: string;
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
  timeReservation: number;
  timeStartReservation: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type ReservationAcademicRequest = Omit<
  ReservationAcademic,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
