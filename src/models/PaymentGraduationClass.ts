import { StatusLetter } from "./Letter";

export interface ConfirmPayment {
  content: string;
  signature: string;
  _id: string;
}

export interface PaymentGraduationClass {
  amountStudent: number;
  approved: string;
  class: string;
  createdAt: string;
  dateDecisionAssign: string;
  decisionNumber: string;
  financial: ConfirmPayment;
  libraryCenter: ConfirmPayment;
  trainingDepartment: ConfirmPayment;
  msv: string;
  status: StatusLetter;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type PaymentGraduationClassRequest = Omit<
  PaymentGraduationClass,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
