import { StatusLetter } from "./Letter";

export interface EnjoyPolicy {
  approved: string;
  class: string;
  classC2: string;
  confirmC2: string;
  confirmStudent: string;
  course: [string, string];
  courseTime: number;
  createdAt: string;
  discipline: string;
  endC2Y: number;
  majors: string;
  msv: string;
  namePolicy: string;
  schoolC2: string;
  semester: number;
  semesterC2: number;
  startC2Y: number;
  status: StatusLetter;
  timeInSchool: [string, string];
  updatedAt: string;
  yearSchoolSt: number;
  __v: number;
  _id: string;
}

export type EnjoyPolicyRequest = Omit<
  EnjoyPolicy,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
