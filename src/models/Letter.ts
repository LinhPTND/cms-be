export enum StatusLetter {
  PENDING = "pending",
  SUCCESS = "success",
  REJECT = "reject",
}

export interface FormService {
  resetForm: () => void;
  submit: () => void;
  validate: () => Promise<any>;
}

export enum TypeLetter {
  BankLoanLetter = "BankLoanLetter",
  CancelCourseLetter = "CancelCourseLetter",
  ChangeCourseLetter = "ChangeCourseLetter",
  ConfirmStudyingLetter = "ConfirmStudyingLetter",
  ContinueStudyingLetter = "ContinueStudyingLetter",
  EnjoyPolicyLetter = "EnjoyPolicyLetter",
  LeaveAbsenceLessLetter = "LeaveAbsenceLessLetter",
  LeaveAbsenceMoreLetter = "LeaveAbsenceMoreLetter",
  LeavingSchool = "LeavingSchool",
  PaymentCollectiveLetter = "PaymentCollectiveLetter",
  PaymentPersonalLetter = "PaymentPersonalLetter",
  RenewCardLetter = "RenewCardLetter",
  ReservationAcademicLetter = "ReservationAcademicLetter",
  ResolveWorkLetter = "ResolveWorkLetter",
}

export interface LetterTable {
  nameLetter: string;
  createdAt: string;
  approver: string;
  status: StatusLetter;
}
