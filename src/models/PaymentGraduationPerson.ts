export interface ConfirmPayment {
  content: string;
  signature: string;
  _id?: string;
}

export interface PaymentGraduationPerson {
  approved: string;
  class: string;
  createdAt: string;
  dateDecisionAssign: string;
  decisionNumber: string;
  financial: ConfirmPayment;
  libraryCenter: ConfirmPayment;
  studentManagementSystem: ConfirmPayment;
  majors: string;
  msv: string;
  name: string;
  paymentReason: string;
  phone: string;
  status: string;
  trainingDepartment: ConfirmPayment;
  updatedAt: string;
  __v: number;
  _id: string;
}

export type PaymentGraduationPersonRequest = Omit<
  PaymentGraduationPerson,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
