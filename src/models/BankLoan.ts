import { Gender, Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface BankLoan {
  approved: string;
  name: string;
  bank: string;
  bankNumber: string;
  birthDay: string;
  citizenId: string;
  class: string;
  course: [string, string];
  createdAt: string;
  dateCitizenId: string;
  department: string;
  gender: Gender;
  majors: Major;
  msv: string;
  phone: string;
  placeCitizenId: string;
  schoolStart: string;
  schoolEnd: string;
  status: StatusLetter;
  tuitionFee: number;
  tuitionObj: string;
  tuitionType: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type BankLoanRequest = Omit<
  BankLoan,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
