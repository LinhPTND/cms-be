import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface ContinueStudying {
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
  decisionNumber: string;
  dateDecisionAssign: string;
  startDateReservationAcademic: string;
  timeReservationAcademic: number;
  dateComeback: string;
  semester: number;
  startYear: number;
  endYear: number;
  status: StatusLetter;
  approved: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ContinueStudyingRequest = Omit<
  ContinueStudying,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
