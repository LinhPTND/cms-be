import { StatusLetter } from "./Letter";

export interface ChangeCourse {
  approved: string;
  class: string;
  courseAdds: Array<{
    classNv1: string;
    classNv2: string;
    createdAt: string;
    name: string;
    semester: number;
    studySt: number;
    updatedAt: string;
    _id: string;
  }>;
  courseChanges: Array<{
    classAssign: string;
    classWant: string;
    name: string;
    semester: number;
    _id: string;
  }>;
  endYear: number;
  msv: string;
  name: string;
  phone: string;
  reason: string;
  semester: number;
  startYear: number;
  status: StatusLetter;
  teacherHomeRoom: string;
  __v: 0;
  _id: string;
}

export type ChangeCourseRequest = Omit<
  ChangeCourse,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
