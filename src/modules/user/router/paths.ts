import { createRoutePath } from "@/core/utilities";

const UserRoutePaths = createRoutePath({
  Index: "user",
  Letter: "letter",
  ConfirmStudying: "letter/confirm-studying",
  EnjoyPolicy: "letter/enjoy-policy",
  BankLoan: "letter/bank-loan",
  ChangeCourse: "letter/change-course",
  CancellationCourse: "letter/cancellation-course",
  RenewStudentCard: "letter/renew-student-card",
  ReIssuanceTranscripts: "letter/re-issuance-transcript",
  LeaveAbsenceLessWeek: "letter/leave-absence-less-week",
  LeaveAbsenceMoreWeek: "letter/leave-absence-more-week",
  ReservationAcademicResult: "letter/reservation-acacdemic-result",
  ContinueStudying: "letter/continue-studying",
  ResignationStudying: "letter/resignation-studying",
  PaymentGraduationPersonal: "letter/payment-graduation-personal",
  PaymentGraduationCollective: "letter/payment-graduation-collective",
} as const);

export default UserRoutePaths;
