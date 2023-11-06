import { Major } from "./Auth";
import { StatusLetter } from "./Letter";

export interface CancelCourse {
  approved: string;
  class: string;
  courseCancel: Array<{
    class: string;
    createdAt: string;
    endDate: string;
    name: string;
    semester: string;
    startDate: string;
    updatedAt: string;
    _id: string;
  }>;
  endYear: number;
  majors: Major;
  msv: string;
  name: string;
  phone: string;
  reason: string;
  semester: number;
  startYear: number;
  status: StatusLetter;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type CancelCourseRequest = Omit<
  CancelCourse,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
